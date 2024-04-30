import express from "express";
import { uploadImages } from "../controllers/yachtsControllers";

const router = express.Router();

router.post("/yachts/images/:id", uploadImages.array("images"), (req, res) =>
  res.status(200),
);

export default router;
