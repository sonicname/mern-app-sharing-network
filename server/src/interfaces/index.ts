import { JwtPayload } from "jsonwebtoken";

declare module "jsonwebtoken" {
  export interface CustomJWTPayload extends JwtPayload {
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

export interface IRequest {
  email: string;
  password: string;
}

export interface IExtentRequestBody extends IRequest {
  username: string;
}

export interface IError {
  statusCode: number;
  message: string;
}
