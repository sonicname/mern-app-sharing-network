import express, { Response, Request } from "express";
import dotenv from "dotenv";

dotenv.config();
const PORT = process.env["PORT"] || 3000;

const app = express();

app.get("/", (req: Request, res: Response) => {
  return res.json({
    message: "Hello world",
  });
});

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}!`);
});
