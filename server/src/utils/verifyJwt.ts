import { CustomJWTPayload, verify } from "jsonwebtoken";

export default function verifyJwt(token: string): CustomJWTPayload {
  return verify(token, process.env["JWT_SECRET"] as string) as CustomJWTPayload;
}
