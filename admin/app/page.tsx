"use client";

import { uploadImages } from "@/app/actions";

const Home = () => {
  return (
    <main className="w-full h-screen flex justify-center items-center">
      <form
        action={async (formData) => {
          await uploadImages(formData, "662810408f1b183f77e99b57");
        }}
      >
        <input type={"file"} name={"images"} multiple />
        <button type={"submit"}>Upload</button>
      </form>
    </main>
  );
};

export default Home;
