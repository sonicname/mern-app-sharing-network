import axios from "axios";
import FormData from "form-data";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import { File } from "@models/index";
import { BadRequest, UnauthenticatedError } from "@errors/index";
import {
  IPostAttachment,
  IQueryPage,
  IRequestDeleteMessage,
  IRequestFiles,
} from "@interfaces/index";

export const getFiles = async (req: Request, res: Response) => {
  const { page } = req.query as unknown as IQueryPage;
  const PER_PAGE = 10;
  const intPage = page || page === "0" ? parseInt(page) : 1;
  if (intPage < 0) {
    throw new BadRequest("Page invalid!");
  }
  const countItem = await File.count({});
  const totalPages = Math.ceil(countItem / PER_PAGE);
  const SKIP = intPage === 0 || intPage === 1 ? 0 : PER_PAGE * (intPage - 1);

  const files = await File.find({})
    .select("sources -_id")
    .skip(SKIP)
    .limit(PER_PAGE);

  return res.status(StatusCodes.OK).json({
    page: intPage,
    totalPages,
    files,
  });
};

export const uploadFile = async (req: Request, res: Response) => {
  const discordWebhook = process.env["DISCORD_STORAGE"] as string;
  if (!req.files) throw new BadRequest("File upload is not provided!");
  const { attachments } = req.files as unknown as IRequestFiles;
  if (!attachments)
    throw new BadRequest("File upload form name must be attachments");
  const formData = new FormData();

  if (Array.isArray(attachments)) {
    attachments.forEach((file, index) => {
      formData.append(`files[${index}]`, file.data, file.name);
    });
  } else {
    formData.append("file", attachments.data, attachments.name);
  }

  const { data }: IPostAttachment = await axios.post(discordWebhook, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  const messageID = data.id;

  for (const attachment of data.attachments) {
    await File.create({
      name: attachment.filename,
      messageID,
      sources: {
        url: attachment.url,
        proxy_url: attachment.proxy_url,
      },
      fileProperty: {
        size: attachment.size,
        height: attachment.height,
        width: attachment.width,
      },
      uploadBy: req.user?.userID,
    });
  }

  return res.status(StatusCodes.OK).json({
    message: "Uploaded",
    attachments: {
      ...data?.attachments,
    },
  });
};

export const deleteFile = async (req: Request, res: Response) => {
  const discordWebhook = process.env["DISCORD_STORAGE"] as string;
  const { fileID } = req.body as IRequestDeleteMessage;
  if (!fileID) throw new BadRequest("messageID is not provide!");

  const file = await File.findOne({ _id: fileID });
  if (!file) throw new BadRequest("File is not exists!");
  if (file.uploadBy.toString() !== (req.user?.userID as string)) {
    throw new UnauthenticatedError("Invalid Credentials");
  }

  await file.delete();
  await axios.delete(`${discordWebhook}/messages/${file.messageID}`);

  return res.status(StatusCodes.OK).json({
    message: "Deleted",
  });
};
