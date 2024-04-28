import mongoose from "mongoose";
import express from "express";
import yachtsRoutes from "./routes/yachtsRoutes";
//import customerRoutes from "./routes/customerRoutes";
import dotenv from "dotenv";
import cors from "cors";
import { web } from "./mongoose.web";
import { panel } from "./mongoose.panel";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const uri = `mongodb://${process.env.MONGO_HOST}:27017`,
  user = process.env.MONGO_USER || "",
  pass = process.env.MONGO_PASS || "";

web.then(() => {
  app.use("/yachts", yachtsRoutes);
});

panel.on("connected", () => {
  console.log("MongoDB panel connected");
});

/*mongoose
  .connect(uri, {
    dbName: db,
    user: user,
    pass: pass,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((e) => console.log(e));*/

app.use(express.json());
app.use(
  cors({
    origin: process.env.WEB_URL,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: "Content-Type, Authorization",
    credentials: true,
  }),
);

/*const openRoutes = async () => {
  web.then(() => {
    app.use("/yachts", yachtsRoutes);
  });
};*/
//app.use("/customer", customerRoutes);

app.listen(PORT, () => {
  console.log(`Server is at port ${PORT}.`);
});
