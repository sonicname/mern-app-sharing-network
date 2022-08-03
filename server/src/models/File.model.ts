import { Schema, model, Types } from "mongoose";

const FileSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "File must have name!"],
      trim: true,
    },
    messageID: String,
    fileProperty: {
      size: Number,
      width: Number,
      height: Number,
    },
    sources: {
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

export default model("Storage", FileSchema);
