"use client";

import { useYacht } from "@/context/yacht";
import { IContext, useViewContext } from "@/context/view";
import Logo from "@/public/logo/logo";
import { convertUnit, formatCurrency } from "@/utils/yachts";
import { useTranslations } from "next-intl";

export const Hero = ({ units }: { units: IContext["units"] }) => {
  const { data } = useYacht();

  return (
    <section
      className={
        "w-full h-screen bg-center bg-cover flex justify-center items-center"
      }
      style={{
        backgroundImage: `url(${encodeURI(data.photos.featured.sizes.fhd.url)})`,
      }}
    >
      <div
        className={
          "w-[90vw] h-[90vh] border-white border-t-[0.25vh] border-x-[0.25vh] relative flex flex-col justify-start items-center p-[4vw] text-white"
        }
      >
        <h1
          className={
            "font-normal drop-shadow-xl uppercase text-9xl text-center"
          }
        >
          {data.name}
        </h1>
        <h2 className={"text-4xl tracking-widest font-normal drop-shadow-md"}>
          {data.builder} | {convertUnit(data.length, units.length)} |{" "}
          {data.yearBuilt}
        </h2>
        <div
          className={"absolute w-full bottom-0 flex justify-center items-end"}
        >
          <div className={"w-2/5 border-white border-b-[0.25vh]"} />
          <div className={"w-1/5"}>
            <Logo className={"fill-white size-full px-[4vw] translate-y-1/2"} />
          </div>
          <div className={"w-2/5 border-white border-b-[0.25vh]"} />
        </div>
      </div>
    </section>
  );
};

export const Details = ({
  currency,
  units,
}: {
  currency: IContext["currency"];
  units: IContext["units"];
}) => {
  const { data, type } = useYacht(),
    t = useTranslations("brochure");

  return (
    <section
      className={
        "w-full h-screen bg-center bg-cover flex justify-center items-center relative"
      }
      style={{
        backgroundImage: `url(${encodeURI(data.photos.featured.sizes.fhd.url)})`,
      }}
    >
      <div
        className={
          "w-[90vw] h-[84vh] bg-black/75 flex flex-col justify-between items-center p-[4vw] text-white"
        }
      >
        <h1 className={"font-normal text-center"}>
          {t.rich("general", {
            br: () => <br />,
          })}
        </h1>
        <div className={"w-4/5 grid grid-cols-2"}>
          <div
            className={
              "flex flex-col justify-center items-start gap-[2vh] w-full"
            }
          >
            <div
              className={"flex justify-center items-baseline gap-[2vw] w-full"}
            >
              <h3 className={"font-normal text-right w-1/2"}>{t("builder")}</h3>
              <h3 className={"w-1/2"}>{data.builder}</h3>
            </div>
            <div
              className={"flex justify-center items-baseline gap-[2vw] w-full"}
            >
              <h3 className={"font-normal text-right w-1/2"}>
                {t("yearBuilt")}
              </h3>
              <h3 className={"w-1/2"}>{data.yearBuilt}</h3>
            </div>
            <div
              className={"flex justify-center items-baseline gap-[2vw] w-full"}
            >
              <h3 className={"font-normal text-right w-1/2"}>{t("length")}</h3>
              <h3 className={"w-1/2"}>
                {convertUnit(data.length, units.length)}
              </h3>
            </div>
            <div
              className={"flex justify-center items-baseline gap-[2vw] w-full"}
            >
              <h3 className={"font-normal text-right w-1/2"}>{t("beam")}</h3>
              <h3 className={"w-1/2"}>
                {convertUnit(data.beam, units.length)}
              </h3>
            </div>
          </div>
          <div
            className={
              "flex flex-col justify-center items-start gap-[2vh] w-full"
            }
          >
            <div
              className={"flex justify-center items-baseline gap-[2vw] w-full"}
            >
              <h3 className={"font-normal text-right w-1/2"}>
                {t("location")}
              </h3>
              <h3 className={"w-1/2"}>{data.country}</h3>
            </div>
            <div
              className={"flex justify-center items-baseline gap-[2vw] w-full"}
            >
              <h3 className={"font-normal text-right w-1/2"}>{t("cabins")}</h3>
              <h3 className={"w-1/2"}>{data.rooms}</h3>
            </div>
            <div
              className={"flex justify-center items-baseline gap-[2vw] w-full"}
            >
              <h3 className={"font-normal text-right w-1/2"}>{t("guests")}</h3>
              <h3 className={"w-1/2"}>{data.sleeps}</h3>
            </div>
            <div
              className={"flex justify-center items-baseline gap-[2vw] w-full"}
            >
              <h3 className={"font-normal text-right w-1/2"}>
                {t("maxDraft")}
              </h3>
              <h3 className={"w-1/2"}>{data.maxDraft}</h3>
            </div>
          </div>
        </div>
        <h2 className={"font-medium"}>
          {type === "sale" || type === "new-construction"
            ? data.price
              ? t("price", { price: formatCurrency(data.price, currency) })
              : t("priceOnApplication")
            : t.rich("charter", {
                low: formatCurrency(data.price.low, currency),
                high: formatCurrency(data.price.high, currency),
                br: () => <br />,
              })}
        </h2>
      </div>
      <Logo
        className={"absolute bottom-[2vh] w-[12vh] fill-white drop-shadow-lg"}
      />
    </section>
  );
};

