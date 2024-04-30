import express from "express";
import * as yachtsControllers from "../controllers/yachtsControllers";

const router = express.Router();

router.get("/images/:id", yachtsControllers.getImages);
router.post(
  "/images/:id",
  yachtsControllers.uploadImages.array("images"),
  (req, res) => res.status(200),
);

export default router;
