"use client";

import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { convertUnit } from "@/utils/yachts";
import { useViewContext } from "@/context/view";
import { useState } from "react";
import dynamic from "next/dynamic";
import { useCharter } from "@/context/charter";
import Brokerino from "@/components/yachts/yacht/brokerino";
import Reservations from "@/components/charter/reservations";

const Gallery = dynamic(() => import("@/components/charter/gallery/gallery"));

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
    [photo, setPhoto] = useState<number | null>(null),
    [disabled, disable] = useState<boolean>(false),
    [expanded, expand] = useState<boolean>(false),
    t = useTranslations("yachts.details");

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
      label: charter.minDraft
        ? t("characteristics.draft")
        : t("characteristics.maxDraft"),
      value: charter.minDraft
        ? (charter.maxDraft + charter.minDraft) / 2
        : charter.maxDraft,
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
          "flex flex-wrap gap-[1vw] md:gap-[0.25vw] justify-center items-center md:w-[38vw] w-full h-max"
        }
      >
        {charter.photos.gallery.slice(0, 5).map((photo, i) => (
          <button
            type={"button"}
            onClick={() => {
              changeView("gallery");
              if (!disabled) setPhoto(i);
            }}
            key={i}
            className={`${i === 0 ? "w-full md:h-[28vw]" : "w-[45.5vw] md:w-[18.85vw] md:h-[14vw]"} bg-cover bg-center h-[28vh] ${!disabled && "active:scale-95"} transition-transform duration-300 ease-in-out flex justify-end items-end py-[1vh] md:py-[2vh] px-[2vw]`}
            style={{
              backgroundImage: `url(${photo.image.sizes.fhd.url})`,
            }}
          >
            {i === charter.photos.gallery.slice(0, 5).length - 1 && (
              <button
                onMouseEnter={() => disable(true)}
                onMouseLeave={() => disable(false)}
                type={"button"}
                className={
                  "bg-white hover:bg-rock-200 active:bg-rock-200 active:scale-95 transition-[colors,_transform] duration-200 ease-in-out px-[2vw] md:px-[1vw] py-[0.5vh] rounded-md drop-shadow-md"
                }
              >
                <label className={"cursor-pointer"}>{t("gallery")}</label>
              </button>
            )}
          </button>
        ))}
      </div>
      <div
        className={
          "flex flex-col justify-center items-start md:w-[38vw] w-full h-max gap-[2vh]"
        }
      >
        <div
          className={
            "w-full flex justify-start items-center border-b-[0.25vh] border-rock-200 gap-[2vw]"
          }
        >
          <SwitchView props={{ view: "info", label: t("info") }} />
          <SwitchView props={{ view: "features", label: t("features") }} />
          <a
            target={"_blank"}
            href={`/media/brochure-charters-${charter.id}.pdf`}
            className={
              "uppercase py-[0.5vh] border-b-[0.25vh] hover:border-black border-transparent hover:text-black text-rock-300 hover:fill-black fill-rock-300 transition-colors duration-200 ease-in-out flex justify-center items-start"
            }
          >
            <p>{t("brochure")}</p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              viewBox="0 0 24 24"
              className={"size-[1.3rem] -rotate-45"}
            >
              <path d="M 14 4.9296875 L 12.5 6.4296875 L 17.070312 11 L 3 11 L 3 13 L 17.070312 13 L 12.5 17.570312 L 14 19.070312 L 21.070312 12 L 14 4.9296875 z"></path>
            </svg>
          </a>
        </div>
        <div className={"w-full flex-col justify-center items-center"}>
          {view === "features" ||
            (view === "info" &&
              characteristics.map((property, i) => (
                <>
                  <div
                    key={i}
                    className={
                      "w-full flex flex-row justify-between items-center py-[0.5vh]"
                    }
                  >
                    <div className={"w-1/2 text-rock-300"}>
                      {property.label}
                    </div>
                    <div className={"w-1/2 text-black"}>{property.value}</div>
                  </div>
                  {i !== characteristics.length - 1 ? (
                    <div className={"w-full h-[0.25vh] bg-rock-200"} />
                  ) : null}
                </>
              )))}
          <Gallery current={photo} setCurrent={setPhoto} />
        </div>
        <div
          className={
            "w-full flex flex-col justify-center items-start gap-[2vh]"
          }
        >
          <article
            className={`relative w-full overflow-y-clip ${expanded ? "h-max" : "h-[17vh]"} transition-[height] duration-500 ease-in-out`}
          >
            <p className={"text-justify"}>{charter.description}</p>
            {!expanded && (
              <div
                className={
                  "absolute w-full h-full bg-gradient-to-t from-white to-50% inset-0"
                }
              />
            )}
          </article>
          {!expanded && (
            <button type={"button"} onClick={() => expand(true)}>
              <p className={"uppercase text-rock-400"}>{t("description")}</p>
            </button>
          )}
        </div>
        {charter.broker && (
          <div
            className={
              "w-full flex flex-col justify-center items-center gap-[2vh] border-rock-400 border-[0.25vh] p-[2vh]"
            }
          >
            <Brokerino brokerino={charter.broker} />
            <a
              href={`mailto:${charter.broker.email}`}
              className={
                "py-[1vh] w-full text-white bg-black hover:bg-teal active:bg-teal transition-colors duration-200 ease-in-out uppercase text-center"
              }
            >
              {t("CTA")}
            </a>
          </div>
        )}
        <Reservations data={charter.reservations} />
      </div>
    </section>
  );
};

export default Details;
