import express from "express";
import * as customerControllers from "../controllers/customerControllers";

const router = express.Router();

router.get("/new", customerControllers.newCustomer);

export default router;
