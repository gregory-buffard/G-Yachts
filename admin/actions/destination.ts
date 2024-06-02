"use server"

import {Destination} from "@/models/destination";
import {Charter} from "@/models/charter";
import {Yacht} from "@/models/yacht";

export const getDestinations = async () => {
    const res = await Destination.find()
        .catch((e) => {
            throw e;
        });
    return JSON.parse(JSON.stringify(res))
}

export const saveDestination = async (yacht: any) => {
    await Destination.findByIdAndUpdate(yacht._id, yacht).catch((e) => {
        throw e;
    });
}
export const removeDestination = async (id: string) => {
    await Destination.findByIdAndDelete(id).catch((e) => {
        throw e;
    });
    console.log(id, " removed")
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
        if (missingFields.length === 0) {
            throw e;

        }
        const missingFieldsString = `Missing fields: (${missingFields.join(', ')})`;
        throw new Error(missingFieldsString);
    });
    return {status:"OK"};

}

export const replaceDestinationImage = async (id: string, target:string, photo:string) => {
    const destination = await Destination.findById(id).select("photos").exec()
    destination.photos[target] = photo;
    await destination.save().catch((e: any) => {
        throw e;
    });

}

export const uploadDestinationImage = async (id: string, photo:string) => {
    const destination = await Destination.findById(id).select("photos.gallery").exec()
    destination.photos.gallery.push(photo);
    await destination.save().catch((e: any) => {
        throw e;
    });
};

export const getDestinationImages = async (id: string) => {
    try {
        const destination = await Destination.findById(id).select("photos").exec()
        return destination.photos;
    } catch (e) {
        console.error(e);
    }
}
