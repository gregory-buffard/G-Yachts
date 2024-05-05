import express from "express";
import { uploadImages, changeFeatured } from "../controllers/yachtsControllers";

const router = express.Router();

router.post("/yachts/images/:id", uploadImages.array("images"), (req, res) =>
  res.status(200),
);

router.put("/yachts/images/:id", changeFeatured, (req, res) => res.status(200));

export default router;
