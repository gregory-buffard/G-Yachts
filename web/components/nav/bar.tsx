"use client";

import View from "@/components/nav/view";
import Logo from "@/public/logo/logo";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { useView } from "@/app/store";

const Bar = ({ dynamicColor }: { dynamicColor: number }) => {
  const t = useTranslations("bar"),
    { openView } = useView(),
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
        className={`fixed w-full h-[16vh] top-0 z-0 bg-gradient-to-b from-white from-10% transition-opacity duration-200 ease-in-out ${isScrolled ? "opacity-100" : "opacity-0"}`}
      />
      <Logo
        className={`fixed top-0 lg:h-[2.5vw] h-[4vh] lg:z-20 lg:my-[4vh] my-[2vh] z-10 transition-[fill] duration-200 ease-in-out ${isScrolled ? "fill-black" : "fill-white"}`}
      />
      <section
        className={`fixed top-0 flex justify-between items-center lg:py-[4vh] py-[2vh] containerize z-10`}
      >
        <button
          onClick={() => openView("navigation")}
          className={`center flex-col lg:w-[2vw] w-[4vw] gap-[0.5vh] lg:hover:gap-[0.75vh] lg:transition-[gap] duration-200 ease-in-out ${isScrolled ? "fill-black" : "fill-white"}`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 128 8"
            className={"burger-bar"}
          >
            <rect width="128" height="8" rx="4" />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 128 8"
            className={"burger-bar"}
          >
            <rect width="128" height="8" rx="4" />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 128 8"
            className={"burger-bar"}
          >
            <rect width="128" height="8" rx="4" />
          </svg>
        </button>
        <div className={"flex justify-center items-center"}>
          <button
            type={"button"}
            onClick={() => openView("contact")}
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

export default Bar;
