import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import { Tag } from "@models/index";
import { BadRequest } from "@errors/errors";
import { checkIsAdmin } from "@utils/index";
import { ITagRequest, ITagUpdateRequest } from "@interfaces/tags.interface";

export const getAllTags = async (req: Request, res: Response) => {
  const tags = await Tag.find({});

  return res.status(StatusCodes.OK).json({
    message: "Ok",
    tags,
  });
};

export const createNewTags = async (req: Request, res: Response) => {
  await checkIsAdmin(req.user?.userID as string);

  const { name } = req.body as ITagRequest;
  if (!name) throw new BadRequest("Please provide name tag!");

  const tag = await Tag.create({
    name,
  });

  return res.status(StatusCodes.OK).json({
    message: `Create tag ${name} success`,
    tag,
  });
};

export const updateTag = async (req: Request, res: Response) => {
  await checkIsAdmin(req.user?.userID as string);

  const { name, newName } = req.body as ITagUpdateRequest;
  if (!name || !newName) throw new BadRequest("Please Provide All Field!");

  const tag = await Tag.findOne({ name });
  if (!tag) throw new BadRequest("Tag doesn't exists!");
  tag.name = newName;
  await tag.save();

  return res.status(StatusCodes.OK).json({
    message: `Update tag ${name} to ${newName} success`,
    tag,
  });
};

export const deleteTag = async (req: Request, res: Response) => {
  await checkIsAdmin(req.user?.userID as string);

  const { name } = req.body as ITagRequest;
  if (!name) throw new BadRequest("Please provide name tag!");
  const tag = await Tag.findOne({ name });
  if (!tag) throw new BadRequest(`Tag ${name} doesn't exists!`);

  await tag.delete();

  return res.status(StatusCodes.OK).json({
    message: `Deleted tag ${name} success!`,
  });
};
