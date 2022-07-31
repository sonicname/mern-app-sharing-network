export const checkPortAndDb = () => {
  const PORT = process.env["PORT"];
  const MONGODB_URI = process.env["MONGODB_URI"];
  const JWT_SECRET = process.env["JWT_SECRET"];
  const JWT_LIFETIME = process.env["JWT_LIFETIME"];
  const FILE_UPLOAD = process.env["FILE_UPLOAD"];
  const DISCORD_WEBHOOK = process.env["DISCORD_STORAGE"];

  if (!PORT) {
    throw new Error("PORT in ENV is empty!");
  }
  if (!MONGODB_URI) {
    throw new Error("MONGODB_URI is empty!");
  }
  if (!JWT_SECRET) {
    throw new Error("JWT_SECRET is empty!");
  }
  if (!JWT_LIFETIME) {
    throw new Error("JWT_LIFETIME is empty!");
  }
  if (!FILE_UPLOAD) {
    throw new Error("FILE_UPLOAD is empty");
  }
  if (!DISCORD_WEBHOOK) {
    throw new Error("DISCORD_WEBHOOK is empty!");
  }
};