export const About = () => {
  const { data } = useYacht(),
    t = useTranslations("brochure");

  return (
    <section
      className={
        "w-full h-screen bg-center bg-cover flex justify-center items-center relative"
      }
      style={{
        backgroundImage: `url(${encodeURI(data.photos.featured.sizes.fhd.url)})`,
      }}
    >
      <div
        className={
          "w-[90vw] h-[84vh] bg-black/75 flex flex-col justify-center items-center py-[4vw] px-[16vw] text-white gap-[6vh]"
        }
      >
        <h1 className={"font-normal text-center leading-loose]"}>
          {t.rich("about", {
            name: data.name,
            br: () => <br />,
          })}
        </h1>
        <p className={"text-xl text-justify"}>{data.description}</p>
      </div>
      <Logo
        className={"absolute bottom-[2vh] w-[12vh] fill-white drop-shadow-lg"}
      />
    </section>
  );
};

export const KeyFeatures = () => {
  const { data } = useYacht(),
    t = useTranslations("brochure");

  return (
    <section
      className={
        "w-full h-screen bg-center bg-cover flex justify-center items-center relative"
      }
      style={{
        backgroundImage: `url(${encodeURI(data.photos.featured.sizes.fhd.url)})`,
      }}
    >
      <div
        className={
          "w-[90vw] h-[84vh] bg-black/75 flex flex-col justify-center items-center py-[4vw] px-[16vw] text-white gap-[6vh]"
        }
      >
        <h1 className={"font-normal text-center leading-loose]"}>
          {t.rich("keyFeatures", {
            br: () => <br />,
          })}
        </h1>
        <li className={"text-xl"}>
          {data.keyFeatures?.map((feature, i) => <ul key={i}>{feature}</ul>)}
        </li>
      </div>
      <Logo
        className={"absolute bottom-[2vh] w-[12vh] fill-white drop-shadow-lg"}
      />
    </section>
  );
};

export const Photo = ({
  index,
  units,
}: {
  index: number;
  units: IContext["units"];
}) => {
  const { data } = useYacht();

  return (
    <section
      className={
        "w-full h-screen bg-center bg-cover flex justify-center items-center"
      }
      style={{
        backgroundImage: `url(${encodeURI(data.photos.gallery[index].image.sizes.fhd.url)})`,
      }}
    >
      <div
        className={
          "w-full h-[90vh] relative flex justify-between items-end gap-[2vw]"
        }
      >
        <Logo
          className={
            "absolute w-[12vh] top-0 left-[4vw] fill-white drop-shadow-lg"
          }
        />
        <div
          className={"w-10/12 border-white border-b-[0.25vh] drop-shadow-lg"}
        />
        <p
          className={
            "text-white text-lg w-2/12 text-left translate-y-1/2 uppercase font-medium leading-loose drop-shadow-lg"
          }
        >
          {data.name}
          <br />
          {data.builder} | {convertUnit(data.length, units.length)} |{" "}
          {data.yearBuilt}
        </p>
      </div>
    </section>
  );
};

