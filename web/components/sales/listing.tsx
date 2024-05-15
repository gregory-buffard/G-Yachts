"use client";

import { IYacht as Yacht } from "@/types/yacht";
import { useEffect, useState } from "react";
import { convertUnit } from "@/utils/yachts";
import { useTranslations } from "next-intl";
import { Link } from "@/navigation";
import { useViewContext } from "@/context/view";
import { convertCurrency } from "@/app/actions";
import Bookmark from "@/public/imagery/optimized/sales/bookmark";

interface IYacht
  extends Pick<
    Yacht,
    | "name"
    | "category"
    | "price"
    | "builder"
    | "length"
    | "yearBuilt"
    | "sleeps"
    | "photos"
  > {
  _id: string;
}

interface IFilters {
  category: "sail" | "motor" | undefined;
  year: number | undefined;
  length: { min: number; max: number };
  builder: string | undefined;
  price: { min: number; max: number };
  sleeps: number | undefined;
  name: string | undefined;
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

const Card = ({ data }: { data: IYacht }) => {
  const t = useTranslations("index.featured"),
    { currency, units, bookmarks, addBookmark, removeBookmark } =
      useViewContext(),
    [price, setPrice] = useState<string | null>(null),
    [translate, setTranslate] = useState<number>(0);

  useEffect(() => {
    convertCurrency(data.price, currency).then((price) => setPrice(price));
  }, []);

  return (
    <Link
      href={{ pathname: "/sales/[id]", params: { id: data._id } }}
      className={
        "w-full md:w-[44vw] lg:w-[30vw] h-max flex flex-col justify-start items-start overflow-x-clip"
      }
    >
      <div className={"w-full h-max lg:overflow-x-hidden overflow-x-scroll"}>
        <div
          className={
            "w-max lg:h-[18vw] md:h-[24vw] h-[28vh] flex justify-start items-center mb-[1vh]"
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
              "w-[92vw] md:w-[44vw] lg:w-[30vw] absolute h-max flex justify-between items-center lg:px-[1vw] px-[2vw] -translate-y-[11vh] md:-translate-y-[9vw] lg:-translate-y-[7vw]"
            }
          >
            <p>
              {/* TODO: Add yacht's "status" (i.e. sold, exclusive, new, ...) */}
            </p>
            <button
              type={"button"}
              onClick={(e) => {
                e.preventDefault();
                bookmarks.includes(data._id)
                  ? removeBookmark(data._id)
                  : addBookmark(data._id);
              }}
            >
              <Bookmark
                className={`${bookmarks.includes(data._id) ? "fill-teal" : "fill-white"} transition-colors duration-500 ease-in-out lg:size-[2vw] size-[4vh]`}
              />
            </button>
          </div>
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

const ViewButton = ({
  view,
  count,
  currentView,
  onClick,
}: {
  view: "global" | "bookmarks";
  count: number;
  currentView: "global" | "bookmarks";
  onClick: () => void;
}) => {
  const t = useTranslations("sales.listing.views");
  return (
    <button
      type={"button"}
      onClick={onClick}
      className={`px-[4vw] py-[1vh] ${view === currentView ? "text-black border-black border-b-[0.25vh]" : "text-rock-400 border-0"} uppercase transition-colors duration-500 ease-in-out cursor-pointer`}
    >
      <p>{t(view) + " " + `(${count})`}</p>
    </button>
  );
};

const ListView = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      className={
        "w-full h-max md:grid-cols-2 lg:grid-cols-3 md:grid flex flex-col justify-start items-start gap-[4vh] md:gap-[4vw] lg:gap-[1vw]"
      }
    >
      {children}
    </div>
  );
};

const Radio = ({
  name,
  options,
  currentOption,
  onChange,
}: {
  name: string;
  options: string[];
  currentOption: string;
  onChange: (value: string) => void;
}) => {
  return (
    <table className={"w-full border-[0.25vh] border-black border-collapse"}>
      {options.map((option) => (
        <td
          key={option}
          className={"w-1/3 h-[3vh] border-[0.25vh] border-black"}
        >
          <button className={"w-full h-full"}>{option}</button>
        </td>
      ))}
    </table>
  );
};

const Listing = ({ data }: { data: IYacht[] }) => {
  const t = useTranslations("sales.listing"),
    { bookmarks } = useViewContext(),
    [maxListing, setMaxListing] = useState<number>(12);
  const [view, setView] = useState<"global" | "bookmarks">("global");

  const [filter, setFilter] = useState<IFilters>({
    category: undefined,
    year: undefined,
    length: {
      min: Math.min(...data.map((yacht) => yacht.length)),
      max: Math.max(...data.map((yacht) => yacht.length)),
    },
    builder: undefined,
    price: {
      min: Math.min(...data.map((yacht) => yacht.price)),
      max: Math.max(...data.map((yacht) => yacht.price)),
    },
    sleeps: undefined,
    name: undefined,
  });
  const filteredData = data.filter((yacht) => {
    if (filter.category !== undefined) yacht.category === filter.category;
    if (filter.year !== undefined) yacht.yearBuilt === filter.year;
    if (filter.length.min !== undefined && filter.length.max !== undefined)
      filter.length.min <= yacht.length && yacht.length <= filter.length.max;
    if (filter.builder !== undefined) yacht.builder === filter.builder;
    if (filter.price.min !== undefined && filter.price.max !== undefined)
      filter.price.min <= yacht.price && yacht.price <= filter.price.max;
    if (filter.sleeps !== undefined) yacht.sleeps === filter.sleeps;
    if (filter.name !== undefined) yacht.name === filter.name;
    return yacht;
  });

  return (
    <section
      className={
        "containerize flex flex-col justify-start items-center bg-stone-100 py-[4vh] gap-[4vh]"
      }
    >
      <div className={"w-full h-max flex justify-between items-center"}>
        <div className={"filter-column"}>
          <label>{t("filters.type.label")}</label>
          <Radio
            options={[
              t("filters.type.all"),
              t("filters.type.motor"),
              t("filters.type.sail"),
            ]}
            currentOption={""}
            name={"category"}
            onChange={(value) => {}}
          />
        </div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div
        className={
          "w-full h-max flex justify-start items-baseline border-b-[0.25vh] border-rock-200"
        }
      >
        <ViewButton
          view={"global"}
          count={data.length}
          currentView={view}
          onClick={() => setView("global")}
        />
        <ViewButton
          view={"bookmarks"}
          count={bookmarks.length}
          currentView={view}
          onClick={() => setView("bookmarks")}
        />
      </div>
      <div
        className={`w-full h-max flex flex-col justify-start items-center gap-[4vh]`}
      >
        {view === "global" ? (
          <>
            <ListView>
              {filteredData.slice(0, maxListing).map((yacht, i) => (
                <Card key={i} data={yacht} />
              ))}
            </ListView>
            <div
              className={
                "w-full h-max flex flex-col justify-center items-center uppercase gap-[2vh]"
              }
            >
              <p>
                {maxListing >= data.length
                  ? t("end")
                  : t("listed", { count: maxListing, total: data.length })}
              </p>
              {maxListing >= data.length ? null : (
                <>
                  <div
                    className={
                      "w-[48vw] h-[0.25vh] bg-rock-300 [transition:_width_500ms_ease-in-out]"
                    }
                  >
                    <div
                      className={"h-full bg-black"}
                      style={{
                        width: `${(maxListing / data.length) * 100}%`,
                      }}
                    />
                  </div>
                  <button
                    type={"button"}
                    onClick={() => setMaxListing(maxListing + 12)}
                    className={"glass-button glass-button-dark"}
                  >
                    {t("expand")}
                  </button>
                </>
              )}
            </div>
          </>
        ) : bookmarks.length > 0 ? (
          <>
            <ListView>
              {bookmarks.map((bookmark) => {
                const yacht = filteredData.find(
                  (yacht) => yacht._id === bookmark,
                );
                return <Card key={yacht!._id} data={yacht!} />;
              })}
            </ListView>
            <div
              className={
                "w-full h-max bg-white flex justify-start items-center lg:px-[2vw] lg:py-[2vh] px-[4vw] py-[1vh] lg:gap-[1vw] gap-[2vw]"
              }
            >
              <Bookmark className={"w-[4vh] fill-teal"} />
              <label className={"normal-case"}>{t("info")}</label>
            </div>
          </>
        ) : (
          <div
            className={
              "w-full h-max flex flex-col justify-start items-start gap-[4vh]"
            }
          >
            <h3>{t("views.empty")}</h3>
            <div
              className={
                "w-full h-max bg-white flex justify-start items-center lg:px-[2vw] lg:py-[2vh] px-[4vw] py-[1vh] lg:gap-[1vw] gap-[2vw]"
              }
            >
              <Bookmark className={"w-[4vh] fill-rock-200"} />
              <label className={"normal-case"}>{t("guide")}</label>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Listing;
