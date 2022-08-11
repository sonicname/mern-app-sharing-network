import User from "@models/User.model";
import { UnauthenticatedError } from "@errors/errors";
import { compare } from "bcryptjs";

export default class AuthHelper {
  static async checkIsAdmin(userID: string) {
    const user = await User.findOne({ _id: userID }).select("+role");
    if (!user || user.role !== "admin")
      throw new UnauthenticatedError("You are not admin");
  }

  static async comparePassword(password: string, hashPassword: string) {
    return compare(password, hashPassword);
  }
}
