export const checkPortAndDb = (
  port: string | undefined,
  uri: string | undefined
) => {
  if (!port) throw new Error("PORT ENV is missing!");
  if (!uri) throw new Error("MongoDB URI ENV is missing!");
};
