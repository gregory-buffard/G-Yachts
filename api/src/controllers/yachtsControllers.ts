import { Request, Response } from "express";
import path from "path";
import fs from "fs";
import multer from "multer";

export const getImages = async (req: Request, res: Response) => {
  try {
    const type = req.query.type!.toString() || "sales";
    const { id } = req.params;
    const query = req.query.dir!.toString() || "gallery";
    const dir = path.join("/app/api/images/yachts/", type, id, query);
    fs.readdir(dir, (e, f) => {
      const d = f.map(
        (f) => `http://51.75.16.185/images/yachts/${type}/${id}/${query}/${f}`,
      );
      res.json(d);
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
