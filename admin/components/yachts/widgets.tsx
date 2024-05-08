"use client";

import { Medium } from "@/components/widgetsProviders";
import dynamic from "next/dynamic";
import { useState } from "react";
import { useYacht } from "@/context/yacht";

const Gallery = dynamic(() => import("@/components/yachts/gallery"));

export const Photos = () => {
  const [manage, setManage] = useState(false),
    { _id, photos } = useYacht();

  return manage ? (
    <Gallery />
  ) : (
    <Medium
      name={"Modifier la gallerie"}
      onClick={() => setManage(true)}
      className={"flex justify-center items-center overflow-clip gap-[1vw]"}
    >
      <div
        style={{
          backgroundImage: `url(http://51.75.16.185/images/yachts/sales/${_id}/${photos.gallery[0]})`,
        }}
        className={"w-1/2 h-full bg-cover bg-center rounded-3xl"}
      />
      <div
        className={
          "w-1/2 h-full flex flex-col justify-center items-center gap-[1vw]"
        }
      >
        <div
          style={{
            backgroundImage: `url(http://51.75.16.185/images/yachts/sales/${_id}/${photos.gallery[1]})`,
          }}
          className={"h-1/2 w-full bg-cover bg-center rounded-3xl"}
        />
        <div
          style={{
            backgroundImage: `url(http://51.75.16.185/images/yachts/sales/${_id}/${photos.gallery[2]})`,
          }}
          className={"h-1/2 w-full bg-cover bg-center rounded-3xl"}
        />
      </div>
    </Medium>
  );
};
