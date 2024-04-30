"use client";

import Logo from "@/public/logo/logo";
import SocialLinks from "@/components/nav/social";
import { Link } from "@/navigation";
import { useTranslations } from "next-intl";
import { useView } from "@/app/store";

const Footer = () => {
  const t = useTranslations(),
    { openView } = useView();

  return (
    <footer
      className={
        "w-full h-max flex flex-col justify-center items-center containerize lg:py-[6vh] py-[8vw] gap-[2vh]"
      }
    >
      <div className={"w-full flex justify-between items-center"}>
        <Logo className={"lg:h-[2.5vw] h-[4vh]"} />
        <div className={"w-max"}>
          <SocialLinks address={false} />
        </div>
      </div>
      <div className={"w-full h-[0.25vh] bg-rock-200"} />
      <div
        className={"w-full flex justify-between items-center text-xs uppercase"}
      >
        <div
          className={"flex justify-start items-baseline flex-wrap gap-[2vw]"}
        >
          <Link href={"/sales"}>{t("navigation.links.sales")}</Link>
          <Link href={"/charters"}>{t("navigation.links.charters")}</Link>
          <Link href={"/management"}>{t("navigation.links.management")}</Link>
          <Link href={"/company"}>{t("navigation.links.company")}</Link>
          <button
            type={"button"}
            onClick={() => openView("contact")}
            className={"uppercase"}
          >
            {t("navigation.links.contact")}
          </button>
        </div>
        <div className={"flex justify-end items-baseline flex-wrap gap-[2vw]"}>
          <Link href={"/"}>{t("footer.terms")}</Link>
          <Link href={"/"}>{t("footer.privacy")}</Link>
          <Link href={"/"}>{t("footer.credits")}</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
