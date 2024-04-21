"use client";

import Burger from "@/components/nav/burger";
import logo from "@/public/logo/white.png";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useState } from "react";

const Bar = () => {
  const t = useTranslations("bar"),
    [opened, setOpened] = useState<"navigation" | "contact" | undefined>(
      undefined,
    );
  return (
    <section
      className={
        "fixed w-full flex justify-between items-center py-[4vh] sm:py-[2vh] containerize"
      }
    >
      <Burger opened={opened} setOpened={setOpened} />
      <Image
        src={logo}
        alt={"G–Yachts logo"}
        className={"w-[8vw] sm:w-[24vw] z-50 sm:z-30"}
      />
      <div className={"flex justify-center items-center"}>
        <button
          type={"button"}
          onClick={() => setOpened("contact")}
          className={"glass-button"}
        >
          <span className={"hidden sm:block uppercase"}>Contact</span>
          <span className={"sm:hidden"}>{t("CTA")}</span>
        </button>
      </div>
    </section>
  );
};

export default Bar;
