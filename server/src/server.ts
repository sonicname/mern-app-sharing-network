import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import fileUpload from "express-fileupload";

import "express-async-errors";

import connectMongo from "@db/database";
import routes from "@routes/index";
import DiscordWebhook from "@helpers/DiscordWebhook";
import JWTHelper from "@helpers/JWTHelper";

import { errorHandleMiddleware, notFoundMiddleware } from "@middlewares/index";

dotenv.config();

const app = express();

// middleware
if (process.env["NODE_ENV"] === "dev") {
  app.use(morgan("dev"));
}

if (process.env["NODE_ENV"] === "production") {
  app.use(
    rateLimit({
      windowMs: 5 * 60 * 1_000,
      max: 100,
      standardHeaders: false,
      legacyHeaders: false,
    })
  );
}
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(
  fileUpload({
    limits: {
      fileSize: 8 * 1024 * 1024,
    },
    abortOnLimit: true,
    uploadTimeout: 60_000,
  })
);
// secure middleware
app.use(helmet());
app.disable("x-powered-by");

//Routes
routes(app);

//middleware
app.use(errorHandleMiddleware);
app.use(notFoundMiddleware);

const start = async (): Promise<void> => {
  try {
    const PORT = process.env["PORT"];
    await connectMongo(process.env["MONGODB_URI"] as string);
    console.log("Database connected!");
    new DiscordWebhook(process.env["DISCORD_STORAGE"] as string);
    new JWTHelper(
      process.env["JWT_SECRET"] as string,
      process.env["JWT_LIFETIME"] as string
    );
    app.listen(PORT, () => {
      console.log(`App listening on port ${PORT}!`);
    });
  } catch (e) {
    console.log(e);
    process.exit(1);
  }
};

start();
