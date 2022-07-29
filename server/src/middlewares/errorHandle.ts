import { NextFunction, Request, Response } from "express";
import { CustomError } from "@errors/index";
import { StatusCodes } from "http-status-codes";

interface IError {
  statusCode: number;
  message: string;
}

export const errorHandle = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const defaultError: IError = {
    message: error.message,
    statusCode: error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
  };

  if (error.code === 11000) {
    defaultError.message = "User is already exists!";
    defaultError.statusCode = StatusCodes.BAD_REQUEST;
  }

  return res.status(defaultError.statusCode).json({
    message: defaultError.message,
  });
};
