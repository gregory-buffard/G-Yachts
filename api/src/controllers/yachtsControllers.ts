import { Featured } from "../models/yachts";
import { Request, Response } from "express";

export const getFeatured = async (req: Request, res: Response) => {
  try {
    console.log("getFeatured called");
    const d = await Featured.find({ featured: true }).select(
      "name price builder length yearBuilt sleeps",
    );
    res.json(d);
  } catch (e) {
    res.status(500).send(e);
  }
};
