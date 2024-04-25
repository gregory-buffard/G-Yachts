import express from "express";
import * as yachtsControllers from "../controllers/yachtsControllers";

const router = express.Router();

router.get("/featured", yachtsControllers.getFeatured);

export default router;
