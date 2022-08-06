import { Schema, model } from "mongoose";

const TagSchema = new Schema(
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

export default model("Tags", TagSchema);
