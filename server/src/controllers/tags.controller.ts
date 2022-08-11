import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import Tag from "@models/Tag.model";
import { BadRequest } from "@errors/errors";
import {
  ICreateTagRequest,
  IDeleteTagRequest,
  IUpdateTagRequest,
} from "@interfaces/tags.interface";
import AuthHelper from "@helpers/AuthHelper";

const getAllTags = async (req: Request, res: Response) => {
  const tags = await Tag.find().select("name");
  return res.status(StatusCodes.OK).json({
    message: "Ok",
    tags,
  });
};

const createNewTags = async (req: Request, res: Response) => {
  await AuthHelper.checkIsAdmin(req.user?.userID as string);

  const { name } = req.body as ICreateTagRequest;
  if (!name) throw new BadRequest("Please provide name tag!");

  const tag = await Tag.create({
    name,
  });

  return res.status(StatusCodes.OK).json({
    message: `Create tag ${name} success`,
    tag,
  });
};

const updateTag = async (req: Request, res: Response) => {
  await AuthHelper.checkIsAdmin(req.user?.userID as string);

  const { name, newName } = req.body as IUpdateTagRequest;
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

const deleteTag = async (req: Request, res: Response) => {
  await AuthHelper.checkIsAdmin(req.user?.userID as string);

  const { name } = req.body as IDeleteTagRequest;
  if (!name) throw new BadRequest("Please provide name tag!");
  const tag = await Tag.findOne({ name });
  if (!tag) throw new BadRequest(`Tag ${name} doesn't exists!`);

  await tag.delete();

  return res.status(StatusCodes.OK).json({
    message: `Deleted tag ${name} success!`,
  });
};

export { getAllTags, createNewTags, updateTag, deleteTag };