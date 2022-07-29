import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { BadRequest, UnauthenticatedError } from "@errors/index";
import User from "@models/User.model";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

interface IRequest {
  email: string;
  password: string;
}

interface IExtentRequestBody extends IRequest {
  username: string;
}

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body as IRequest;
  if (!email || !password) {
    throw new BadRequest("Please provide all email, password");
  }

  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    throw new BadRequest("User isn't exists!");
  }

  const isPasswordMatch = await bcrypt.compare(password, user.password);
  if (!isPasswordMatch) {
    throw new UnauthenticatedError("Invalid Credentials");
  }

  const token = jwt.sign(
    { userID: user._id },
    process.env["JWT_SECRET"] as string,
    {
      expiresIn: process.env["JWT_LIFETIME"],
    }
  );

  return res.status(StatusCodes.OK).json({
    username: user.username,
    email: user.email,
    token,
  });
};

export const registerUser = async (req: Request, res: Response) => {
  const { email, password, username } = req.body as IExtentRequestBody;
  if (!email || !password || !username) {
    throw new BadRequest("Please provide all username, email, password!");
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    throw new BadRequest("Email is already in used!");
  }

  const user = await User.create(req.body);
  //generate jwt token
  const token = jwt.sign(
    { userID: user._id },
    process.env["JWT_SECRET"] as string,
    {
      expiresIn: process.env["JWT_LIFETIME"],
    }
  );

  return res.status(StatusCodes.OK).json({
    username: user.email,
    email: user.email,
    token,
  });
};

export const updateUser = async (req: Request, res: Response) => {};
