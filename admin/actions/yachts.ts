"use server";


import axios from "axios";
import { revalidatePath } from "next/cache";
import {Yacht} from "@/models/yacht";


export const getYachtFeatured = async (id: string) => {
    try {
        const featured = await Yacht.findById(id).select("photos.featured").exec()
        return String(featured.photos.featured);
    } catch (e) {
        return "";
    }
}

export const changeYachtFeatured = async (id: string, photo: string) => {
    const yacht = await Yacht.findById(id).select("photos.gallery").exec()
    yacht.photos.featured = photo;
    await yacht.save().catch((e: any) => {
        throw e;
    });
}

export const fetchYachts = async () => {
  const res = await Yacht.find()
    .catch((e) => {
      throw e;
    });
  return JSON.parse(JSON.stringify(res))
};

export const fetchYacht = async (id: string ) => {
  const res = await Yacht.findById(id).catch((e) => {
    throw e;
  });
  return JSON.parse(JSON.stringify(res));
};

export const saveYacht = async (yacht: any) => {
    await Yacht.findByIdAndUpdate(yacht._id, yacht).catch((e) => {
        throw e;
    });
}
export const removeYacht = async (id: string) => {
    await Yacht.findByIdAndDelete(id).catch((e) => {
        throw e;
    });
    console.log(id, " removed")
}
export const addYacht = async (yacht: any) => {
    yacht._id =undefined;
    const res = await new Yacht(yacht).save().catch((e:any) => {
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

export const fetchYachtFeatured = async () => {
  const res = await Yacht.find({ featured: true })
    .select("_id name price builder photos length yearBuilt sleeps")
    .catch((e) => {
      throw e;
    });
    return JSON.parse(JSON.stringify(res));
};

export const removeYachtImage = async (id: string, photo: string) => {
    await fetch(`${process.env.API_URL}/yachts/images/${id}/${photo}`, {
        method: "DELETE",
    }).then(async (d) => {
        console.log(d)
        const yacht = await Yacht.findById(id).select("photos.gallery").exec()
        yacht.photos.gallery = yacht.photos.gallery.filter((image: any) => image !== photo);
        await yacht.save().catch((e: any) => {
            throw e;
        });
    }).catch((e) => {
        throw e;
    });
}
export const getYachtImages = async (id: string) => {
    try {
        const images = await Yacht.findById(id).select("photos.gallery").exec()
        console.log(images.photos.gallery)
        return Array.from(images.photos.gallery).map((image: any) => {
            return `${process.env.NEXT_PUBLIC_API}/images/yachts/${id}/${image}`
        });
    } catch (e) {
        console.error(e);
    }
}