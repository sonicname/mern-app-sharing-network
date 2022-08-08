import { Express, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import authRoute from "@routes/auth.route";
import tagsRoute from "@routes/tags.route";
import postRoute from "@routes/post.route";

export const routes = (app: Express) => {
  app.use("/api/v1/tags", tagsRoute);
  app.use("/api/v1/auth", authRoute);
  app.use("/api/v1/post", postRoute);

  app.get("/", (req: Request, res: Response) => {
    return res.status(StatusCodes.OK).json({
      message: "Hello world",
    });
  });
};
