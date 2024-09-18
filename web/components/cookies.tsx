"use client";

import { useViewContext } from "@/context/view";
import { useTranslations } from "next-intl";
import CookiesLib from "js-cookie";
import { motion } from "framer-motion";

const Cookies = () => {
  const { cookiesAgreed, setCookiesAgreement } = useViewContext(),
    t = useTranslations("cookies");

  return (
    <motion.section
      exit={{ translateX: "-100%" }}
      transition={{ duration: 0.4, ease: "easeIn" }}
      className={
        "fixed w-[96vw] md:w-[56vw] lg:w-[24vw] bottom-[2vw] left-[2vw] drop-shadow-2xl p-[2vh] bg-rock-100 flex flex-col justify-center items-start gap-[2vh] z-10"
      }
    >
      <p className={"text-base"}>{t("description")}</p>
      <button
        className={"glass-button glass-button-dark"}
        onClick={() => {
          CookiesLib.set("cookiesAgreed", "true");
          setCookiesAgreement(true);
        }}
      >
        {t("button")}
      </button>
    </motion.section>
  );
};

export default Cookies;
