"use client";

import { useYacht } from "@/context/yacht";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { convertUnit } from "@/utils/yachts";
import { useViewContext } from "@/context/view";
import Gallery from "@/components/yacht/gallery";
import { useState } from "react";

const SwitchView = ({
  props,
}: {
  props: { view: "info" | "features"; label: string };
}) => {
  const { changeView, view } = useYacht();

  return (
    <button
      type={"button"}
      onClick={(e) => {
        e.preventDefault();
        changeView(props.view);
      }}
      className={`uppercase py-[0.5vh] border-b-[0.25vh] ${view === props.view ? "border-black text-black" : "border-transparent text-rock-300"}`}
    >
      <p>{props.label}</p>
    </button>
  );
};

const Details = () => {
  const { yacht, changeView, view } = useYacht(),
    { units } = useViewContext(),
    params = useParams(),
    [photo, setPhoto] = useState<(typeof yacht.photos.gallery)[number] | null>(
      null,
    ),
    t = useTranslations("yacht.details");

  const characteristics = [
    {
      label: t("characteristics.type.label"),
      value:
        yacht.category === "motor"
          ? t("characteristics.type.motor")
          : t("characteristics.type.sail"),
    },
    {
      label: t("characteristics.length"),
      value: convertUnit(yacht.length, units.length),
    },
    {
      label: t("characteristics.beam"),
      value: convertUnit(yacht.beam, units.length),
    },
    {
      label: t("characteristics.draft"),
      value: (yacht.maxDraft + yacht.minDraft) / 2,
    },
    {
      label: t("characteristics.tonnage"),
      value: convertUnit(yacht.tonnage, units.weight),
    },
    { label: t("characteristics.hull"), value: yacht.material },
    { label: t("characteristics.sleeps"), value: yacht.sleeps },
    { label: t("characteristics.rooms"), value: yacht.rooms },
    { label: t("characteristics.yearBuilt"), value: yacht.yearBuilt },
    { label: t("characteristics.yearModel"), value: yacht.yearModel },
    {
      label: t("characteristics.location"),
      value: `${yacht.city}, ${yacht.country}`,
    },
  ];

  return (
    <section
      className={
        "w-full px-[4vw] md:px-[8vw] py-[4vh] flex flex-col-reverse gap-[4vh] md:gap-0 md:flex-row justify-between items-center md:items-start"
      }
    >
      <div
        className={
          "flex flex-wrap gap-[1vw] md:gap-[0.25vw] justify-center items-center md:w-[41vw] w-full h-max"
        }
      >
        {yacht.photos.gallery.slice(0, 5).map((photo, i) => (
          <button
            type={"button"}
            onClick={() => {
              setPhoto(photo);
              changeView("gallery");
            }}
            key={i}
            className={`${i === 0 ? "w-full md:h-[28vw]" : "w-[45.5vw] md:w-[20.35vw] md:h-[14vw]"} bg-cover bg-center h-[28vh] active:scale-95 transition-transform duration-300 ease-in-out flex justify-end items-end py-[1vh] md:py-[2vh] px-[2vw]`}
            style={{
              backgroundImage: `url(${process.env.NEXT_PUBLIC_API}/images/yachts/${params.id}/${photo})`,
            }}
          >
            {i === yacht.photos.gallery.slice(0, 5).length - 1 ? (
              <button
                type={"button"}
                className={
                  "bg-white hover:bg-rock-200 active:bg-rock-200 transition-colors duration-200 ease-in-out px-[2vw] md:px-[1vw] py-[0.5vh] rounded-md drop-shadow-md"
                }
              >
                <label className={"cursor-pointer"}>{t("gallery")}</label>
              </button>
            ) : null}
          </button>
        ))}
      </div>
      <div
        className={
          "flex flex-col justify-center items-start md:w-[41vw] w-full h-max gap-[2vh]"
        }
      >
        <div
          className={
            "w-full flex justify-start items-center border-b-[0.25vh] border-rock-200 gap-[2vw]"
          }
        >
          <SwitchView props={{ view: "info", label: t("info") }} />
          <SwitchView props={{ view: "features", label: t("features") }} />
        </div>
        <div className={"w-full flex-col justify-center items-center"}>
          {view === "info" || view === "features" ? (
            characteristics.map((property, i) => (
              <>
                <div
                  key={i}
                  className={
                    "w-full flex flex-row justify-between items-center py-[0.5vh]"
                  }
                >
                  <div className={"w-1/2 text-rock-300"}>{property.label}</div>
                  <div className={"w-1/2 text-black"}>{property.value}</div>
                </div>
                {i !== characteristics.length - 1 ? (
                  <div className={"w-full h-[0.25vh] bg-rock-200"} />
                ) : null}
              </>
            ))
          ) : (
            <Gallery current={photo} />
          )}
        </div>
        <a
          href={`mailto:${yacht.brokerEmail}`}
          className={
            "py-[1vh] w-full text-white bg-black hover:bg-teal active:bg-teal transition-colors duration-200 ease-in-out uppercase text-center"
          }
        >
          {t("CTA")}
        </a>
      </div>
    </section>
  );
};

export default Details;
