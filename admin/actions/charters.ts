"use server"
import { Charter } from "@/models/charter";
import axios from "axios";
import { revalidatePath } from "next/cache";
import { Yacht } from "@/models/yacht";

export const uploadCharterImages = async (event: any, id: string) => {
    try {
        event.preventDefault();
        const formData = new FormData();
        const fileField = document.querySelector('input[type="file"]');

        const res = await fetch(`${process.env.API_URL}/images/charters/${id}`, {
            method: "POST",
            body: formData,
        });
        return await res.json().then((d) => console.log(d));
    } catch (e) {
        console.error(e);
    }
};

export const getChartersImages = async (id: string) => {
    try {
        const images = await Charter.findById(id).select("photos.gallery").exec()
        console.log(images.photos.gallery)
        return Array.from(images.photos.gallery).map((image: any) => {
            return `${process.env.NEXT_PUBLIC_API}/images/charters/${id}/${image}`
        });
    } catch (e) {
        console.error(e);
    }
}

export const getCharters = async () => {
    const res = await Charter.find().catch((e) => {
        throw e;
    });
    return JSON.parse(JSON.stringify(res))
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

export const removeChartersImage = async (id: string, photo: string) => {
    await fetch(`${process.env.API_URL}/images/charters/${id}/${photo}`, {
        method: "DELETE",
    }).then(async (d) => {
        console.log(d)
        const yacht = await Charter.findById(id).select("photos.gallery").exec()
        yacht.photos.gallery = yacht.photos.gallery.filter((image: any) => image !== photo);
        await yacht.save().catch((e: any) => {
            throw e;
        });
    }).catch((e) => {
        throw e;
    });
}