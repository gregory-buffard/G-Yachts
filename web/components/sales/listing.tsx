"use client";

import { ISale } from "@/types/sale";
import { useEffect, useState } from "react";
import { convertUnit, formatCurrency } from "@/utils/yachts";
import { useTranslations } from "next-intl";
import { Link } from "@/navigation";
import { useViewContext } from "@/context/view";
import Bookmark from "@/public/imagery/optimized/sales/bookmark";
import { ListingModifier, Range, Select, Radio } from "@/components/filters";

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

const Card = ({ data }: { data: ISale }) => {
  const t = useTranslations("index.featured"),
    { currency, units, bookmarks, addBookmark, removeBookmark, rates } =
      useViewContext(),
    [price, setPrice] = useState<string | undefined>(undefined),
    [interval, setPeriod] = useState<NodeJS.Timeout | null>(null),
    [translate, setTranslate] = useState<number>(0);

  useEffect(() => {
    setPrice(formatCurrency(data.price * rates[currency], currency));
  }, [data, currency, rates]);

  useEffect(() => {
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [interval]);

  const handleMouseEnter = () => {
      const id = setInterval(() => {
        setTranslate((prev) => {
          const next = prev - 100;
          return next <= -300 ? 0 : next;
        });
      }, 2000);
      setPeriod(id);
    },
    handleMouseLeave = () => {
      if (interval) {
        clearInterval(interval);
        setPeriod(null);
      }
    };

  return (
    <Link
      href={{ pathname: "/sales/[id]", params: { id: data.id } }}
      className={
        "w-full md:w-[44vw] lg:w-[30vw] h-max flex flex-col justify-start items-start overflow-x-clip"
      }
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className={"w-full h-max lg:overflow-x-hidden overflow-x-scroll"}>
        <div
          className={
            "w-max lg:h-[18vw] md:h-[24vw] h-[28vh] flex justify-start items-center mb-[1vh]"
          }
        >
          <Photo
            url={`url(${data.photos.featured.sizes.thumbnail.url})`}
            style={{
              transform: `translateX(${translate}%)`,
            }}
          />
          <Photo
            url={`url(${data.photos.gallery[0]?.image.sizes.thumbnail.url})`}
            style={{
              transform: `translateX(${translate}%)`,
            }}
          />
          <Photo
            url={`url(${data.photos.gallery[1]?.image.sizes.thumbnail.url})`}
            style={{
              transform: `translateX(${translate}%)`,
            }}
          />
          <div
            className={`w-[92vw] md:w-[44vw] lg:w-[30vw] absolute h-max flex ${!data.etiquette && "flex-row-reverse"} justify-between items-center lg:px-[1vw] px-[2vw] -translate-y-[11vh] md:-translate-y-[9vw] lg:-translate-y-[7vw]`}
          >
            {data.etiquette && (
              <p
                className={
                  "bg-white rounded-lg uppercase py-[0.5rem] px-[1rem] drop-shadow-lg"
                }
              >
                {data.etiquette}
              </p>
            )}
            <button
              type={"button"}
              onClick={(e) => {
                e.preventDefault();
                bookmarks.includes(data.id)
                  ? removeBookmark(data.id)
                  : addBookmark(data.id);
              }}
            >
              <Bookmark
                className={`${bookmarks.includes(data.id) ? "fill-teal" : "fill-white"} transition-colors duration-500 ease-in-out lg:size-[2vw] size-[4vh]`}
              />
            </button>
          </div>
          <div
            className={
              "w-[92vw] lg:w-[30vw] absolute hidden h-max gap-[0.20vw] mb-[2vh] lg:mt-[17vw] md:mt-[23vw] mt-[27vh] lg:flex justify-center items-center"
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
        className={`w-full flex justify-between ${data.price ? "items-baseline" : "items-center"} text-black uppercase`}
      >
        <p>{data.name}</p>
        {data.price ? <p>{price}</p> : <p>{t("priceOnApplication")}</p>}
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
        "w-full h-max md:grid-cols-2 lg:grid-cols-3 md:grid flex flex-col justify-start items-start gap-y-[4vh] md:gap-y-[4vh] md:gap-x-[4vw] lg:gap-x-[1vw] lg:gap-y-[4vh]"
      }
    >
      {children}
    </div>
  );
};

const Listing = ({ data }: { data: ISale[] }) => {
  const t = useTranslations("sales.listing"),
    { bookmarks } = useViewContext(),
    { currency, units, changeCurrency } = useViewContext(),
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
  const [filteredData, setFilteredData] = useState<ISale[]>(data);

  useEffect(() => {
    const filtered = data.filter((yacht) => {
      if (filter.category && yacht.category !== filter.category) return false;
      if (filter.year && yacht.yearBuilt !== filter.year) return false;
      if (filter.length.min !== undefined && filter.length.max !== undefined) {
        if (
          yacht.length < filter.length.min ||
          yacht.length > filter.length.max
        )
          return false;
      }
      if (filter.builder && yacht.builder !== filter.builder) return false;
      if (filter.price.min !== undefined && filter.price.max !== undefined) {
        if (yacht.price < filter.price.min || yacht.price > filter.price.max)
          return false;
      }
      if (filter.sleeps !== undefined && yacht.sleeps !== filter.sleeps)
        return false;
      if (filter.name && yacht.name !== filter.name) return false;

      return true;
    });

    setFilteredData(filtered);
  }, [filter, data]);

  return (
    <section
      className={
        "w-full px-[2vw] flex flex-col justify-start items-center bg-stone-100 py-[4vh] gap-[4vh]"
      }
    >
      <div
        className={
          "w-full md:px-0 px-[2vw] h-max flex md:flex-row flex-col justify-between md:justify-evenly items-center md:items-start z-10 gap-[2vh]"
        }
      >
        <div className={"filter-column"}>
          <div className={"filter"}>
            <label>{t("filters.type.label")}</label>
            <Radio
              options={[
                { value: undefined, label: t("filters.type.all") },
                { value: "sail", label: t("filters.type.sail") },
                { value: "motor", label: t("filters.type.motor") },
              ]}
              currentOption={filter.category}
              onClick={(value) => {
                setFilter({ ...filter, category: value });
                setMaxListing(12);
              }}
            />
          </div>
          <Select
            label={t("filters.year")}
            options={[
              { value: undefined, label: t("filters.any") },
              ...Array.from(new Set(data.map((yacht) => yacht.yearBuilt))).map(
                (year) => ({ value: year, label: year.toString() }),
              ),
            ]}
            currentOption={filter.year}
            onChange={(value) => {
              setFilter({ ...filter, year: value });
              setMaxListing(12);
            }}
          />
        </div>
        <div className={"filter-column"}>
          <div className={"filter"}>
            <label>{t("filters.length", { unit: units.length })}</label>
            <Range
              min={Math.min(...data.map((yacht) => yacht.length))}
              max={Math.max(...data.map((yacht) => yacht.length))}
              step={0.5}
              onChange={(value) => setFilter({ ...filter, length: value })}
              dataType={"length"}
            />
          </div>
          <Select
            label={t("filters.builder")}
            options={[
              { value: undefined, label: t("filters.any") },
              ...Array.from(new Set(data.map((yacht) => yacht.builder))).map(
                (builder) => ({ value: builder, label: builder }),
              ),
            ]}
            currentOption={filter.builder}
            onChange={(value) => {
              setFilter({ ...filter, builder: value });
              setMaxListing(12);
            }}
          />
        </div>
        <div className={"filter-column"}>
          <div className={"filter"}>
            <label>{t("filters.price")}</label>
            <Range
              min={Math.min(...data.map((yacht) => yacht.price))}
              max={Math.max(...data.map((yacht) => yacht.price))}
              step={10000}
              onChange={(value) => setFilter({ ...filter, price: value })}
              dataType={"price"}
            />
          </div>
          <Select
            label={t("filters.sleeps")}
            options={[
              { value: undefined, label: t("filters.any") },
              ...Array.from(new Set(data.map((yacht) => yacht.sleeps))).map(
                (sleeps) => ({ value: sleeps, label: sleeps.toString() }),
              ),
            ]}
            currentOption={filter.sleeps}
            onChange={(value) => {
              setFilter({ ...filter, sleeps: value });
            }}
          />
        </div>
        <div className={"filter-column"}>
          <Select
            label={t("filters.name.label")}
            options={[
              { value: undefined, label: t("filters.name.all") },
              ...Array.from(new Set(data.map((yacht) => yacht.name))).map(
                (name) => ({
                  value: name,
                  label: name,
                }),
              ),
            ]}
            currentOption={filter.name}
            onChange={(value) => {
              setFilter({ ...filter, name: value });
            }}
          />
          <button
            className={
              "w-full h-[3vh] glass-button glass-button-dark flex justify-center items-center z-0 group"
            }
            onClick={() =>
              setFilter({
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
              })
            }
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              viewBox="0 0 64 64"
              className={
                "lg:size-[1.5vw] size-[1.5rem] lg:group-hover:rotate-90 transition-transform duration-200 ease-in-out"
              }
            >
              <path d="M 16 14 C 15.488 14 14.976938 14.194937 14.585938 14.585938 C 13.804937 15.366937 13.804937 16.633063 14.585938 17.414062 L 29.171875 32 L 14.585938 46.585938 C 13.804938 47.366938 13.804937 48.633063 14.585938 49.414062 C 14.976937 49.805062 15.488 50 16 50 C 16.512 50 17.023062 49.805062 17.414062 49.414062 L 32 34.828125 L 46.585938 49.414062 C 47.366938 50.195063 48.633063 50.195062 49.414062 49.414062 C 50.195063 48.633062 50.195062 47.366937 49.414062 46.585938 L 34.828125 32 L 49.414062 17.414062 C 50.195063 16.633063 50.195062 15.366938 49.414062 14.585938 C 48.633062 13.804938 47.366937 13.804938 46.585938 14.585938 L 32 29.171875 L 17.414062 14.585938 C 17.023062 14.194938 16.512 14 16 14 z"></path>
            </svg>
            <label className={"cursor-pointer"}>{t("filters.clear")}</label>
          </button>
        </div>
        <div className={"w-full md:w-[20vw] flex justify-between items-center"}>
          <ListingModifier
            label={t("filters.currency")}
            options={[
              { value: "EUR", label: "€ eur" },
              { value: "USD", label: "$ usd" },
              { value: "GBP", label: "£ gbp" },
              { value: "JPY", label: "¥ jpy" },
            ]}
            onChange={(value) => changeCurrency(value)}
          />
          <ListingModifier
            label={t("filters.sort.label")}
            options={[
              { value: "priceAsc", label: t("filters.sort.price-asc") },
              { value: "priceDesc", label: t("filters.sort.price-desc") },
              { value: "lengthAsc", label: t("filters.sort.length-asc") },
              { value: "lengthDesc", label: t("filters.sort.length-desc") },
              { value: "yearAsc", label: t("filters.sort.year-asc") },
              { value: "yearDesc", label: t("filters.sort.year-desc") },
            ]}
            onChange={(value) => {
              switch (value) {
                case "priceAsc":
                  setFilteredData([...data.sort((a, b) => a.price - b.price)]);
                  break;
                case "priceDesc":
                  setFilteredData([...data.sort((a, b) => b.price - a.price)]);
                  break;
                case "lengthAsc":
                  setFilteredData([
                    ...data.sort((a, b) => a.length - b.length),
                  ]);
                  break;
                case "lengthDesc":
                  setFilteredData([
                    ...data.sort((a, b) => b.length - a.length),
                  ]);
                  break;
                case "yearAsc":
                  setFilteredData([
                    ...data.sort((a, b) => a.yearBuilt - b.yearBuilt),
                  ]);
                  break;
                case "yearDesc":
                  setFilteredData([
                    ...data.sort((a, b) => b.yearBuilt - a.yearBuilt),
                  ]);
                  break;
              }
            }}
          />
        </div>
      </div>
      <div
        className={
          "w-full px-[2vw] h-max flex justify-start items-baseline border-b-[0.25vh] border-rock-200"
        }
      >
        <ViewButton
          view={"global"}
          count={filteredData.length}
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
        className={`w-full px-[2vw] h-max flex flex-col justify-start items-center gap-[4vh] z-0`}
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
                {maxListing >= filteredData.length
                  ? t("end")
                  : t("listed", {
                      count: maxListing,
                      total: filteredData.length,
                    })}
              </p>
              {maxListing >= filteredData.length ? null : (
                <>
                  <div
                    className={
                      "w-[48vw] h-[0.25vh] bg-rock-300 [transition:_width_500ms_ease-in-out]"
                    }
                  >
                    <div
                      className={"h-full bg-black"}
                      style={{
                        width: `${(maxListing / filteredData.length) * 100}%`,
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
                const yacht = data.find((yacht) => yacht.id === bookmark);
                return <Card key={yacht!.id} data={yacht!} />;
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
