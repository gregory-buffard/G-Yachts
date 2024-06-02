import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import adminRoutes from "./routes/adminRoutes";
import publicRoutes from "./routes/publicRoutes";
const kinde =require("@kinde-oss/kinde-auth-express");

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
const config = {
    clientId: process.env.KINDE_CLIENT_ID!,
    issuerBaseUrl: process.env.KINDE_ISSUER_URL!,
    siteUrl: "http://localhost:3000",
    secret: process.env.KINDE_CLIENT_SECRET!,
    redirectUrl: "http://localhost:3000",
    scope: "openid profile email",
    grantType: kinde.GrantType.AUTHORIZATION_CODE, //or CLIENT_CREDENTIALS or PKCE
    unAuthorisedUrl: "http://localhost:3000/unauthorised",
    postLogoutRedirectUrl: "http://localhost:3000"
};
kinde.setupKinde(config, app);