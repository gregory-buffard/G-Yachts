"use client";

import { type IPartner } from "@/types/partner";
import { clsx } from "clsx";
import Image from "next/image";
import { useState } from "react";
import { useTranslations } from "next-intl";

const Listing = ({ data }: { data: IPartner[] }) => {
    const [current, setCurrent] = useState<string | null>(null);
    const t = useTranslations("partners.detail");
    return (
        <div className="flex flex-col w-full">
            <h4 className="text-xl text-center text-sky-950 font-slick mt-14 normal-case">
                {`"${t("quote")}"`}
            </h4>
            <div className="flex flex-row flex-wrap my-14">
                {data.map((partner, index) => (
                    <div
                        key={partner.id}
                        onClick={
                            current !== partner.id
                                ? () => setCurrent(partner.id)
                                : () => setCurrent(null)
                        }
                        className={clsx(
                            "flex flex-col bg-center bg-cover h-80 text-white hover:shadow-xl transition-all duration-500 overflow-hidden",
                            {
                                "w-1/4": current === null,
                                "w-full h-auto": current !== null && current === partner.id,
                                "w-0": current !== null && current !== partner.id,
                            }
                        )}
                        style={{
                            backgroundImage: `url(${partner.banner.sizes.fhd.url ?? partner.banner.url}), linear-gradient(to bottom right, #74ebd5, #acb6e5)`,
                        }}>
                        {current === partner.id ? (
                            <div className="w-full bg-black/50 flex flex-col items-start px-20 py-20">
                                <div className="flex flex-row justify-between w-full">
                                    <img
                                        src={partner.logo.sizes.thumbnail.url ?? partner.logo.url}
                                        alt={partner.logo.alt ?? partner.name}
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
                                    {partner.comment}
                                </span>
                                {partner.website && (
                                    <a
                                        className="glass-button glass-button-light mt-10"
                                        href={partner.website}
                                        target="_blank"
                                        rel="noreferrer">
                                        {t("website")}
                                    </a>
                                )}
                            </div>
                        ) : (
                            <div className="w-full h-full bg-black/50 p-4 grid place-items-center hover:bg-black/25 transition-colors">
                                <Image
                                    src={partner.logo.sizes.thumbnail.url ?? partner.logo.url}
                                    alt={partner.logo.alt ?? partner.name}
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

export default Listing;
