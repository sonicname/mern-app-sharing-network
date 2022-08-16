import { Express, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import authRoute from "@routes/auth.route";
import postRoute from "@routes/post.route";

export default function routes(app: Express) {
  app.use("/api/v1/auth", authRoute);
  app.use("/api/v1/post", postRoute);

  app.get("/", (req: Request, res: Response) =>
    res.status(StatusCodes.OK).json({
      message: "Hello world",
    })
  );
}
