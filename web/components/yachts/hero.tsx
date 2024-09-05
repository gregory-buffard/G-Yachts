"use client";

import { ISale, ICharter, INewConstruction } from "@/types/yacht";
import { useState, useEffect } from "react";
import { Link } from "@/navigation";
import { useTranslations } from "next-intl";
import { useViewContext } from "@/context/view";
import { convertUnit, formatCurrency } from "@/utils/yachts";

interface ISalesHero
  extends Pick<
    ISale,
    | "id"
    | "name"
    | "builder"
    | "length"
    | "yearBuilt"
    | "sleeps"
    | "photos"
    | "etiquette"
    | "price"
  > {}

interface IChartersHero
  extends Pick<
    ICharter,
    | "id"
    | "name"
    | "builder"
    | "length"
    | "yearBuilt"
    | "sleeps"
    | "photos"
    | "etiquette"
    | "price"
  > {}

interface INewConstructionsHero
  extends Pick<
    INewConstruction,
    | "id"
    | "name"
    | "builder"
    | "length"
    | "yearBuilt"
    | "sleeps"
    | "photos"
    | "etiquette"
    | "price"
  > {}

const Card = ({
  card,
  type,
}:
  | { card: ISalesHero; type: "sales" }
  | { card: IChartersHero; type: "charters" }
  | { card: INewConstructionsHero; type: "new-constructions" }) => {
  const t = useTranslations(`${type}.hero`),
    { currency, units, rates } = useViewContext(),
    price =
      type === "charters"
        ? `${formatCurrency(card.price.low * rates[currency], currency)} – ${formatCurrency(card.price.high * rates[currency], currency)}`
        : formatCurrency(card.price * rates[currency], currency);
  return (
    <Link
      href={{ pathname: `/${type}/[id]`, params: { id: card.id } }}
      key={`${card.id}`}
      className={
        "w-screen h-full bg-cover bg-center translate-x-[var(--translate-featured)] transition-transform duration-[var(--animate-featured)] ease-in-out"
      }
      style={{
        backgroundImage: `url(${encodeURI(card.photos.featured.sizes.fhd.url)})`,
      }}
    >
      <div
        className={
          "opacity-sheet w-full h-full flex flex-col justify-end items-end py-[4vh] lg:py-[12vh] px-[4vw]"
        }
      >
        <h4>{card.name}</h4>
        {price ? (
          <h4>{price}</h4>
        ) : (
          <div
            className={
              "h-[0.875rem] my-[0.1875rem] w-[16vw] bg-white rounded-full animate-pulse"
            }
          />
        )}
        <h4>
          {card.builder} | {convertUnit(card.length, units.length)} |{" "}
          {card.yearBuilt} | {card.sleeps + " " + t("guests")}
        </h4>
      </div>
    </Link>
  );
};

const Hero = ({
  data,
  type,
}:
  | { data: ISalesHero[]; type: "sales" }
  | { data: IChartersHero[]; type: "charters" }
  | { data: INewConstructionsHero[]; type: "new-constructions" }) => {
  const t = useTranslations(`${type}.hero`),
    carouselData = [...data, ...data],
    [selected, select] = useState<number>(0),
    setTranslate = (amount: number) => {
      document.documentElement.style.setProperty(
        "--translate-featured",
        `${amount}%`,
      );
    },
    getTranslation = () =>
      parseInt(
        document.documentElement.style.getPropertyValue("--translate-featured"),
      ),
    setAnimate = (duration: number) =>
      document.documentElement.style.setProperty(
        "--animate-featured",
        `${duration}ms`,
      ),
    [paused, pause] = useState<boolean>(false);

  useEffect(() => {
    setTranslate(0);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!paused) {
        translate("next");
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [paused]);

  const translate = (direction: string) => {
    const delta = direction === "next" ? -100 : 100;
    setAnimate(500);
    setTranslate(getTranslation() + delta);
    select(getTranslation());
    if (getTranslation() === data.length * -100) {
      select(0);
      setTimeout(() => {
        setAnimate(0);
        setTranslate(0);
      }, 500);
    }
  };

  return (
    <section className={"w-full h-[36vh] lg:h-screen overflow-x-hidden"}>
      <div className={"w-max h-full flex justify-start items-end text-white"}>
        {carouselData.map((yacht, i) => (
          // @ts-ignore
          <Card key={i} card={yacht} type={type} />
        ))}
        <div
          className={
            "absolute containerize flex lg:justify-between justify-end"
          }
        >
          <div
            className={
              "lg:flex flex-col justify-center items-start hidden py-[12vh] w-2/3"
            }
          >
            <h4>{t("subtitle")}</h4>
            <h1>
              {t.rich("title", {
                classic: (chunk) => <span className={"classic"}>{chunk}</span>,
              })}
            </h1>
          </div>
          <div
            className={
              "flex justify-end items-end lg:gap-[0.5vw] gap-[1vw] py-[3vh] lg:py-[10vh]"
            }
          >
            {data.map((yacht, i) => (
              <button
                key={i}
                onClick={() => {
                  select(i * -100);
                  setAnimate(500);
                  setTranslate(i * -100);
                  pause(true);
                  setTimeout(() => {
                    pause(false);
                  }, 5000);
                }}
                className={`w-[4vw] lg:w-[2vw] rounded-full h-[0.25vh] transition-[background-color] duration-500 ease-in-out`}
                style={{
                  backgroundColor:
                    Math.abs(selected) === i * 100
                      ? "white"
                      : "rgb(255 255 255 / 0.5)",
                }}
              ></button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
