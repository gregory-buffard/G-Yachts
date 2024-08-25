"use client";

import { type IShipyard } from "@/types/shipyard";
import { clsx } from "clsx";
import Image from "next/image";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/navigation";

const Shipyards = ({ data }: { data: IShipyard[] }) => {
  const [current, setCurrent] = useState<string | null>(null);
  const t = useTranslations("partners.detail");
  return (
    <div className="flex flex-col w-full">
      <h3 className="font-slick mt-8">Shipyards:</h3>
      <div className="flex flex-row flex-wrap mb-14 mt-2">
        {data.map((shipyard, index) => (
          <div
            key={shipyard.id}
            onClick={
              current !== shipyard.id
                ? () => setCurrent(shipyard.id)
                : () => setCurrent(null)
            }
            className={clsx(
              "flex flex-col bg-center bg-cover h-80 text-white hover:shadow-xl transition-all duration-500 overflow-hidden",
              {
                "w-1/2 lg:w-1/4": current === null,
                "w-full h-auto": current !== null && current === shipyard.id,
                "w-0 h-0": current !== null && current !== shipyard.id,
              },
            )}
            style={{
              backgroundImage: `url(${encodeURI(shipyard.banner.sizes.fhd.url)}), linear-gradient(to bottom right, #74ebd5, #acb6e5)`,
            }}
          >
            {current === shipyard.id ? (
              <div className="w-full bg-black/50 flex flex-col items-start px-20 py-20">
                <div className="flex flex-row justify-between w-full">
                  <Image
                    src={encodeURI(shipyard.logo.sizes.thumbnail.url)}
                    alt={shipyard.logo.alt}
                    width={shipyard.logo.sizes.thumbnail.width}
                    height={shipyard.logo.sizes.thumbnail.height}
                    className={"object-contain w-[16vh]"}
                  />
                  <button type={"button"}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      x="0px"
                      y="0px"
                      viewBox="0 0 64 64"
                      className={
                        "lg:size-[1.5vw] size-[3vh] hover:rotate-90 transition-transform duration-200 ease-in-out fill-white"
                      }
                    >
                      <path d="M 16 14 C 15.488 14 14.976938 14.194937 14.585938 14.585938 C 13.804937 15.366937 13.804937 16.633063 14.585938 17.414062 L 29.171875 32 L 14.585938 46.585938 C 13.804938 47.366938 13.804937 48.633063 14.585938 49.414062 C 14.976937 49.805062 15.488 50 16 50 C 16.512 50 17.023062 49.805062 17.414062 49.414062 L 32 34.828125 L 46.585938 49.414062 C 47.366938 50.195063 48.633063 50.195062 49.414062 49.414062 C 50.195063 48.633062 50.195062 47.366937 49.414062 46.585938 L 34.828125 32 L 49.414062 17.414062 C 50.195063 16.633063 50.195062 15.366938 49.414062 14.585938 C 48.633062 13.804938 47.366937 13.804938 46.585938 14.585938 L 32 29.171875 L 17.414062 14.585938 C 17.023062 14.194938 16.512 14 16 14 z"></path>
                    </svg>
                  </button>
                </div>
                <span className="text-white font-classic mt-10">
                  {shipyard.quote}
                </span>
                {shipyard.website && (
                  <div className="flex flex-row items-center gap-2">
                    <a
                      className="glass-button glass-button-light mt-10"
                      href={shipyard.website}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {t("website")}
                    </a>
                    <Link
                      href={{
                        pathname: `/new-constructions`,
                        query: {
                          builder: shipyard.name,
                        },
                      }}
                      className="glass-button glass-button-light mt-10"
                      rel="noreferrer"
                    >
                      {t("allProjects")}
                    </Link>
                  </div>
                )}
              </div>
            ) : (
              <div className="w-full h-full bg-black/50 p-4 grid place-items-center hover:bg-black/25 transition-colors">
                <Image
                  src={encodeURI(shipyard.logo.sizes.thumbnail.url)}
                  alt={shipyard.logo.alt}
                  width={shipyard.logo.sizes.thumbnail.width}
                  height={shipyard.logo.sizes.thumbnail.height}
                  className={"object-contain w-[16vh]"}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Shipyards;
