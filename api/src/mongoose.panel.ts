import mongoose from "mongoose";

const uri = `mongodb://${process.env.MONGO_HOST}:27017`,
  user = process.env.MONGO_USER || "",
  pass = process.env.MONGO_PASS || "";

export const panel = mongoose.createConnection(uri, {
  dbName: "panel",
  user: user,
  pass: pass,
});
