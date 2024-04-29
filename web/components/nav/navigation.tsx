import { useState, useTransition } from "react";
import { useTranslations } from "next-intl";
import { usePathname, useRouter, Link, pathnames } from "@/navigation";
import Logo from "@/public/logo/logo";
import { motion } from "framer-motion";
import SocialLinks from "@/components/nav/social";
import { useInteraction } from "@/contexts/interact";
import Whisper from "@/components/whisper";
import { handleMouseMove } from "@/utils/mouseCoords";

export const Close = () => {
  const { openUI } = useInteraction();

  return (
    <button type={"button"} onClick={() => openUI(null)}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        x="0px"
        y="0px"
        viewBox="0 0 64 64"
        className={
          "lg:size-[1.5vw] size-[3vh] hover:rotate-90 transition-transform duration-200 ease-in-out"
        }
      >
        <path d="M 16 14 C 15.488 14 14.976938 14.194937 14.585938 14.585938 C 13.804937 15.366937 13.804937 16.633063 14.585938 17.414062 L 29.171875 32 L 14.585938 46.585938 C 13.804938 47.366938 13.804937 48.633063 14.585938 49.414062 C 14.976937 49.805062 15.488 50 16 50 C 16.512 50 17.023062 49.805062 17.414062 49.414062 L 32 34.828125 L 46.585938 49.414062 C 47.366938 50.195063 48.633063 50.195062 49.414062 49.414062 C 50.195063 48.633062 50.195062 47.366937 49.414062 46.585938 L 34.828125 32 L 49.414062 17.414062 C 50.195063 16.633063 50.195062 15.366938 49.414062 14.585938 C 48.633062 13.804938 47.366937 13.804938 46.585938 14.585938 L 32 29.171875 L 17.414062 14.585938 C 17.023062 14.194938 16.512 14 16 14 z"></path>
      </svg>
    </button>
  );
};

const Language = ({ locale }: { locale: string }): JSX.Element => {
  const [isPending, startTransition] = useTransition(),
    pathname = usePathname(),
    router = useRouter();

  const changeLanguage = (locale: string) => {
    startTransition(() =>
      router.replace(`${pathname}`, { locale: locale, scroll: false }),
    );
  };

  return (
    <button
      type={"button"}
      disabled={isPending}
      onClick={() => changeLanguage(locale)}
      className={`${document.cookie.includes("NEXT_LOCALE=" + locale) ? "font-medium" : "font-normal"} text-base`}
    >
      <p>{locale.toUpperCase()}</p>
    </button>
  );
};

const Page = ({ href }: { href: keyof typeof pathnames }) => {
  const t = useTranslations("navigation.links");
  return (
    <div
      className={
        "flex flex-col overflow-hidden justify-start items-start h-[3rem] group"
      }
    >
      <Link href={href} className={"navigation-link font-slick"}>
        {t(`${href.slice(1)}`)}
      </Link>
      <Link href={href} className={"navigation-link font-classic"}>
        {t(`${href.slice(1)}`).toUpperCase()}
      </Link>
    </div>
  );
};

