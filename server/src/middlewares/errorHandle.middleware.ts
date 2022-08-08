import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { IError } from "@interfaces/error.interface";

export const errorHandleMiddleware = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(error);
  const defaultError: IError = {
    message: error.message,
    statusCode: error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
  };

  if (error.code && error.code === 11000) {
    defaultError.message = `${Object.keys(
      error.keyValue
    )} field has to be unique!`;
    defaultError.statusCode = StatusCodes.BAD_REQUEST;
  }

  return res.status(defaultError.statusCode).json({
    message: defaultError.message,
  });
};
