"use client";

import { IYacht } from "@/types/yacht";
import { useEffect, useState } from "react";
import { convertUnit } from "@/utils/yachts";
import { useTranslations } from "next-intl";
import { Link } from "@/navigation";
import { useViewContext } from "@/context/view";
import { convertCurrency } from "@/app/actions";

interface IListing
  extends Pick<
    IYacht,
    "name" | "price" | "builder" | "length" | "yearBuilt" | "sleeps" | "photos"
  > {
  _id: string;
}

const Photo = ({ url, style }: { url: string; style: React.CSSProperties }) => {
  return (
    <div
      className={
        "w-[92vw] md:w-[44vw] lg:w-[30vw] h-full bg-cover bg-center transition-transform duration-200 ease-in-out"
      }
      style={{
        backgroundImage: url,
        ...style,
      }}
    ></div>
  );
};

const Card = ({ data }: { data: IListing }) => {
  const t = useTranslations("index.featured"),
    { currency, units } = useViewContext(),
    [price, setPrice] = useState<string | null>(null),
    [translate, setTranslate] = useState<number>(0);

  useEffect(() => {
    convertCurrency(data.price, currency).then((price) => setPrice(price));
  }, []);

  return (
    <Link
      href={"/sales"}
      className={
        "w-full md:w-[44vw] lg:w-[30vw] h-max flex flex-col justify-start items-start overflow-x-clip"
      }
    >
      <div className={"w-full h-max lg:overflow-x-hidden overflow-x-scroll"}>
        <div
          className={
            "w-max h-[28vh] lg:h-[36vh] flex justify-start items-end mb-[1vh]"
          }
        >
          <Photo
            url={`url(http://51.75.16.185/images/yachts/sales/${data._id}/${data.photos.gallery[0]})`}
            style={{
              transform: `translateX(${translate}%)`,
            }}
          />
          <Photo
            url={`url(http://51.75.16.185/images/yachts/sales/${data._id}/${data.photos.gallery[1]})`}
            style={{
              transform: `translateX(${translate}%)`,
            }}
          />
          <Photo
            url={`url(http://51.75.16.185/images/yachts/sales/${data._id}/${data.photos.gallery[2]})`}
            style={{
              transform: `translateX(${translate}%)`,
            }}
          />
          <div
            className={
              "w-[92vw] lg:w-[30vw] absolute hidden h-max gap-[0.20vw] mb-[2vh] lg:flex justify-center items-center"
            }
          >
            <button
              type={"button"}
              onClick={(e) => {
                e.preventDefault();
                setTranslate(0);
              }}
              className={`w-[2vw] h-[0.25vh] mt-[1vh] rounded-full ${translate === 0 ? "bg-white" : "bg-white/50"} transition-[background-color] duration-500 ease-in-out cursor-crosshair`}
            />
            <button
              type={"button"}
              onClick={(e) => {
                e.preventDefault();
                setTranslate(-100);
              }}
              className={`w-[2vw] h-[0.25vh] mt-[1vh] rounded-full ${translate === -100 ? "bg-white" : "bg-white/50"} transition-[background-color] duration-500 ease-in-out cursor-crosshair`}
            />
            <button
              type={"button"}
              onClick={(e) => {
                e.preventDefault();
                setTranslate(-200);
              }}
              className={`w-[2vw] h-[0.25vh] mt-[1vh] rounded-full ${translate === -200 ? "bg-white" : "bg-white/50"} transition-[background-color] duration-500 ease-in-out cursor-crosshair`}
            />
          </div>
        </div>
      </div>

      <div
        className={`w-full flex justify-between ${price ? "items-baseline" : "items-center"} text-black uppercase`}
      >
        <p>{data.name}</p>
        {price ? (
          <p>{price}</p>
        ) : (
          <div
            className={
              "bg-rock-300 lg:w-[10vw] h-[1rem] rounded-full animate-pulse"
            }
          />
        )}
      </div>
      <p className={"uppercase text-rock-400"}>
        {data.builder} | {convertUnit(data.length, units.length) + units.length}{" "}
        | {data.yearBuilt} | {data.sleeps} {t("sleeps")}
      </p>
    </Link>
  );
};

const Listing = ({ data }: { data: IListing[] }) => {
  const [maxListings, setMaxListings] = useState<number>(12); // TODO: limit yacht listings with option to load more...

  return (
    <section
      className={
        "containerize h-max md:grid md:grid-cols-2 lg:grid-cols-3 flex flex-col justify-start items-start gap-[4vh] my-[8vh]"
      }
    >
      {data.map((yacht, i) => (
        <Card key={i} data={yacht} />
      ))}
    </section>
  );
};

export default Listing;
