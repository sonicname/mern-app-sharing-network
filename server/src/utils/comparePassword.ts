import bcrypt from "bcryptjs";

export default function comparePassword(
  hashPass: string,
  pass: string
): Promise<boolean> {
  return bcrypt.compare(pass, hashPass);
}
