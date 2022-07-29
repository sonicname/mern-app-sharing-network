import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { BadRequest } from "@errors/index";
import User from "@models/User.model";
import jwt from "jsonwebtoken";

interface IRequestBody {
  username: string;
  email: string;
  password: string;
}

export const loginUser = async (req: Request, res: Response) => {};

export const registerUser = async (req: Request, res: Response) => {
  const { email, password, username } = req.body as IRequestBody;
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
