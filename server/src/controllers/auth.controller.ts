import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import User from "@models/User.model";

import JWTHelper from "@helpers/JWTHelper";
import AuthHelper from "@helpers/AuthHelper";

import { BadRequest, UnauthenticatedError } from "@errors/errors";
import {
  ILoginRequest,
  IRegisterRequest,
  IUpdateRequest,
} from "@interfaces/auth.interface";

const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body as ILoginRequest;
  if (!email || !password)
    throw new BadRequest("Please provide all email, password");

  const user = await User.findOne({ email }).select("+password");
  if (!user) throw new BadRequest("User doesn't exists!");

  const isPasswordMatch = await AuthHelper.comparePassword(
    password,
    user.password
  );
  if (!isPasswordMatch) throw new UnauthenticatedError("Invalid credentials");

  const token = JWTHelper.generateJWT(user._id);

  return res.status(StatusCodes.OK).json({
    username: user.username,
    email: user.email,
    token,
  });
};

const registerUser = async (req: Request, res: Response) => {
  const { email, password, username } = req.body as IRegisterRequest;
  if (!email || !password || !username) {
    throw new BadRequest("Please provide all username, email, password!");
  }

  const user = await User.create({
    email,
    password,
    username,
  });
  //generate jwt token
  const token = JWTHelper.generateJWT(user._id);

  return res.status(StatusCodes.OK).json({
    username: user.username,
    email: user.email,
    token,
  });
};

const updateUser = async (req: Request, res: Response) => {
  const { email, password, username } = req.body as IUpdateRequest;
  if (!email || !password || !username)
    throw new BadRequest("Please provide all email, password, username");

  const user = await User.findOne({ _id: req.user?.userID }).select(
    "+password"
  );

  if (!user) throw new UnauthenticatedError("Invalid credentials");

  user.email = email;
  user.username = username;
  user.password = password;

  await user.save();
  const token = JWTHelper.generateJWT(user._id);

  return res.status(StatusCodes.OK).json({
    email,
    username,
    token,
  });
};

export { loginUser, registerUser, updateUser };
