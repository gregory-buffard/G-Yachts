import express from "express";
import {uploadImages, remove} from "../controllers/yachtsControllers";
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
router.delete("/yachts/images/:id/:photoName", remove);
router.delete("/charters/images/:id/:photoName", remove);
router.delete("/destinations/images/:id/:photoName", remove);



export default router;
