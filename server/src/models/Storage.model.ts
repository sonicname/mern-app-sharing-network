import { Schema, model, Types } from "mongoose";
import { IStorage } from "@interfaces/storage.interface";

const StorageSchema = new Schema<IStorage>(
  {
    messageID: String,
    attachment: {
      url: String,
      proxy_url: String,
    },
    uploadBy: {
      type: Types.ObjectId,
      def: "Users",
      required: [true, "Please provide user"],
    },
  },
  {
    timestamps: true,
  }
);

export default model<IStorage>("storage", StorageSchema);
