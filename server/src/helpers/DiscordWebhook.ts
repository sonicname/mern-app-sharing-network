import axios from "axios";
import FormData from "form-data";
import { IFile, IPostAttachment } from "@interfaces/storage.interface";
import { File } from "@models/index";

export default class DiscordWebhook {
  public static webhook: string;

  constructor(discordWebhook: string) {
    DiscordWebhook.webhook = discordWebhook;
  }

  public static async uploadFile(
    attachments: IFile | IFile[],
    thumbnail: IFile,
    userID: string
  ): Promise<IPostAttachment> {
    try {
      const formData = new FormData();
      formData.append("thumbnail", thumbnail.data, thumbnail.name);
      if (Array.isArray(attachments)) {
        attachments.forEach((file, index) => {
          formData.append(`files[${index}]`, file.data, file.name);
        });
      } else {
        formData.append("file", attachments.data, attachments.name);
      }

      const { data } = await axios.post<IPostAttachment>(
        this.webhook,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      const file = await File.create({
        messageID: data.id,
        thumbnail: {
          url: data.attachments[0].url,
          proxy_url: data.attachments[0].proxy_url,
        },
        attachments: data.attachments.slice(1).map((attachment) => {
          return {
            url: attachment.url,
            proxy_url: attachment.proxy_url,
          };
        }),
        uploadBy: userID,
      });

      return {
        attachments: data.attachments,
        id: data.id,
        refID: file._id,
      };
    } catch (e) {
      throw e;
    }
  }

  public static async deleteFile(fileID: string): Promise<void> {
    try {
      await axios.delete(`${this.webhook}/messages/${fileID}`);
    } catch (e) {
      throw e;
    }
  }
}
