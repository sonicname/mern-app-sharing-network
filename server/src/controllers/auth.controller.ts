import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import User from "@models/User.model";
import { generateJwt, comparePassword } from "@utils/index";
import { BadRequest, UnauthenticatedError } from "@errors/errors";
import { IAuthRequest, IExtentAuthRequest } from "@interfaces/auth.interface";

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body as IAuthRequest;
  if (!email || !password) {
    throw new BadRequest("Please provide all email, password");
  }

  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    throw new BadRequest("User doesn't exists!");
  }

  const isPasswordMatch = await comparePassword(user.password, password);
  if (!isPasswordMatch) {
    throw new UnauthenticatedError("Invalid Credentials");
  }

  const token = generateJwt(user._id);

  return res.status(StatusCodes.OK).json({
    username: user.username,
    email: user.email,
    token,
  });
};

export const registerUser = async (req: Request, res: Response) => {
  const { email, password, username } = req.body as IExtentAuthRequest;
  if (!email || !password || !username) {
    throw new BadRequest("Please provide all username, email, password!");
  }

  const user = await User.create(req.body);
  //generate jwt token
  const token = generateJwt(user._id);

  return res.status(StatusCodes.OK).json({
    username: user.username,
    email: user.email,
    token,
  });
};

export const updateUser = async (req: Request, res: Response) => {
  const { email, password, username } = req.body as IExtentAuthRequest;
  if (!email || !password || !username) {
    throw new BadRequest("Please provide all email, password, username");
  }

  const user = await User.findOne({ _id: req.user?.userID }).select(
    "+password"
  );

  if (user) {
    user.email = email;
    user.username = username;
    user.password = password;
  } else {
    throw new UnauthenticatedError("Invalid Credentials");
  }

  await user.save();
  const token = generateJwt(user._id);
  return res.status(StatusCodes.OK).json({
    email: user.email,
    username: user.username,
    token,
  });
};
