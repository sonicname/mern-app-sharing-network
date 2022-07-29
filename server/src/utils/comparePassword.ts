import bcrypt from "bcryptjs";

export const comparePassword = (hashPass: string, pass: string) =>
  bcrypt.compare(pass, hashPass);
