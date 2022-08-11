import axios from "axios";
import FormData from "form-data";
import { IAttachment, IFile } from "@interfaces/storage.interface";
import Storage from "@models/Storage.model";
import { Types } from "mongoose";

export default class DiscordWebhook {
  public static webhook: string;

  constructor(discordWebhook: string) {
    DiscordWebhook.webhook = discordWebhook;
  }

  public static async uploadFile(
    attachments: IFile[],
    thumbnail: IFile,
    userID: string
  ): Promise<Types.ObjectId> {
    try {
      const formData = new FormData();
      formData.append("thumbnail", thumbnail.data, thumbnail.name);
      attachments.forEach((file, index) => {
        formData.append(`files[${index}]`, file.data, file.name);
      });
      const { data } = await axios.post<{
        id: string;
        attachments: IAttachment[];
      }>(this.webhook, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const storage = await Storage.create({
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

      return storage._id;
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
