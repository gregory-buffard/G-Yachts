import {Charter} from "@/models/charter";
import axios from "axios";
import {revalidatePath} from "next/cache";


export const getCharters = async () => {
    const res = await Charter.find().catch((e) => {
        throw e;
    });
    return JSON.parse(JSON.stringify(res))
}

export const fetchCharter = async (id: string ) => {
    const res = await Charter.findById(id).catch((e) => {
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
        .get(`${process.env.API_URL}/charter/images/${id}`, {
            data: { type: type, target: query },
        })
        .catch((e) => {
            throw e;
        });
    return res.data;
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
    charter._id =undefined;
    const res = await new Charter(charter).save().catch((e:any) => {
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
        .put(`${process.env.API_URL}/charter/images/${id}`, {
            type,
            photo,
        })
        .then(
            async () =>
                await Charter.findByIdAndUpdate(id, { "photos.featured": photo }),
        )
        .catch((e) => {
            throw e;
        });
    revalidatePath(`/${id}`);
    return res.status;
};

export const fetchFeatured = async () => {
    const res = await Charter.find({ featured: true })
        .select("_id name price builder photos length yearBuilt sleeps")
        .catch((e) => {
            throw e;
        });
    return JSON.parse(JSON.stringify(res));
};
