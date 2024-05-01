"use client";

import { IDestination } from "@/types/destination";
import { useTranslations } from "next-intl";
import { Link } from "@/navigation";
import { useEffect, useState } from "react";
import { ObjectId } from "mongoose";

interface IFeatured extends Pick<IDestination, "country" | "region"> {
  _id: ObjectId;
}

const Card = ({ card }: { card: IFeatured }) => {
  return (
    <Link
      href={"/charters"}
      className={
        "w-max flex flex-col justify-center items-start font-classic font-normal tracking-wider group transition-transform lg:duration-[var(--animate-destination)] ease-in-out lg:translate-x-[var(--translate-destination)]"
      }
    >
      <div
        className={
          "transition-[background-color] bg-cover bg-center duration-200 ease-in-out md:w-[20vw] md:h-[55vh] w-[35vw] h-[25vh] flex justify-start items-start mb-[1vh]"
        }
        style={{
          backgroundImage: `url(http://51.75.16.185/images/destinations/${card._id}/featured.webp)`,
        }}
      >
        <div className={"flex flex-col md:px-6 md:py-4 px-1 text-white"}>
          <h3 className={"md:text-2xl text-lg font-slick"}>{card.country}</h3>
          <h3 className={"md:text-base text-sm font-classic"}>{card.region}</h3>
        </div>
      </div>
    </Link>
  );
};

const CarouselButton = ({
  direction,
  onClick,
}: {
  direction: string;
  onClick: () => void;
}) => {
  return (
    <button
      type={"button"}
      onClick={onClick}
      className={
        "p-[0.25vw] rounded-full border-[0.25vh] hover:bg-teal hover:border-teal [transition:_background-color_200ms_ease-in-out,_border-color_200ms_ease-in-out]"
      }
    >
      {direction === "next" ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          viewBox="0 0 64 64"
          className={"size-[1.5vw]"}
        >
          <path d="M 37.546875 15.041016 C 37.034875 15.032766 36.520047 15.219516 36.123047 15.603516 C 35.330047 16.371516 35.309125 17.638641 36.078125 18.431641 L 47.279297 30 L 12 30 C 10.896 30 10 30.896 10 32 C 10 33.104 10.896 34 12 34 L 47.279297 34 L 36.078125 45.568359 C 35.310125 46.361359 35.330047 47.627484 36.123047 48.396484 C 36.512047 48.772484 37.014625 48.960938 37.515625 48.960938 C 38.037625 48.960938 38.560172 48.757562 38.951172 48.351562 L 53.435547 33.390625 C 54.186547 32.615625 54.186547 31.384375 53.435547 30.609375 L 38.951172 15.648438 C 38.568172 15.251437 38.058875 15.049266 37.546875 15.041016 z"></path>
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          viewBox="0 0 64 64"
          className={"size-[1.5vw]"}
        >
          <path d="M 26.451172 15.041016 C 25.939297 15.049266 25.432328 15.251437 25.048828 15.648438 L 10.5625 30.609375 C 9.8115 31.384375 9.8115 32.615625 10.5625 33.390625 L 25.048828 48.351562 C 25.440828 48.756562 25.962375 48.960938 26.484375 48.960938 C 26.985375 48.960938 27.487953 48.772484 27.876953 48.396484 C 28.669953 47.628484 28.690875 46.361359 27.921875 45.568359 L 16.720703 34 L 52 34 C 53.104 34 54 33.104 54 32 C 54 30.896 53.104 30 52 30 L 16.720703 30 L 27.921875 18.431641 C 28.689875 17.638641 28.669953 16.372516 27.876953 15.603516 C 27.479953 15.219516 26.963047 15.032766 26.451172 15.041016 z"></path>
        </svg>
      )}
    </button>
  );
};

const Section = ({ carouselData }: { carouselData: IFeatured[] }) => {
  const t = useTranslations("index.destinations"),
    carouselExtended = [...carouselData, ...carouselData, ...carouselData],
    defaultTranslate = carouselData.length * -21.5,
    setTranslate = (amount: number) => {
      document.documentElement.style.setProperty(
        "--translate-destination",
        `${amount}vw`,
      );
    },
    getTranslation = () =>
      parseInt(
        document.documentElement.style.getPropertyValue(
          "--translate-destination",
        ),
      ),
    setAnimate = (duration: number) =>
      document.documentElement.style.setProperty(
        "--animate-destination",
        `${duration}ms`,
      ),
    [paused, pause] = useState<boolean>(false);

  useEffect(() => {
    setTranslate(defaultTranslate);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!paused) translate("next");
    }, 5000);

    return () => clearInterval(interval);
  }, [paused]);

  const translate = (direction: string) => {
    const delta = direction === "next" ? -21.5 : 21.5; // width of one item
    const itemsCount = carouselData.length; // get the number of items from the database
    const defaultTranslate = itemsCount * -21.5; // width of one set of items

    setAnimate(500);
    setTranslate(getTranslation() + delta);
    if (getTranslation() <= defaultTranslate) {
      // width of one set of items
      setTimeout(() => {
        setAnimate(0);
        setTranslate(0);
      }, 500);
    } else if (getTranslation() >= 0) {
      setTimeout(() => {
        setAnimate(0);
        setTranslate(defaultTranslate); // reset to the start of the second set of items
      }, 500);
    }
  };

  // @ts-ignore
  // @ts-ignore
  return (
    <section className="w-full flex flex-col justify-center py-[4vh]">
      <div className="containerize flex justify-between items-center">
        <h1 className="font-slick font-light pb-5">
          {t.rich("title", {
            classic: (chunks) => (
              <span className="font-classic uppercase font-medium">
                {chunks}
              </span>
            ),
          })}
        </h1>
        <div className="flex justify-center items-center gap-[2vw]">
          <div className="hidden lg:flex justify-center items-center gap-[0.5vw]">
            <CarouselButton
              direction="previous"
              onClick={() => {
                translate("previous");
                pause(true);
                setTimeout(() => pause(false), 5000);
              }}
            />
            <CarouselButton
              direction="next"
              onClick={() => {
                translate("next");
                pause(true);
                setTimeout(() => pause(false), 5000);
              }}
            />
          </div>
        </div>
      </div>
      <div className="flex md:flex-row flex-col w-full justify-center">
        <div className="md:w-2/6 w-full flex flex-col items-start justify-center">
          <p className={"md:text-2xl text-lg flex flex-col ml-40"}>
            {t.rich("description", { br: () => <br /> })}
          </p>
          <Link
            href={"/charters"}
            type={"button"}
            className="glass-button glass-button-dark ml-40 mt-10 whitespace-nowrap"
          >
            {t("CTA")}
          </Link>
        </div>
        <div className={"md:w-4/6"}>
          <div
            className={
              "lg:hidden h-max w-full flex justify-start  lg:overflow-x-hidden overflow-x-scroll px-[4vw] py-[2vh] gap-[1.5vw]"
            }
          >
            {carouselData.map((card, i) => (
              <Card key={i} card={card} />
            ))}
          </div>
          <div
            className={
              "hidden h-max w-full lg:flex justify-start  lg:overflow-x-hidden overflow-x-scroll px-[4vw] py-[2vh] gap-[1.5vw]"
            }
          >
            {carouselExtended.map((card, i) => (
              <Card key={i} card={card} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Section;
