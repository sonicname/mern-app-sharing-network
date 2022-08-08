import { User } from "@models/index";
import { UnauthenticatedError } from "@errors/errors";

export default async function checkIsAdmin(userID: string): Promise<void> {
  const user = await User.findOne({ _id: userID }).select("+role");
  if (!user || user.role !== "admin")
    throw new UnauthenticatedError("You are not admin");
}
