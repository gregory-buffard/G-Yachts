import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import adminRoutes from "./routes/adminRoutes";
import publicRoutes from "./routes/publicRoutes";

dotenv.config();

const port = process.env.PORT || 5000;
const env = process.env.NODE_ENV || "public";
const host = process.env.HOST || "localhost";
const app = express().use(express.json());

switch (env) {
  case "public":
    app
      .use(
        cors({
          origin: `http://${host}:3000`,
          methods: "GET,HEAD,PUT,PATCH,POST",
          allowedHeaders: "Content-Type, Authorization",
          credentials: true,
        }),
      )
      .use("/", publicRoutes)
      .listen(port, () => console.log(`Public server is at port ${port}.`));
    break;
  case "admin":
    app
      .use(
        cors({
          origin: `http://${host}:3000`,
          methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
          allowedHeaders: "Content-Type, Authorization",
          credentials: true,
        }),
      )
      .use("/", adminRoutes)
      .use("/", publicRoutes)
      .listen(port, () => console.log(`Admin server is at port ${port}.`));
}
