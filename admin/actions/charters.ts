"use server"
import { Charter } from "@/models/charter";
import axios from "axios";
import { revalidatePath } from "next/cache";
import { Yacht } from "@/models/yacht";



export const getCharters = async () => {
    const res = await Charter.find().catch((e) => {
        throw e;
    });
    return JSON.parse(JSON.stringify(res))
}

export const changeCharterFeatured = async (id: string, photo: string) => {
    const charter = await Charter.findById(id).select("photos.gallery").exec()
    charter.photos.featured = photo;
    await charter.save().catch((e: any) => {
        throw e;
    });
}

export const fetchCharter = async (id: string) => {
    const res = await Charter.findById(id).catch((e) => {
        throw e;
    });
    return JSON.parse(JSON.stringify(res));
};

export const saveCharter = async (charter: any) => {
    await Charter.findByIdAndUpdate(charter._id, charter).catch((e) => {
        throw e;
    });
}
export const removeCharter = async (id: string) => {
    await Charter.findByIdAndDelete(id).catch((e) => {
        throw e;
    });
}
export const addCharter = async (charter: any) => {
    charter._id = undefined;
    const res = await new Charter(charter).save().catch((e: any) => {
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
    return { status: "OK" };

}
export const fetchFeatured = async () => {
    const res = await Charter.find({ featured: true })
        .select("_id name price builder photos length yearBuilt sleeps")
        .catch((e) => {
            throw e;
        });
    return JSON.parse(JSON.stringify(res));
};


export const removeCharterImage = async (id: string, index:number) => {
    const charter = await Charter.findById(id).select("photos.gallery").exec()
    charter.photos.gallery = charter.photos.gallery.filter((image: string, i:number) => i !== index);
    await charter.save().catch((e: any) => {
        throw e;
    });
    return { status: "OK" };
}

export const uploadCharterImage = async (id: string, photo:string) => {
    const charter = await Charter.findById(id).select("photos.gallery").exec()
    charter.photos.gallery.push(photo);
    await charter.save().catch((e: any) => {
        throw e;
    });
};

export const getCharterImages = async (id: string) => {
    try {
        const charter = await Charter.findById(id).select("photos.gallery").exec()
        console.log(charter.photos.gallery)
        return charter.photos.gallery;
    } catch (e) {
        console.error(e);
    }
}