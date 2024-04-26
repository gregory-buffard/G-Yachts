import React from "react";
import { useTranslations } from "next-intl";

const Memories = () => {
  const t = useTranslations("memories");
  return (
    <div className="bg-rock-100 bg-cover w-full h-full ">
      <div className="grid lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-1">
        <img
          className="flex flex-col col-span-1 w-screen h-full"
          src={"/imagery/savannah.jpeg"}
          alt="Sales"
        />

        <div className="grid grid-rows-12 flex items-center justify-center flex-col col-span-1">
          <div className="row-span-4 justify-center items-center mx-auto p-10">
            <h2 className="">{t("subtitle")}</h2>
            <h1 className="text-black font-slick font-light">{t("create")}</h1>
            <h1 className="text-black font-classic font-medium">
              {t("memories")}
            </h1>
          </div>

          <div className="row-span-8 flex flex-col items-center justify-center ml-36 h-full">
            <div className="flex flex-col justify-items-center">
              <p className="text-black md:text-xl font-classic md:w-7/12  sm:mr-24 sm:text-base">
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
