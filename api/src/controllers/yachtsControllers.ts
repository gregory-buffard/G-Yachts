import { Featured } from "../models/yachts";
import { Request, Response } from "express";

export const getFeatured = async (req: Request, res: Response) => {
  try {
    const d = await Featured.find({ featured: true }).select(
      "name price builder length yearBuilt sleeps",
    );
    res.status(200).json(d);
  } catch (e) {
    res.status(500).send(e);
  }
};
