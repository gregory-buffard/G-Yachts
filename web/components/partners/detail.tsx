import { Link } from "@/navigation";
import { IPartner } from "@/types/partner";
import { useTranslations } from "next-intl";

const PartnerDetail = ({ data }: { data: IPartner }) => {
    const t = useTranslations("partners.detail");
    return (
        <div className="w-full flex flex-col justify-start items-center py-16 md:px-20">
            <h4 className="text-lg text-center text-sky-950 font-slick">"{data.quote}"</h4>

            <div
                className="w-full flex flex-col my-16 bg-center bg-cover md:w-3/4 lg:w-2/3"
                style={{
                    backgroundImage: `url(${data.banner.sizes.fhd.url ?? data.banner.url}), linear-gradient(to bottom right, #74ebd5, #acb6e5)`,
                }}>
                <div className="w-full bg-black/50 flex flex-col items-start px-20 py-14">
                    <img
                        src={data.logo.sizes.thumbnail.url ?? data.logo.url}
                        alt={data.logo.alt ?? data.name}
                        className="object-contain w-60"
                    />
                    <span className="text-white font-classic mt-10">{data.comment}</span>
                    {data.website && (
                        <a className="glass-button glass-button-light mt-10" href={data.website} target="_blank" rel="noreferrer">
                            {t("website")}
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PartnerDetail;
