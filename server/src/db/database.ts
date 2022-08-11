import { connect } from "mongoose";

export default function connectMongo(URL: string) {
  return connect(URL);
}