export const ContactLinks = () => {
  const t = useTranslations("whisper"),
    [copied, copy] = useState(false);

  const isMobile = () => {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent,
    );
  };
  return (
    <div
      className={
        "flex justify-start items-center flex-wrap text-navy text-xs font-classic font-normal uppercase lg:gap-[1vw] gap-[1vh]"
      }
    >
      <a
        href={"https://wa.me/37797770543"}
        target={"_blank"}
        rel={"noopener noreferrer"}
        className={
          "flex justify-start items-center gap-[0.25vw] navigation-contact group"
        }
      >
        <Whisper type={"link"} label={t("whatsapp")} />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          viewBox="0 0 64 64"
          className={"lg:size-[1.5vw] size-[2.5vh] fill-navy"}
        >
          <path d="M 32 10 C 19.85 10 10 19.85 10 32 C 10 36.065 11.10725 39.869719 13.03125 43.136719 L 10.214844 53.683594 L 21.277344 51.208984 C 24.450344 52.983984 28.106 54 32 54 C 44.15 54 54 44.15 54 32 C 54 19.85 44.15 10 32 10 z M 32 14 C 41.941 14 50 22.059 50 32 C 50 41.941 41.941 50 32 50 C 28.269 50 24.803687 48.864875 21.929688 46.921875 L 15.791016 48.294922 L 17.353516 42.439453 C 15.250516 39.493453 14 35.896 14 32 C 14 22.059 22.059 14 32 14 z M 24.472656 21.736328 C 24.105656 21.736328 23.515672 21.871969 23.013672 22.417969 C 22.520672 22.964969 21.113281 24.278844 21.113281 26.964844 C 21.113281 29.640844 23.057078 32.23675 23.330078 32.59375 C 23.603078 32.96075 27.100531 38.639266 32.644531 40.822266 C 37.240531 42.632266 38.179547 42.273688 39.185547 42.179688 C 40.183547 42.093688 42.408328 40.866703 42.861328 39.595703 C 43.313328 38.323703 43.312875 37.232906 43.171875 37.003906 C 43.034875 36.781906 42.676859 36.644094 42.130859 36.371094 C 41.584859 36.097094 38.906297 34.777656 38.404297 34.597656 C 37.909297 34.417656 37.542547 34.323141 37.185547 34.869141 C 36.818547 35.415141 35.778125 36.643953 35.453125 37.001953 C 35.138125 37.368953 34.823344 37.411672 34.277344 37.138672 C 33.731344 36.865672 31.975531 36.292594 29.894531 34.433594 C 28.275531 32.992594 27.182188 31.208063 26.867188 30.664062 C 26.551188 30.119062 26.832469 29.821828 27.105469 29.548828 C 27.353469 29.310828 27.652781 28.916563 27.925781 28.601562 C 28.189781 28.277563 28.282891 28.056453 28.462891 27.689453 C 28.651891 27.332453 28.555922 27.007375 28.419922 26.734375 C 28.284922 26.460375 27.226234 23.765406 26.740234 22.691406 C 26.332234 21.787406 25.905672 21.760953 25.513672 21.751953 C 25.196672 21.735953 24.829656 21.736328 24.472656 21.736328 z"></path>
        </svg>
        WhatsApp
      </a>
      <a
        href={"mailto:info@g-yachts.com"}
        className={"navigation-contact group"}
      >
        <Whisper type={"link"} label={t("email")} />
        info@g-yachts.com
      </a>
      <button
        type={"button"}
        onClick={() => {
          if (isMobile()) {
            window.location.href = "tel:+37797770543";
          } else {
            navigator.clipboard.writeText("+37797770543");
            copy(true);
            setTimeout(() => copy(false), 3000);
          }
        }}
        className={"navigation-contact group"}
      >
        <Whisper type={"copy"} label={copied ? t("copied") : t("copy")} />
        +377 977 705 43
      </button>
    </div>
  );
};

const Navigation = () => {
  const t = useTranslations("navigation.links"),
    { openUI } = useInteraction();

  return (
    <motion.nav
      initial={{ x: "-100%" }}
      animate={{ x: "0" }}
      exit={{ x: "-100%" }}
      transition={{ duration: 0.2, ease: "easeInOut" }}
      className={`fixed left-0 top-0 z-20 h-[100dvh] lg:w-[32vw] w-full lg:px-[2vw] px-[4vw] py-[4vh] bg-rock-100 text-navy flex justify-between items-start flex-col lg:overflow-hidden overflow-y-auto`}
      onMouseMove={handleMouseMove}
    >
      <div className={"navigation-section"}>
        <div className={"w-full flex justify-between items-center"}>
          <Close />
          <div
            className={"flex justify-end items-baseline gap-[2vw] text-base"}
          >
            <Language locale={"en"} />
            <Language locale={"fr"} />
          </div>
        </div>
        <div
          className={"w-full flex flex-col justify-start items-start gap-[1vh]"}
        >
          <Page href={"/sales"} />
          <Page href={"/charters"} />
          <Page href={"/management"} />
          <Page href={"/company"} />
          <Page href={"/partners"} />
          <Page href={"/news"} />
          <Page href={"/recruitment"} />
          <div
            className={
              "flex flex-col overflow-hidden justify-start items-start h-[3rem] group"
            }
          >
            <button
              type={"button"}
              onClick={() => setTimeout(() => openUI("contact"), 200)}
              className={"navigation-link font-slick"}
            >
              {t("contact")}
            </button>
            <button
              type={"button"}
              onClick={() => setTimeout(() => openUI("contact"), 200)}
              className={"navigation-link font-classic"}
            >
              {t("contact").toUpperCase()}
            </button>
          </div>
        </div>
      </div>
      <div className={"navigation-section"}>
        <span
          className={
            "lg:hidden flex flex-col justify-center items-start gap-[2vh]"
          }
        >
          <Logo className={"w-[24vw]"} />
          <ContactLinks />
        </span>
        <span className={"lg:block hidden"}>
          <SocialLinks address={true} />
        </span>
        <div className={"w-full h-[0.25vh] bg-rock-200"} />
        <div className={"flex flex-col justify-start items-start"}>
          <span className={"lg:hidden block"}>
            <SocialLinks address={true} />
          </span>
          <span
            className={
              "lg:flex flex-col justify-center items-start gap-[2vh] hidden"
            }
          >
            <Logo className={"w-[8vw]"} />
            <ContactLinks />
          </span>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navigation;