export const Footer = () => {
  const { data } = useYacht(),
    t = useTranslations("brochure");

  return (
    <section
      className={
        "w-full h-screen bg-center bg-cover flex justify-center items-center"
      }
      style={{
        backgroundImage: `url(${encodeURI(data.photos.featured.sizes.fhd.url)})`,
      }}
    >
      <div
        className={
          "w-full h-full bg-black/75 flex flex-col justify-between items-center py-[10vh] text-white"
        }
      >
        <Logo className={"w-[12vw] fill-white"} />
        <div className={"flex flex-col justify-center items-center gap-[4vh]"}>
          <h1 className={"uppercase font-normal text-9xl"}>Contact</h1>
          <div
            className={"flex flex-col justify-center items-center gap-[2vh]"}
          >
            {data.broker && (
              <>
                <p className={"text-xl font-medium"}>
                  {data.broker.name} – {data.broker.position}
                </p>
                <div className={"h-[0.25vh] bg-white w-[24vw]"} />
                <a
                  href={`mailto:${data.broker.email}`}
                  className={"text-xl font-medium"}
                >
                  {data.broker.email}
                </a>
                <div className={"h-[0.25vh] bg-white w-[24vw]"} />
                {data.broker.phones.length > 0 && (
                  <>
                    <div
                      className={"flex justify-center items-baseline gap-[2vw]"}
                    >
                      {data.broker.phones.map((phone, i) => (
                        <a
                          key={i}
                          className={"text-xl font-medium"}
                          href={`tel:${phone.prefix.replace(/^./, "+")}${phone.number}`}
                        >
                          {phone.prefix.replace(/^./, "+")} {phone.number}
                        </a>
                      ))}
                    </div>
                    <div className={"h-[0.25vh] bg-white w-[24vw]"} />
                  </>
                )}
              </>
            )}
            <a
              href={"https://www.g-yachts.com"}
              className={"text-xl font-medium"}
            >
              www.g-yachts.com
            </a>
            <div className={"h-[0.25vh] bg-white w-[24vw]"} />
            <a
              className={"text-xl font-medium text-center"}
              href={"https://maps.app.goo.gl/1V8cT1wQsZkdjTt47"}
            >
              Le Beau rivage
              <br />9 Avenue d&apos;Ostende
              <br />
              98000, Monaco
            </a>
          </div>
        </div>
        <div className={"flex flex-col justify-center items-center gap-[2vh]"}>
          <h2 className={"font-slick font-light"}>
            {t.rich("expert", {
              classic: (chunk: React.ReactNode) => (
                <span className={"uppercase font-classic font-medium"}>
                  {chunk}
                </span>
              ),
            })}
          </h2>
          <div
            className={"flex justify-start items-baseline fill-white gap-[2vw]"}
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
                className={"size-[6vh]"}
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
                className={"size-[6vh]"}
              >
                <path d="M 23.773438 12 C 12.855437 12 12 12.854437 12 23.773438 L 12 40.226562 C 12 51.144563 12.855438 52 23.773438 52 L 40.226562 52 C 51.144563 52 52 51.145563 52 40.226562 L 52 23.773438 C 52 12.854437 51.145563 12 40.226562 12 L 23.773438 12 z M 21.167969 16 L 42.832031 16 C 47.625031 16 48 16.374969 48 21.167969 L 48 42.832031 C 48 47.625031 47.624031 48 42.832031 48 L 38.617188 48 L 38.617188 36.039062 L 43.353516 36.039062 L 44.099609 30.716797 L 38.617188 30.716797 C 38.617188 30.716797 38.609187 27.599266 38.617188 26.822266 C 38.633187 25.301266 39.904094 24.531969 40.996094 24.542969 C 42.088094 24.554969 44.349609 24.546875 44.349609 24.546875 L 44.349609 19.640625 C 44.349609 19.640625 42.391891 19.386234 40.337891 19.365234 C 38.611891 19.347234 36.705969 19.815234 35.167969 21.365234 C 33.602969 22.941234 33.356172 25.289203 33.326172 28.158203 C 33.317172 28.987203 33.326172 30.714844 33.326172 30.714844 L 28.691406 30.714844 L 28.691406 36.037109 L 33.326172 36.037109 L 33.326172 48 L 21.167969 48 C 16.374969 48 16 47.624031 16 42.832031 L 16 21.167969 C 16 16.374969 16.374969 16 21.167969 16 z"></path>
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
                className={"size-[6vh]"}
              >
                <path d="M 23.773438 12 C 12.855437 12 12 12.854437 12 23.773438 L 12 40.226562 C 12 51.144563 12.855438 52 23.773438 52 L 40.226562 52 C 51.144563 52 52 51.145563 52 40.226562 L 52 23.773438 C 52 12.854437 51.145563 12 40.226562 12 L 23.773438 12 z M 21.167969 16 L 42.832031 16 C 47.625031 16 48 16.374969 48 21.167969 L 48 42.832031 C 48 47.625031 47.624031 48 42.832031 48 L 21.167969 48 C 16.374969 48 16 47.624031 16 42.832031 L 16 21.167969 C 16 16.374969 16.374969 16 21.167969 16 z M 22.501953 18.503906 C 20.872953 18.503906 19.552734 19.824172 19.552734 21.451172 C 19.552734 23.078172 20.871953 24.400391 22.501953 24.400391 C 24.126953 24.400391 25.447266 23.079172 25.447266 21.451172 C 25.447266 19.826172 24.126953 18.503906 22.501953 18.503906 z M 37.933594 26.322266 C 35.473594 26.322266 33.823437 27.672172 33.148438 28.951172 L 33.078125 28.951172 L 33.078125 26.728516 L 28.228516 26.728516 L 28.228516 43 L 33.28125 43 L 33.28125 34.949219 C 33.28125 32.826219 33.687359 30.771484 36.318359 30.771484 C 38.912359 30.771484 38.945312 33.200891 38.945312 35.087891 L 38.945312 43 L 44 43 L 44 34.074219 C 44 29.692219 43.054594 26.322266 37.933594 26.322266 z M 19.972656 26.728516 L 19.972656 43 L 25.029297 43 L 25.029297 26.728516 L 19.972656 26.728516 z"></path>
              </svg>
            </a>
          </div>
          <p className={"text-xl"}>{t("disclaimer")}</p>
        </div>
      </div>
    </section>
  );
};
