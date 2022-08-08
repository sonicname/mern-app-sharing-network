import { Schema, model } from "mongoose";
import { ITag } from "@interfaces/tags.interface";

const TagSchema = new Schema<ITag>(
  {
    name: {
      type: String,
      required: [true, "Please provide name tag!"],
      trim: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

export default model("tags", TagSchema);
