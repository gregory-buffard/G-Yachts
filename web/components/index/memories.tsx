import React from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import memories from "@/public/imagery/optimized/index/memories.webp";

const Memories = () => {
  const t = useTranslations("index.memories");
  return (
    <div className="bg-rock-100 bg-cover w-full h-full ">
      <div className="grid lg:grid-cols-2 md:grid-cols-1 grid-cols-1">
        <Image
          className="flex flex-col col-span-1 w-screen h-full"
          src={memories}
          alt="Room in the yacht"
        />

        <div className="grid grid-rows-12 flex items-center justify-center flex-col col-span-1">
          <div className="row-span-4 justify-center items-center mx-auto p-10">
            <h4 className="">{t("subtitle")}</h4>
            <h1 className="text-black font-slick font-light">{t("create")}</h1>
            <h1 className="text-black font-classic font-medium">
              {t("memories")}
            </h1>
          </div>

          <div className="row-span-8 flex flex-col items-center justify-center ml-36 h-full">
            <div className="flex flex-col justify-items-center">
              <p className="text-black md:text-xl font-classic md:w-7/12  mr-24 text-base">
                {t("paragraph")}
              </p>
              <button
                type={"button"}
                className="glass-button text-black border-black/25 w-56 my-5"
              >
                Charter a yacht
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Memories;
