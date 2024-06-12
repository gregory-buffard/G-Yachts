import mongoose from "mongoose";

export const useWeb = mongoose.createConnection(process.env.MONGO_URI!, {
  dbName: "web",
  user: process.env.MONGO_USER,
  pass: process.env.MONGO_PASS,
});

export const usePanel = mongoose.createConnection(process.env.MONGO_URI!, {
  dbName: "panel",
  user: process.env.MONGO_USER,
  pass: process.env.MONGO_PASS,
});
