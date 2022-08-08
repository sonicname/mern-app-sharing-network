import { Schema, model, Types } from "mongoose";
import { IPost } from "@interfaces/post.interface";

const PostSchema = new Schema<IPost>(
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
    storages: {
      type: Types.ObjectId,
      ref: "storage",
      required: ["true", "Please add image to post!"],
    },
    tags: [
      {
        type: Types.ObjectId,
        ref: "tags",
        required: [true, "Please select tags!"],
      },
    ],
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
    postStatus: {
      type: String,
      enum: ["pending", "accepted", "rejected"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

export default model("posts", PostSchema);
