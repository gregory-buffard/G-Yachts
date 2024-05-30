"use server";


import axios from "axios";
import { revalidatePath } from "next/cache";
import {Yacht} from "@/models/yacht";


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

export const fetchGallery = async ({
  type,
  id,
  query,
}: {
  type: "sales" | "charter";
  id: string;
  query: string;
}) => {
  const res = await axios
    .get(`${process.env.API_URL}/yachts/images/${id}`, {
      data: { type: type, target: query },
    })
    .catch((e) => {
      throw e;
    });
  return res.data;
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
        const missingFieldsString = `Missing fields: (${missingFields.join(', ')})`;
        throw new Error(missingFieldsString);
    });
    return {status:"OK"};

}

export const changeFeatured = async ({
  type,
  id,
  photo,
}: {
  type: "sales" | "charter";
  id: string;
  photo: string;
}) => {
  const res = await axios
    .put(`${process.env.API_URL}/yachts/images/${id}`, {
      type,
      photo,
    })
    .then(
      async () =>
        await Yacht.findByIdAndUpdate(id, { "photos.featured": photo }),
    )
    .catch((e) => {
      throw e;
    });
  revalidatePath(`/${id}`);
  return res.status;
};

export const fetchFeatured = async () => {
  const res = await Yacht.find({ featured: true })
    .select("_id name price builder photos length yearBuilt sleeps")
    .catch((e) => {
      throw e;
    });
    return JSON.parse(JSON.stringify(res));
};
