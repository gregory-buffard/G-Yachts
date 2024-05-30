"use server";



import {Yacht} from "@/models/yacht";

export const uploadImages = async (event: any, id: string) => {
    try {
        event.preventDefault();
        const formData = new FormData();
        const fileField = document.querySelector('input[type="file"]');

        const res = await fetch(`${process.env.API_URL}/yachts/images/${id}`, {
            method: "POST",
            body: formData,
        });
        return await res.json().then((d) => console.log(d));
    } catch (e) {
        console.error(e);
    }
};

export const getImages = async (id: string) => {
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

export const getFeatured = async (id: string) => {
    try {
        const featured = await Yacht.findById(id).select("photos.featured").exec()
        return String(featured.photos.featured);
    } catch (e) {
        return "";
    }
}

export const changeFeatured = async (id: string, photo: string) => {
    const yacht = await Yacht.findById(id).select("photos.gallery").exec()
    yacht.photos.featured = photo;
    await yacht.save().catch((e: any) => {
        throw e;
    });
}
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