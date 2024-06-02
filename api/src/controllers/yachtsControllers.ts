import {Request, Response} from "express";
import path from "path";
import fs from "fs";
import multer from "multer";

export const getImages = async (req: Request, res: Response) => {
    try {
        const {id} = req.params;
        const {type, target} = req.body;
        const dir = path.join("/app/api/images/yachts/", type, id, target);
        fs.readdir(dir, (e, f) => {
            res.json(f);
        });
    } catch (e) {
        res.status(500).send(e);
    }
};

export const remove = async (req: Request, res: Response) => {
    try {
        const {id, photoName} = req.params;
        const {photo} = req.body;

        const targetDir = path.join(
            "/app/api/images/yachts/",
            id, photoName
        );
        fs.unlink(targetDir, (e) => {
                if (e) {
                    res
                        .status(500)
                        .send(`Error deleting file ${photoName} from ${targetDir}`);
                }
                res.status(200).send(`File ${photoName} deleted from ${targetDir}`);
            }
        );
    } catch (e) {
        res
            .status(500)
            .send(`Error deleting file`);
    }
}

    const storage = multer.diskStorage({
        destination: (req, f, cb) => {
            const {id} = req.params;
            const dir = path.join("/app/api/images/yachts", id);
            fs.mkdirSync(dir, {recursive: true});
            cb(null, dir);
        },
        filename: (req, f, cb) => {
            cb(null, f.originalname);
        },
    });
    export const uploadImages = multer({storage});
