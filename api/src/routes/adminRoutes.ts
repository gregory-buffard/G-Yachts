import express from "express";
import { uploadImages, changeFeatured } from "../controllers/yachtsControllers";
import {protectRoute} from "@kinde-oss/kinde-node-express";

const router = express.Router();


router.use(protectRoute)
router.post("/yachts/images/:id", uploadImages.array("images"), (req, res) =>
  res.status(200),
);
router.post("/charters/images/:id", uploadImages.array("images"), (req, res) =>
    res.status(200),
);
router.post("/destinations/images/:id", uploadImages.array("images"), (req, res) =>
    res.status(200),
);


export default router;
