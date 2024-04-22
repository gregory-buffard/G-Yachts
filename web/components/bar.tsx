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
        "fixed flex justify-between items-center lg:py-[4vh] py-[2vh] containerize z-10"
      }
    >
      <Burger opened={opened} setOpened={setOpened} />
      <Image
        src={logo}
        alt={"G–Yachts logo"}
        className={"lg:w-[8vw] w-[24vw] lg:z-20 z-0"}
      />
      <div className={"flex justify-center items-center"}>
        <button
          type={"button"}
          onClick={() => setOpened("contact")}
          className={"glass-button"}
        >
          <span className={"lg:hidden block uppercase"}>Contact</span>
          <span className={"hidden lg:block"}>{t("CTA")}</span>
        </button>
      </div>
    </section>
  );
};

export default Bar;
