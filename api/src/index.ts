import express from "express";
import mongoose from "mongoose";
import yachtsRoutes from "./routes/yachtsRoutes";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const uri = `mongodb://host.docker.internal:27017`;
const db = process.env.DB || "";
const user = process.env.USER || "";
const pass = process.env.PASS || "";

mongoose
  .connect(uri, {
    dbName: db,
    user: user,
    pass: pass,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((e) => console.log(e));

app.use(express.json());
app.use(
  cors({
    origin: process.env.WEB_URL,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: "Content-Type, Authorization",
    credentials: true,
  }),
);

app.use("/yachts", yachtsRoutes);

app.listen(PORT, () => {
  console.log(`Server is at port ${PORT}.`);
});
