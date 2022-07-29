import { connect, Mongoose } from "mongoose";

export const connectMongo = (URL: string): Promise<Mongoose> => {
  return connect(URL);
};
