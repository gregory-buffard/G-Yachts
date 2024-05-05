import { Request, Response } from "express";
import path from "path";
import fs from "fs";
import multer from "multer";

export const getImages = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { type, target } = req.body;
    const dir = path.join("/app/api/images/yachts/", type, id, target);
    fs.readdir(dir, (e, f) => {
      res.json(f);
    });
  } catch (e) {
    res.status(500).send(e);
  }
};

export const changeFeatured = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { photo, type } = req.body;

    const sourceDir = path.join("/app/api/images/yachts/", type, id, "gallery");
    const targetDir = path.join(
      "/app/api/images/yachts/",
      type,
      id,
      "featured",
    );

    fs.readdir(targetDir, (e, files) => {
      if (e) return res.status(500).send(e);

      for (let file of files) {
        fs.unlink(path.join(targetDir, file), (e) => {
          if (e) return res.status(500).send(e);
        });
      }

      const sourceFile = path.join(sourceDir, photo);
      const targetFile = path.join(targetDir, photo);

      fs.copyFile(sourceFile, targetFile, (e) => {
        if (e) return res.status(500).send(e);
        res.status(200);
      });
    });
  } catch (e) {
    res.status(500).send(e);
  }
};

const storage = multer.diskStorage({
  destination: (req, f, cb) => {
    const { id } = req.params;
    const dir = path.join("/app/api/images/yachts", id);
    fs.mkdirSync(dir, { recursive: true });
    cb(null, dir);
  },
  filename: (req, f, cb) => {
    cb(null, f.originalname);
  },
});
export const uploadImages = multer({ storage });
