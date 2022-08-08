import { Document, PopulatedDoc } from "mongoose";
import { IUser } from "@interfaces/auth.interface";

export interface IStorage {
  messageID: string;
  thumbnail: {
    url: string;
    proxy_url: string;
  };
  attachments: { url: string; proxy_url: string }[];
  uploadBy: PopulatedDoc<IUser & Document>;
}
