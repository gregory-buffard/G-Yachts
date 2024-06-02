"use server";

import { Customer } from "@/models/customer";
import mongoose from "mongoose";

export const getCustomers = async () => {
    const customers = await Customer.find().lean();

    return customers.map(customer => ({
        ...customer,
        _id: (customer._id as mongoose.Schema.Types.ObjectId).toString()
    }));
}

export const claimCustomer = async (id: string) => {
    const customer = await Customer.findOne({
        _id: id
    });

    if (customer) {
        customer.status = "claimed";
        await customer.save();
        return true;
    }

    return null;
}

export const finishCustomer = async (id: string) => {
    const customer = await Customer.findOne({
        _id: id
    });

    if (customer) {
        customer.status = "finished";
        await customer.save();
        return true;
    }

    return true;
}

export const removeCustomer = async (id: string) => {
    await Customer.findByIdAndDelete(id);
    return true;
}