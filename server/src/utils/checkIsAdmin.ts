import { User } from "@models/index";
import { UnauthenticatedError } from "@errors/index";

export default async function checkIsAdmin(userID: string): Promise<void> {
  const user = await User.findOne({ _id: userID }).select("+role");
  if (!user || user.role !== "admin")
    throw new UnauthenticatedError("You are not admin");
}
