import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { IError } from "@interfaces/index";

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
    defaultError.message = "Email or username is already exists!";
    defaultError.statusCode = StatusCodes.BAD_REQUEST;
  }

  return res.status(defaultError.statusCode).json({
    message: defaultError.message,
  });
};
