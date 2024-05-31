"use server"

import {Destination} from "@/models/destination";
import {Charter} from "@/models/charter";

export const getDestinations = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/destinations`);
    const data = await res.json();
    return data;
}

export const addDestination = async (destination: any) => {
    destination._id =undefined;
    const res = await new Destination(destination).save().catch((e:any) => {
        const regex = /Path `(\w+)` is required/g;
        let missingFields = [];
        let match;

        while ((match = regex.exec(e)) !== null) {
            missingFields.push(match[1]);
        }
        const missingFieldsString = `Missing fields: (${missingFields.join(', ')})`;
        throw new Error(missingFieldsString);
    });
    return {status:"OK"};

}