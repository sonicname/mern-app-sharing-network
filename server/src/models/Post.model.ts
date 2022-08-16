import { Schema, model, Types } from "mongoose";
import { IPost } from "@interfaces/post.interface";

const PostSchema = new Schema<IPost>(
  {
    title: {
      type: String,
      required: [true, "Please provide post title!"],
      trim: true,
      min: 3,
      max: 15,
    },
    description: {
      type: String,
      trim: true,
      max: 255,
    },
    storages: {
      type: Types.ObjectId,
      ref: "storage",
      required: ["true", "Please add image to post!"],
    },
    uploadBy: {
      type: Types.ObjectId,
      ref: "users",
      required: [true, "Please provide user!"],
    },
    postLikes: [
      {
        type: Types.ObjectId,
        ref: "users",
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default model("posts", PostSchema);
