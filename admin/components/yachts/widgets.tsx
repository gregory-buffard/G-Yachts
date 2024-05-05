"use client";

import { Medium } from "@/components/widgetsProviders";
import dynamic from "next/dynamic";
import { useState } from "react";
import { useParams } from "next/navigation";

const Gallery = dynamic(() => import("@/components/yachts/gallery"));

export const Photos = ({
  gallery,
  featured,
}: {
  gallery: string[] | any;
  featured: boolean;
}) => {
  const [manage, setManage] = useState(false),
    { id } = useParams();

  return manage ? (
    <Gallery data={{ photos: gallery, featured: featured }} />
  ) : (
    <Medium
      name={"Modifier la gallerie"}
      onClick={() => setManage(true)}
      className={"flex justify-center items-center overflow-clip gap-[1vw]"}
    >
      <div
        style={{
          backgroundImage: `url(http://51.75.16.185/images/yachts/sales/${id}/gallery/${gallery[0]})`,
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
            backgroundImage: `url(http://51.75.16.185/images/yachts/sales/${id}/gallery/${gallery[1]})`,
          }}
          className={"h-1/2 w-full bg-cover bg-center rounded-3xl"}
        />
        <div
          style={{
            backgroundImage: `url(http://51.75.16.185/images/yachts/sales/${id}/gallery/${gallery[2]})`,
          }}
          className={"h-1/2 w-full bg-cover bg-center rounded-3xl"}
        />
      </div>
    </Medium>
  );
};
