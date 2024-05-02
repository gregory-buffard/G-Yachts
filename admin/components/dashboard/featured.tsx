"use client";

import { IYacht } from "@/types/yacht";
import { ObjectId } from "mongoose";
import { Medium } from "@/components/widgetsProviders";
import { useEffect } from "react";
import { useView } from "@/app/view";

interface IFeatured
  extends Pick<
    IYacht,
    "price" | "name" | "builder" | "length" | "yearBuilt" | "sleeps"
  > {
  _id: ObjectId;
}

const FeaturedContent = ({ data }: { data: IFeatured[] }) => {
  const carouselData = [...data, ...data],
    { openView } = useView(),
    setTranslate = (amount: number) => {
      document.documentElement.style.setProperty(
        "--translate-featured",
        `${amount}%`,
      );
    },
    setScale = (amount: number) => {
      document.documentElement.style.setProperty(
        "--scale-featured",
        `${amount}`,
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
      );

  useEffect(() => {
    setTranslate(0);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimate(500);
      setScale(0.9);
      setTimeout(() => translate(), 500);
      setTimeout(() => {
        setScale(1);
      }, 1000);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const translate = () => {
    setTranslate(getTranslation() - 100);
    if (getTranslation() === data.length * -100) {
      setTimeout(() => {
        setAnimate(0);
        setTranslate(0);
      }, 1000);
    }
  };

  return (
    <Medium
      onClick={() => openView("yachts")}
      name={"En vedette"}
      className={"overflow-hidden shadow-inner bg-neutral-200 group"}
    >
      {carouselData.map((yacht, i) => (
        <div
          key={i}
          className={
            "w-full h-[44vw] lg:h-[16vw] bg-cover bg-center translate-y-[var(--translate-featured)] rounded-3xl scale-[var(--scale-featured)] transition-transform duration-[var(--animate-featured)] ease-in-out flex justify-start items-start py-[2vw] lg:py-[1vw] px-[2vw] lg:px-[1vw]"
          }
          style={{
            backgroundImage: `url(http://51.75.16.185/images/yachts/${yacht._id}/featured.webp)`,
          }}
        >
          <div className={"flex justify-center items-center"}>
            <p
              className={
                "bg-neutral-100/10 border-neutral-100/25 border-[0.05vw] backdrop-blur-sm py-[0.5rem] px-[1rem] rounded-2xl text-neutral-100 font-semibold"
              }
            >
              {yacht.name}
            </p>
          </div>
        </div>
      ))}
    </Medium>
  );
};

export default FeaturedContent;
