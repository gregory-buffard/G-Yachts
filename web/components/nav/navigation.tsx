import { useTransition } from "react";
import { useTranslations } from "next-intl";
import { usePathname, useRouter, Link, pathnames } from "@/navigation";
import Image from "next/image";
import logo from "@/public/logo/black.png";
import { motion } from "framer-motion";

export const Close = ({
  action,
  value,
}: {
  action: (value: "navigation" | "contact" | undefined) => void;
  value: "navigation" | "contact" | undefined;
}) => {
  return (
    <button type={"button"} onClick={() => action(value)}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        x="0px"
        y="0px"
        viewBox="0 0 64 64"
        className={
          "size-[1.5vw] sm:size-[3vh] hover:rotate-90 transition-transform duration-200 ease-in-out"
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
  const isMobile = () => {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent,
    );
  };
  return (
    <div
      className={
        "flex justify-start items-center sm:flex-wrap text-navy text-xs font-classic font-normal uppercase gap-[1vw] sm:gap-[1vh]"
      }
    >
      <a
        href={"https://wa.me/37797770543"}
        target={"_blank"}
        rel={"noopener noreferrer"}
        className={
          "flex justify-start items-center gap-[0.25vw] navigation-contact"
        }
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          viewBox="0 0 64 64"
          className={"size-[1.5vw] sm:size-[2.5vh] fill-navy"}
        >
          <path d="M 32 10 C 19.85 10 10 19.85 10 32 C 10 36.065 11.10725 39.869719 13.03125 43.136719 L 10.214844 53.683594 L 21.277344 51.208984 C 24.450344 52.983984 28.106 54 32 54 C 44.15 54 54 44.15 54 32 C 54 19.85 44.15 10 32 10 z M 32 14 C 41.941 14 50 22.059 50 32 C 50 41.941 41.941 50 32 50 C 28.269 50 24.803687 48.864875 21.929688 46.921875 L 15.791016 48.294922 L 17.353516 42.439453 C 15.250516 39.493453 14 35.896 14 32 C 14 22.059 22.059 14 32 14 z M 24.472656 21.736328 C 24.105656 21.736328 23.515672 21.871969 23.013672 22.417969 C 22.520672 22.964969 21.113281 24.278844 21.113281 26.964844 C 21.113281 29.640844 23.057078 32.23675 23.330078 32.59375 C 23.603078 32.96075 27.100531 38.639266 32.644531 40.822266 C 37.240531 42.632266 38.179547 42.273688 39.185547 42.179688 C 40.183547 42.093688 42.408328 40.866703 42.861328 39.595703 C 43.313328 38.323703 43.312875 37.232906 43.171875 37.003906 C 43.034875 36.781906 42.676859 36.644094 42.130859 36.371094 C 41.584859 36.097094 38.906297 34.777656 38.404297 34.597656 C 37.909297 34.417656 37.542547 34.323141 37.185547 34.869141 C 36.818547 35.415141 35.778125 36.643953 35.453125 37.001953 C 35.138125 37.368953 34.823344 37.411672 34.277344 37.138672 C 33.731344 36.865672 31.975531 36.292594 29.894531 34.433594 C 28.275531 32.992594 27.182188 31.208063 26.867188 30.664062 C 26.551188 30.119062 26.832469 29.821828 27.105469 29.548828 C 27.353469 29.310828 27.652781 28.916563 27.925781 28.601562 C 28.189781 28.277563 28.282891 28.056453 28.462891 27.689453 C 28.651891 27.332453 28.555922 27.007375 28.419922 26.734375 C 28.284922 26.460375 27.226234 23.765406 26.740234 22.691406 C 26.332234 21.787406 25.905672 21.760953 25.513672 21.751953 C 25.196672 21.735953 24.829656 21.736328 24.472656 21.736328 z"></path>
        </svg>
        WhatsApp
      </a>
      <a href={"mailto:info@g-yachts.com"} className={"navigation-contact"}>
        info@g-yachts.com
      </a>
      <button
        type={"button"}
        onClick={() => {
          isMobile()
            ? (window.location.href = "tel:+37797770543")
            : navigator.clipboard.writeText("+37797770543");
        }}
        className={"navigation-contact"}
      >
        +377 977 705 43
      </button>
    </div>
  );
};

export const SocialLinks = ({ address }: { address: boolean }) => {
  const t = useTranslations("navigation");
  return (
    <div className={"w-full flex flex-col justify-start items-start gap-[1vh]"}>
      {address && (
        <a
          href={"https://maps.app.goo.gl/v3VUea8RKH7BB8ZZ6"}
          target={"_blank"}
          className={
            "flex flex-col justify-start items-start text-sm font-classic"
          }
        >
          <p className={"uppercase font-medium"}>{t("hq")}</p>
          <p className={"font-normal"}>
            Le Beau Rivage,
            <br />9 avenue d&apos;Ostende,
            <br />
            98000 Monaco
          </p>
        </a>
      )}
      <div
        className={"flex justify-start items-baseline fill-navy sm:gap-[1vh]"}
      >
        <a
          href={
            "https://www.instagram.com/gyachtsmonaco?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
          }
          target={"_blank"}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            viewBox="0 0 64 64"
            className={"size-[2vw] sm:size-[4vh]"}
          >
            <path d="M 31.820312 12 C 13.439312 12 12 13.439312 12 31.820312 L 12 32.179688 C 12 50.560688 13.439312 52 31.820312 52 L 32.179688 52 C 50.560688 52 52 50.560688 52 32.179688 L 52 32 C 52 13.452 50.548 12 32 12 L 31.820312 12 z M 28 16 L 36 16 C 47.129 16 48 16.871 48 28 L 48 36 C 48 47.129 47.129 48 36 48 L 28 48 C 16.871 48 16 47.129 16 36 L 16 28 C 16 16.871 16.871 16 28 16 z M 41.994141 20 C 40.889141 20.003 39.997 20.900859 40 22.005859 C 40.003 23.110859 40.900859 24.003 42.005859 24 C 43.110859 23.997 44.003 23.099141 44 21.994141 C 43.997 20.889141 43.099141 19.997 41.994141 20 z M 31.976562 22 C 26.454563 22.013 21.987 26.501437 22 32.023438 C 22.013 37.545437 26.501437 42.013 32.023438 42 C 37.545437 41.987 42.013 37.498562 42 31.976562 C 41.987 26.454563 37.498562 21.987 31.976562 22 z M 31.986328 26 C 35.299328 25.992 37.992 28.673328 38 31.986328 C 38.007 35.299328 35.326672 37.992 32.013672 38 C 28.700672 38.008 26.008 35.327672 26 32.013672 C 25.992 28.700672 28.673328 26.008 31.986328 26 z"></path>
          </svg>
        </a>
        <a href={"https://www.facebook.com/GYachts"} target={"_blank"}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            viewBox="0 0 64 64"
            className={"size-[2vw] sm:size-[4vh]"}
          >
            <path d="M 32 10 C 19.85 10 10 19.85 10 32 C 10 44.15 19.85 54 32 54 C 44.15 54 54 44.15 54 32 C 54 19.85 44.15 10 32 10 z M 32 14 C 41.941 14 50 22.059 50 32 C 50 41.019571 43.357999 48.468043 34.703125 49.775391 L 34.703125 38.316406 L 39.544922 38.316406 L 40.269531 32.544922 L 34.703125 32.544922 L 34.703125 28.503906 C 34.703125 26.902906 35.786547 26.080078 36.935547 26.080078 C 38.084547 26.080078 40.464844 26.046875 40.464844 26.046875 L 40.464844 20.882812 C 40.464844 20.882812 38.346594 20.638672 36.183594 20.638672 C 34.366594 20.638672 32.365672 21.150828 30.763672 22.798828 C 29.133672 24.474828 28.898438 26.949703 28.898438 29.970703 L 28.898438 32.544922 L 24.046875 32.544922 L 24.046875 38.316406 L 28.898438 38.316406 L 28.898438 49.714844 C 20.438669 48.242252 14 40.881048 14 32 C 14 22.059 22.059 14 32 14 z"></path>
          </svg>
        </a>
        <a
          href={"https://www.linkedin.com/company/g-yachts-monaco/"}
          target={"_blank"}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            viewBox="0 0 64 64"
            className={"size-[2vw] sm:size-[4vh]"}
          >
            <path d="M 23.773438 12 C 12.855437 12 12 12.854437 12 23.773438 L 12 40.226562 C 12 51.144563 12.855438 52 23.773438 52 L 40.226562 52 C 51.144563 52 52 51.145563 52 40.226562 L 52 23.773438 C 52 12.854437 51.145563 12 40.226562 12 L 23.773438 12 z M 21.167969 16 L 42.832031 16 C 47.625031 16 48 16.374969 48 21.167969 L 48 42.832031 C 48 47.625031 47.624031 48 42.832031 48 L 21.167969 48 C 16.374969 48 16 47.624031 16 42.832031 L 16 21.167969 C 16 16.374969 16.374969 16 21.167969 16 z M 22.501953 18.503906 C 20.872953 18.503906 19.552734 19.824172 19.552734 21.451172 C 19.552734 23.078172 20.871953 24.400391 22.501953 24.400391 C 24.126953 24.400391 25.447266 23.079172 25.447266 21.451172 C 25.447266 19.826172 24.126953 18.503906 22.501953 18.503906 z M 37.933594 26.322266 C 35.473594 26.322266 33.823437 27.672172 33.148438 28.951172 L 33.078125 28.951172 L 33.078125 26.728516 L 28.228516 26.728516 L 28.228516 43 L 33.28125 43 L 33.28125 34.949219 C 33.28125 32.826219 33.687359 30.771484 36.318359 30.771484 C 38.912359 30.771484 38.945312 33.200891 38.945312 35.087891 L 38.945312 43 L 44 43 L 44 34.074219 C 44 29.692219 43.054594 26.322266 37.933594 26.322266 z M 19.972656 26.728516 L 19.972656 43 L 25.029297 43 L 25.029297 26.728516 L 19.972656 26.728516 z"></path>
          </svg>
        </a>
      </div>
    </div>
  );
};

const Navigation = ({
  open,
}: {
  open: (value: "navigation" | "contact" | undefined) => void;
}) => {
  const t = useTranslations("navigation.links");

  return (
    <motion.nav
      initial={{ x: "-100%" }}
      animate={{ x: "0" }}
      exit={{ x: "-100%" }}
      transition={{ duration: 0.2, ease: "easeInOut" }}
      className={`fixed left-0 bottom-0 h-screen w-[32vw] sm:w-screen px-[2vw] sm:px-[4vw] py-[4vh] bg-rock-100 text-navy flex justify-between items-start flex-col gap-[2vh]`}
    >
      <div className={"navigation-section"}>
        <div className={"w-full flex justify-between items-center"}>
          <Close action={open} value={undefined} />
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
              onClick={() => setTimeout(() => open("contact"), 200)}
              className={"navigation-link font-slick"}
            >
              {t("contact")}
            </button>
            <button
              type={"button"}
              onClick={() => setTimeout(() => open("contact"), 200)}
              className={"navigation-link font-classic"}
            >
              {t("contact").toUpperCase()}
            </button>
          </div>
        </div>
      </div>
      <div className={"navigation-section"}>
        <span className={"hidden sm:block"}>
          <Image
            src={logo}
            alt={"G–Yachts logo"}
            className={"w-[8vw] sm:w-[24vw] my-[2vh]"}
          />
          <ContactLinks />
        </span>
        <span className={"sm:hidden"}>
          <SocialLinks address={true} />
        </span>
        <div className={"w-full h-[0.25vh] bg-rock-200"} />
        <div className={"flex flex-col justify-start items-start"}>
          <span className={"hidden sm:block"}>
            <SocialLinks address={true} />
          </span>
          <span className={"sm:hidden"}>
            <Image
              src={logo}
              alt={"G–Yachts logo"}
              className={"w-[8vw] sm:w-[24vw] my-[2vh]"}
            />
            <ContactLinks />
          </span>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navigation;
