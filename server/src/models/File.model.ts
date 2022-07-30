import { Schema, model, Types } from "mongoose";

const FileSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "File must have name!"],
      trim: true,
    },
    url: {
      type: String,
    },
    size: {
      type: Number,
    },
    proxy_url: {
      type: String,
    },
    width: {
      type: Number,
    },
    height: {
      type: Number,
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
