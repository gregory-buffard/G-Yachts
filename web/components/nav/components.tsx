"use client";

import Burger from "@/components/nav/burger";
import Logo from "@/public/logo/logo";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { useInteraction } from "@/contexts/interact";

const Components = ({ dynamicColor }: { dynamicColor: number }) => {
  const t = useTranslations("bar"),
    { UI, openUI } = useInteraction(),
    [isScrolled, setScrolled] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      const position = window.scrollY;
      const threshold = dynamicColor;
      if (position > threshold) setScrolled(true);
      else if (position <= threshold) setScrolled(false);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [isScrolled]);

  return (
    <>
      <div
        className={`fixed w-full h-[16vh] top-0 z-10 bg-gradient-to-b from-white from-10% transition-opacity duration-200 ease-in-out ${isScrolled ? "opacity-100" : "opacity-0"}`}
      />
      <section
        className={`fixed top-0 flex justify-between items-center lg:py-[4vh] py-[2vh] containerize z-10`}
      >
        <Burger opened={UI} setOpened={openUI} dark={isScrolled} />
        <Logo
          className={`lg:h-[2.5vw] h-[4vh] lg:z-20 z-0 transition-[fill] duration-200 ease-in-out ${isScrolled ? "fill-black" : "fill-white"}`}
        />
        <div className={"flex justify-center items-center"}>
          <button
            type={"button"}
            onClick={() => openUI("contact")}
            className={`glass-button ${isScrolled ? "glass-button-dark" : "glass-button-light"}`}
          >
            <span className={"lg:hidden block uppercase"}>Contact</span>
            <span className={"hidden lg:block"}>{t("CTA")}</span>
          </button>
        </div>
      </section>
    </>
  );
};

export default Components;
