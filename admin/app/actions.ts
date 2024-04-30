"use server";

export const uploadImages = async (formData: FormData, id: string) => {
  const rawFormData = formData.getAll("images");
  const d = new FormData();
  rawFormData.forEach((f) => d.append("images", f));
  try {
    const res = await fetch(`${process.env.API_URL}/yachts/images/${id}`, {
      method: "POST",
      body: d,
    });
    return await res.json().then((d) => console.log(d));
  } catch (e) {
    console.error(e);
  }
};
