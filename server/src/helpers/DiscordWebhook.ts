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
    attachment: IFile,
    userID: string
  ): Promise<Types.ObjectId> {
    try {
      const formData = new FormData();
      formData.append("file", attachment.data, attachment.name);

      const { data } = await axios.post<{
        id: string;
        attachments: IAttachment[];
      }>(this.webhook, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const storage = await Storage.create({
        messageID: data.id,
        attachment: {
          url: data.attachments[0].url,
          proxy_url: data.attachments[0].proxy_url,
        },
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
