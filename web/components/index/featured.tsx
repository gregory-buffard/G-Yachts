"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { ICard } from "@/types/featured";
import { fetchFeatured } from "@/services/yachts";

type CarouselProps = {
  items: { id: number; content: string }[];
};

const Card = ({ props }: { props: ICard }) => {
  const t = useTranslations("index.featured");

  return (
    <Link
      href={"#"}
      className={"w-max flex flex-col justify-center items-center"}
    >
      <div className={"bg-rock-500 w-full flex justify-start items-start"}>
        <p>{t("exclusive")}</p>
      </div>
      <div className={"flex justify-start items-baseline uppercase"}></div>
      <p></p>
    </Link>
  );
};

const Carousel: React.FC<CarouselProps> = ({ items }) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0),
    [cardsData, setCardsData] = useState<ICard[]>([]);

  useEffect(() => {
    fetchFeatured()
      .then((d) => {
        setCardsData(d);
      })
      .catch((e) => console.error(e));
  }, []);

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  return (
    <div>
      {cardsData.map((card, index) => (
        <p key={index}>{card.name}</p>
      ))}
    </div>
  );
};

const Featured = () => {
  return (
    <section className={"containerize"}>
      <Carousel
        items={[
          { id: 1, content: "test" },
          { id: 2, content: "test2" },
        ]}
      />
    </section>
  );
};

export default Featured;
