import { NextFunction, Request, Response } from "express";
import { UnauthenticatedError } from "@errors/index";
import jwt, { CustomJWTPayload } from "jsonwebtoken";

declare module "jsonwebtoken" {
  export interface CustomJWTPayload extends jwt.JwtPayload {
    userID: string;
  }
}

declare global {
  namespace Express {
    interface Request {
      user?: {
        userID: string;
      };
    }
  }
}

export const auth = (req: Request, res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer"))
    throw new UnauthenticatedError("Authentication invalid");

  const token = authHeader.split(" ")[1];

  try {
    const payload = <CustomJWTPayload>(
      (<unknown>jwt.sign(token, process.env["JWT_SECRET"] as string))
    );

    req.user = {
      userID: payload.userID,
    };

    next();
  } catch (e) {
    throw new UnauthenticatedError("Authentication invalid");
  }
};
