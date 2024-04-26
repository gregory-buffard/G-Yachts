import express from "express";
import mongoose from "mongoose";
import yachtsRoutes from "./routes/yachtsRoutes";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const uri = process.env.MONGODB_URI_WEB || "";

mongoose
  .connect(uri)
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
  console.log(`Server is running at http://localhost:${PORT}, with MONGO uri being ${process.env.MONGODB_URI_WEB}`);
});
