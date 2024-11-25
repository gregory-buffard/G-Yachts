"use client";

import { useYacht } from "@/context/yacht";
import { useTranslations } from "next-intl";
import { convertUnit } from "@/utils/yachts";
import { useViewContext } from "@/context/view";
import { useState } from "react";
import dynamic from "next/dynamic";
import Brokerino from "@/components/yachts/yacht/brokerino";
import { brochurize } from "@/actions/yachts";
import { useLocale } from "next-intl";
import { saveAs } from "file-saver";
import { AnimatePresence, motion } from "framer-motion";
import Lottie from "lottie-react";
import brochure from "@/public/pictures/yacht/brochure.json";
import complete from "@/public/pictures/yacht/brochure complete.json";

const Gallery = dynamic(() => import("@/components/yachts/yacht/gallery"));
const Reservations = dynamic(
  () => import("@/components/yachts/yacht/reservations"),
);

const SwitchView = ({
  props,
}: {
  props: { view: "info" | "features"; label: string };
}) => {
  const { changeView, view, type } = useYacht();

  return (
    <button
      type={"button"}
      onClick={(e) => {
        e.preventDefault();
        changeView(props.view);
      }}
      className={`uppercase py-[0.5vh] border-b-[0.25vh] ${view === props.view ? "border-black text-black" : "border-transparent text-rock-300"} transition-colors duration-200 ease-in-out`}
    >
      <p>{props.label}</p>
    </button>
  );
};

