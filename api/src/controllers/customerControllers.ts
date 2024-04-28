import { Customer } from "../models/customer";
import { Contact } from "../models/contact";
import { Request, Response } from "express";

export const newCustomer = async (req: Request, res: Response) => {
  const { email, ...rest } = req.body;
  try {
    let customer = await Customer.findOne({ email });
    if (customer) {
      customer = await Customer.findOneAndUpdate(
        { email },
        { $set: rest },
        { new: true },
      );
      return res.status(202);
    }
    const archived = await Contact.findOneAndDelete({ email });
    if (archived) {
      const createCustomer = new Customer(req.body);
      await createCustomer.save();
      return res.status(200);
    }
    const createCustomer = new Customer(req.body);
    await createCustomer.save();
    return res.status(201);
  } catch (e) {
    return res.status(500).send(e);
  }
};
