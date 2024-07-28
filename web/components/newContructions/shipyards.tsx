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
                            }
                        )}
                        style={{
                            backgroundImage: `url(${shipyard.banner.sizes.fhd.url ?? shipyard.banner.url}), linear-gradient(to bottom right, #74ebd5, #acb6e5)`,
                        }}>
                        {current === shipyard.id ? (
                            <div className="w-full bg-black/50 flex flex-col items-start px-20 py-20">
                                <div className="flex flex-row justify-between w-full">
                                    <img
                                        src={shipyard.logo.sizes.thumbnail.url ?? shipyard.logo.url}
                                        alt={shipyard.logo.alt ?? shipyard.name}
                                        className="object-contain w-60"
                                    />
                                    <img
                                        src="/icons/xmark.svg"
                                        alt="close"
                                        className="w-8 h-8 fill-white cursor-pointer hover:brightness-90"
                                        onClick={() => setCurrent(null)}
                                    />
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
                                            rel="noreferrer">
                                            {t("website")}
                                        </a>
                                        <Link
                                            href={{
                                                pathname: `/new-constructions`,
                                                query: {
                                                    builder: shipyard.name
                                                }
                                            }}
                                            className="glass-button glass-button-light mt-10"
                                            rel="noreferrer">
                                            {t("allProjects")}
                                        </Link>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="w-full h-full bg-black/50 p-4 grid place-items-center hover:bg-black/25 transition-colors">
                                <Image
                                    src={shipyard.logo.sizes.thumbnail.url ?? shipyard.logo.url}
                                    alt={shipyard.logo.alt ?? shipyard.name}
                                    width={150}
                                    height={150}
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
