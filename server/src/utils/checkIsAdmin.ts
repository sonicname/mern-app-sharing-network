import { User } from "@models/index";

export const checkIsAdmin = async (userID: string): Promise<boolean> => {
  const user = await User.findOne({ _id: userID }).select("+role");
  return !(!user || user.role !== "admin");
};
