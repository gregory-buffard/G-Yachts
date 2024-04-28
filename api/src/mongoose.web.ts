import mongoose from "mongoose";

const uri = `mongodb://${process.env.MONGO_HOST}:27017`,
  user = process.env.MONGO_USER || "",
  pass = process.env.MONGO_PASS || "";

export const web = mongoose
  .createConnection(uri, {
    dbName: "web",
    user: user,
    pass: pass,
  })
  .asPromise()
  .then(() => console.log("Connection established"));
