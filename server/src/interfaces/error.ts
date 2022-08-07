import { StatusCodes } from "http-status-codes";

export interface IError {
  message: string;
  statusCode: StatusCodes;
}
