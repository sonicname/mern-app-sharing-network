import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import FormData from "form-data";
import axios from "axios";
import File from "@models/File.model";

import { IAttachment, IRequestFiles } from "@interfaces/index";

export const upload = async (req: Request, res: Response) => {
  const files = req.files as unknown as IRequestFiles;
  const discordWebhook = process.env["DISCORD_STORAGE"] as string;
  const formData = new FormData();

  if (files.attachments.length > 1) {
    files.attachments.forEach((file, index) => {
      formData.append(`files[${index}]`, file.data, file.name);
    });
  } else {
    // @ts-ignore
    formData.append("file", files.attachments.data, files.attachments.name);
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
