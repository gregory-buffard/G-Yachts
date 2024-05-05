import express from "express";
import { getImages } from "../controllers/yachtsControllers";

const router = express.Router();

router.get("/yachts/images/sales/:id", getImages);

export default router;
