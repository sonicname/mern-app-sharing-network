import { Express, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import authRoute from "@routes/auth.route";
import storageRoute from "@routes/storage.route";

export const routes = (app: Express) => {
  app.use("/api/v1/auth", authRoute);
  app.use("/api/v1/storage", storageRoute);

  app.get("/", (req: Request, res: Response) => {
    return res.status(StatusCodes.OK).json({
      message: "Hello world",
    });
  });
};
