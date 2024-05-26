"use client";

import { useCharter } from "@/context/charter";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { convertUnit } from "@/utils/yachts";
import { useViewContext } from "@/context/view";
import Gallery from "@/components/charter/gallery";
import { useState } from "react";

const SwitchView = ({
  props,
}: {
  props: { view: "info" | "features"; label: string };
}) => {
  const { changeView, view } = useCharter();

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
  const { charter, changeView, view } = useCharter(),
    { units } = useViewContext(),
    params = useParams(),
    [photo, setPhoto] = useState<
      (typeof charter.photos.gallery)[number] | null
    >(null),
    t = useTranslations("charter.details");

  const characteristics = [
    {
      label: t("characteristics.type.label"),
      value:
        charter.category === "motor"
          ? t("characteristics.type.motor")
          : t("characteristics.type.sail"),
    },
    {
      label: t("characteristics.length"),
      value: convertUnit(charter.length, units.length),
    },
    {
      label: t("characteristics.beam"),
      value: convertUnit(charter.beam, units.length),
    },
    {
      label: t("characteristics.draft"),
      value: (charter.maxDraft + charter.minDraft) / 2,
    },
    {
      label: t("characteristics.tonnage"),
      value: convertUnit(charter.tonnage, units.weight),
    },
    { label: t("characteristics.hull"), value: charter.material },
    { label: t("characteristics.sleeps"), value: charter.sleeps },
    { label: t("characteristics.rooms"), value: charter.rooms },
    { label: t("characteristics.yearBuilt"), value: charter.yearBuilt },
    { label: t("characteristics.yearModel"), value: charter.yearModel },
    {
      label: t("characteristics.location"),
      value: `${charter.city}, ${charter.country}`,
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
        {charter.photos.gallery.slice(0, 5).map((photo, i) => (
          <button
            type={"button"}
            onClick={() => {
              setPhoto(photo);
              changeView("gallery");
            }}
            key={i}
            className={`${i === 0 ? "w-full md:h-[28vw]" : "w-[45.5vw] md:w-[20.35vw] md:h-[14vw]"} bg-cover bg-center h-[28vh] active:scale-95 transition-transform duration-300 ease-in-out flex justify-end items-end py-[1vh] md:py-[2vh] px-[2vw]`}
            style={{
              backgroundImage: `url(${process.env.NEXT_PUBLIC_API}/images/charters/${params.id}/${photo})`,
            }}
          >
            {i === charter.photos.gallery.slice(0, 5).length - 1 ? (
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
          href={`mailto:${charter.brokerEmail}`}
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
