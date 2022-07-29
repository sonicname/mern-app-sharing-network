import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

export const notFound = (req: Request, res: Response) => {
  return res.status(StatusCodes.NOT_FOUND).json({
    message: "Route doesn't exists!",
  });
};
