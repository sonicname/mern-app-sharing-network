import { NextFunction, Request, Response } from "express";
import { UnauthenticatedError } from "@errors/errors";
import JWTHelper from "@helpers/JWTHelper";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer"))
    throw new UnauthenticatedError("Authentication invalid");

  const token = authHeader.split(" ")[1];

  try {
    const payload = JWTHelper.verifyJWT(token); // verify jwt
    req.user = {
      userID: payload.userID,
    };

    next();
  } catch (e) {
    throw new UnauthenticatedError("Authentication invalid");
  }
};