const Details = () => {
  const { data, type, changeView, view } = useYacht(),
    { currency, units } = useViewContext(),
    [photo, setPhoto] = useState<number | null>(null),
    [disabled, disable] = useState<boolean>(false),
    [expanded, expand] = useState<boolean>(
      data.description ? data.description.length <= 1229 : false,
    ),
    t = useTranslations("yacht.details"),
    locale = useLocale() as "en" | "fr",
    [generating, generate] = useState<{ popup: boolean; state: boolean }>({
      popup: false,
      state: false,
    });

  const characteristics = [
    {
      label: t("characteristics.type.label"),
      value:
        data.category === "motor"
          ? t("characteristics.type.motor")
          : t("characteristics.type.sail"),
      key: "category",
    },
    {
      label: t("characteristics.builder"),
      value: data.builder,
      key: "builder",
    },
    {
      label: t("characteristics.length"),
      value: convertUnit(data.length, units.length),
      key: "length",
    },
    {
      label: t("characteristics.beam"),
      value: convertUnit(data.beam, units.length),
      key: "beam",
    },
    {
      label: data.minDraft
        ? t("characteristics.draft")
        : t("characteristics.maxDraft"),
      value: data.minDraft
        ? (data.maxDraft + data.minDraft) / 2
        : data.maxDraft,
      key: "draft",
    },
    {
      label: t("characteristics.tonnage"),
      value: data.tonnage,
      key: "tonnage",
    },
    {
      label: t("characteristics.hull"),
      value: data.material,
      key: "material",
    },
    { label: t("characteristics.sleeps"), value: data.sleeps, key: "sleeps" },
    data.cruisingGuests && {
      label: t("characteristics.cruisingGuests"),
      value: data.cruisingGuests,
      key: "cruisingGuests",
    },
    { label: t("characteristics.rooms"), value: data.rooms, key: "rooms" },
    {
      label: t("characteristics.yearBuilt"),
      value: data.yearBuilt,
      key: "yearBuilt",
    },
    type !== "new-construction" &&
      data.yearRefit && {
        label: t("characteristics.yearRefit"),
        value: data.yearRefit,
        key: "yearRefit",
      },
    {
      label: t("characteristics.location"),
      value: `${data.region}`,
      key: "location",
    },
    /*{
          label: t("characteristics.crypto.label"),
          value: data.crypto
            ? t("characteristics.crypto.true")
            : t("characteristics.crypto.false"),
          key: "crypto",
        },*/
  ];

  return (
    <section
      className={
        "w-full px-[4vw] md:px-[8vw] py-[4vh] flex flex-col-reverse gap-[4vh] md:gap-0 md:flex-row justify-between items-center md:items-start"
      }
    >
      <AnimatePresence mode={"wait"}>
        {generating.popup && (
          <motion.div
            key={"brochure"}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className={
              "fixed w-[96vw] md:w-[56vw] lg:w-[24vw] bottom-[2vw] right-[2vw] drop-shadow-2xl p-[2vh] bg-rock-100 flex flex-col justify-center items-start gap-[2vh] z-10"
            }
          >
            <div
              className={"w-full flex justify-start items-center gap-[0.25vw]"}
            >
              {generating.state ? (
                <>
                  <Lottie
                    loop={true}
                    animationData={brochure}
                    className={"h-[1.5rem] mb-[0.5rem]"}
                  />
                  <p className={"text-base"}>{t("generating")}</p>
                </>
              ) : (
                <>
                  <Lottie
                    loop={false}
                    animationData={complete}
                    className={"h-[1.25rem] mb-[0.25rem]"}
                  />
                  <p className={"text-base"}>{t("generated")}</p>
                </>
              )}
            </div>
            {generating.state ? (
              <p className={"text-rock-300"}>
                &#x2248;{" "}
                {((17.54 + 3.42 * data.photos.gallery.length) / 60).toFixed(0)}
                <label className={"text-rock-300"}>min</label>
              </p>
            ) : (
              <button
                type={"button"}
                onClick={() => generate((prev) => ({ ...prev, popup: false }))}
                className={`glass-button glass-button-dark`}
              >
                {t("dismiss")}
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
      <div
        className={
          "flex flex-wrap gap-[1vw] md:gap-[0.25vw] justify-center items-center md:w-[38vw] w-full h-max"
        }
      >
        {data.photos.gallery.slice(0, 5).map((photo, i) => (
          <button
            type={"button"}
            onClick={() => {
              changeView("gallery");
              if (!disabled) setPhoto(i);
              else setPhoto(0);
            }}
            key={i}
            className={`${i === 0 ? "w-full md:h-[28vw]" : "w-[45.5vw] md:w-[18.85vw] md:h-[14vw]"} bg-cover bg-center h-[28vh] ${!disabled && "active:scale-95"} transition-transform duration-300 ease-in-out flex justify-end items-end py-[1vh] md:py-[2vh] px-[2vw]`}
            style={{
              backgroundImage: `url(${encodeURI(photo.image.sizes.fhd.url)})`,
            }}
          >
            {i === data.photos.gallery.slice(0, 5).length - 1 && (
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
          {(data.keyFeatures && data.keyFeatures.length > 0) ||
          (data.customKeyFeatures && data.customKeyFeatures.length > 0) ? (
            <SwitchView props={{ view: "features", label: t("features") }} />
          ) : (
            <></>
          )}
          <button
            type={"button"}
            onClick={async () => {
              generate({ popup: true, state: true });
              brochurize({
                type: type,
                photos: data.photos,
                locale: locale,
                id: data.id,
                currency: currency,
                units: units,
              })
                .then(async (res: string) => {
                  const pdfBytes = new Uint8Array(
                      atob(res)
                        .split("")
                        .map((char) => char.charCodeAt(0)),
                    ),
                    pdfBlob = new Blob([pdfBytes], { type: "application/pdf" }),
                    blobUrl = URL.createObjectURL(pdfBlob);
                  window.open(blobUrl, "_blank");
                })
                .catch((e) => console.error("Error generating PDF : ", e))
                .finally(() => generate((prev) => ({ ...prev, state: false })));
            }}
            disabled={generating.state}
            className={`uppercase py-[0.5vh] border-b-[0.25vh] hover:border-black disabled:hover:border-transparent disabled:hover:text-rock-300 disabled:hover:cursor-progress hover:text-black border-transparent text-rock-300 transition-colors duration-200 ease-in-out flex justify-start items-center`}
          >
            <p>{t("brochure")}</p>
          </button>
          {/*<a
            target={"_blank"}
            href={`/media/brochure-yachts-${data.id}.pdf`}
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
          </a>*/}
        </div>
        <div className={"w-full flex-col justify-center items-center"}>
          {view === "info"
            ? characteristics.map(
                (property, i) =>
                  property && (
                    <>
                      <div
                        key={i}
                        className={
                          "w-full flex flex-row justify-between items-baseline py-[0.5vh]"
                        }
                      >
                        <div className={"w-1/2 text-rock-300"}>
                          <p>{property.label}</p>
                        </div>
                        <div className={"w-1/2 text-black"}>
                          <p>{property.value}</p>
                        </div>
                      </div>
                      {i !== characteristics.length - 1 && (
                        <div className={"w-full h-[0.25vh] bg-rock-200"} />
                      )}
                    </>
                  ),
              )
            : view === "features" && (
                <div
                  className={"w-full grid grid-cols-2 md:grid-cols-3 gap-[2vh]"}
                >
                  {characteristics
                    .filter(
                      (property) =>
                        property &&
                        data.keyFeatures &&
                        data.keyFeatures.includes(property.key),
                    )
                    .map(
                      (property, i) =>
                        property && (
                          <div
                            key={i}
                            className={
                              "flex flex-col justify-center items-start"
                            }
                          >
                            <h3>{property.value}</h3>
                            <p className={"text-rock-300"}>{property.label}</p>
                          </div>
                        ),
                    )}
                  {data.customKeyFeatures &&
                    data.customKeyFeatures.map((customFeature, i) => (
                      <h3 key={i}>{customFeature}</h3>
                    ))}
                </div>
              )}
          <Gallery current={photo} setCurrent={setPhoto} />
        </div>
        {data.description && (
          <div
            className={
              "w-full flex flex-col justify-center items-start gap-[2vh]"
            }
          >
            <article
              className={`relative w-full overflow-y-clip ${expanded ? "h-max" : "h-[17vh]"} transition-[height] duration-500 ease-in-out`}
            >
              <p className={"text-justify"}>{data.description}</p>
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
        )}
        {data.broker && (
          <div
            className={
              "w-full flex flex-col justify-center items-center gap-[2vh] border-rock-400 border-[0.25vh] p-[2vh]"
            }
          >
            <Brokerino brokerino={data.broker} />
            <a
              href={`mailto:${data.broker.email}?subject=${encodeURIComponent(data.name)}`}
              className={
                "py-[1vh] w-full text-white bg-black hover:bg-teal active:bg-teal transition-colors duration-200 ease-in-out uppercase text-center"
              }
            >
              {t("CTA")}
            </a>
          </div>
        )}
        {type === "charter" && <Reservations data={data.reservations} />}
      </div>
    </section>
  );
};

export default Details;
