import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";

import "express-async-errors";

import { checkPortAndDb } from "@utils/validation";
import { connectMongo } from "@db/index";
import { errorHandle, notFound } from "@middlewares/index";
import { routes } from "@routes/index";
import helmet from "helmet";
import rateLimit from "express-rate-limit";

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
// secure middleware
app.use(helmet());
app.disable("x-powered-by");

//Routes
routes(app);

//middleware
app.use(errorHandle);
app.use(notFound);

const start = async (): Promise<void> => {
  try {
    const PORT = process.env["PORT"];
    const URI_DB = process.env["MONGODB_URI"];
    checkPortAndDb(PORT, URI_DB);

    await connectMongo(URI_DB as string);
    app.listen(PORT, () => {
      console.log(`App listening on port ${PORT}!`);
    });
  } catch (e) {
    process.exit(1);
    throw e;
  }
};

start();
