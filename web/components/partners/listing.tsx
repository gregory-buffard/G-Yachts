"use client";

import { type IPartner } from "@/types/partner";
import { Link } from "@/navigation";
import Image from "next/image";

const Listing = ({ data }: { data: IPartner[] }) => {
    return (
        <div className="w-full flex flex-col justify-start items-center py-5">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 w-full my-10">
                {data.map((partner, index) => (
                    <Link
                        key={partner.id}
                        href={{
                            pathname: "/partners/[id]",
                            params: { id: partner.id },
                        }}
                        className="flex flex-col bg-center bg-cover h-80 text-white uppercase cursor-pointer hover:shadow-xl transition-shadow duration-300"
                        style={{
                            backgroundImage: `url(${partner.banner.sizes.thumbnail.url ?? partner.banner.url}), linear-gradient(to bottom right, #74ebd5, #acb6e5)`,
                        }}>
                        <div className="w-full h-full bg-black/50 p-4 grid place-items-center hover:bg-black/25 transition-colors">
                            <Image
                                src={partner.logo.sizes.thumbnail.url ?? partner.logo.url}
                                alt={partner.logo.alt ?? partner.name}
                                width={150}
                                height={150}
                            />
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Listing;
