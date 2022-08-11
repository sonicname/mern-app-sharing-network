import { CustomJWTPayload, verify, sign } from "jsonwebtoken";
import { Types } from "mongoose";

export default class JWTHelper {
  private static JWTSecret: string;
  private static JWTLifeTime: string;

  constructor(secret: string, lifetime: string) {
    JWTHelper.JWTSecret = secret;
    JWTHelper.JWTLifeTime = lifetime;
  }

  static verifyJWT(token: string): CustomJWTPayload {
    return verify(token, this.JWTSecret) as CustomJWTPayload;
  }

  static generateJWT(userID: Types.ObjectId): string {
    return sign({ userID }, this.JWTSecret, {
      expiresIn: this.JWTLifeTime,
    });
  }
}
