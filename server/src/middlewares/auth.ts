import { NextFunction, Request, Response } from "express";
import { UnauthenticatedError } from "@errors/index";
import { verifyJwt } from "@utils/index";

export const auth = (req: Request, res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer"))
    throw new UnauthenticatedError("Authentication invalid");

  const token = authHeader.split(" ")[1];

  try {
    const payload = verifyJwt(token); // verify jwt
    req.user = {
      userID: payload.userID,
    };

    next();
  } catch (e) {
    throw new UnauthenticatedError("Authentication invalid");
  }
};
