import axios from "axios";
import FormData from "form-data";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import File from "@models/File.model";
import { BadRequest } from "@errors/index";
import { IAttachment, IRequestFiles } from "@interfaces/index";

export const upload = async (req: Request, res: Response) => {
  if (!req.files) throw new BadRequest("File upload is not provided!");
  const { attachments } = req.files as unknown as IRequestFiles;
  if (!attachments)
    throw new BadRequest("File upload form name must be attachments");
  const discordWebhook = process.env["DISCORD_STORAGE"] as string;
  const formData = new FormData();

  if (Array.isArray(attachments)) {
    attachments.forEach((file, index) => {
      formData.append(`files[${index}]`, file.data, file.name);
    });
  } else {
    formData.append("file", attachments.data, attachments.name);
  }

  const { data }: { data: { attachments: IAttachment[] } } = await axios.post(
    discordWebhook,
    formData,
    {
      headers: { "Content-Type": "multipart/form-data" },
    }
  );

  for (const attachment of data.attachments) {
    await File.create({
      name: attachment.filename,
      url: attachment.url,
      proxy_url: attachment.proxy_url,
      size: attachment.size,
      height: attachment.height,
      width: attachment.width,
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
