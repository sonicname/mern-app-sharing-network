import { Schema, model, Types } from "mongoose";

const PostSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide post title!"],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    collection: [
      {
        type: Types.ObjectId,
        ref: "Storage",
        required: [true, "Please add image to post!"],
      },
    ],
    tags: [
      {
        type: Types.ObjectId,
        ref: "Tags",
        required: [true, "Please select tags!"],
      },
    ],
    uploadBy: {
      type: Types.ObjectId,
      ref: "Users",
      required: [true, "Please provide user!"],
    },
  },
  {
    timestamps: true,
  }
);
