import { CustomJWTPayload, verify, JwtPayload } from "jsonwebtoken";

declare module "jsonwebtoken" {
  export interface CustomJWTPayload extends JwtPayload {
    userID: string;
  }
}

export const verifyJwt = (token: string): CustomJWTPayload => {
  return verify(token, process.env["JWT_SECRET"] as string) as CustomJWTPayload;
};
