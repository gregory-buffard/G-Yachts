"use server";

import IBrokers from "@/types/brokers";
import Image from "next/image";
import flags from "@/data/langs.json";
import codes from "@/data/CountryCodes.json";

const Brokerino = ({ brokerino }: { brokerino: IBrokers }) => (
    <div
        className={"w-full md:w-[28vh] flex flex-col justify-between items-start"}
    >
        <div
            className={"flex flex-col justify-start items-stretch gap-[1vh] w-full"}
        >
            <Image
                src={brokerino.picture?.sizes.fhd.url || "/icons/user.svg"}
                width={brokerino.picture?.sizes.fhd.width || 128}
                height={brokerino.picture?.sizes.fhd.height || 128}
                alt={brokerino.picture?.alt || `${brokerino.name}'s picture`}
                className={`object-cover object-center w-[80vw] md:h-[28vh] md:w-[28vh] ${!brokerino.picture && "animate-pulse"}`}
            />
            <div className={"w-full flex flex-col justify-between items-start"}>
                <div className={"w-full flex justify-between items-start"}>
                    <h3
                        className={
                            "font-medium text-2xl whitespace-break-spaces hidden md:block"
                        }
                    >
                        {brokerino.name}
                    </h3>
                    <div
                        className={
                            "w-full flex flex-col justify-start items-start md:hidden"
                        }
                    >
                        <h3 className={"font-medium text-2xl whitespace-break-spaces"}>
                            {brokerino.name}
                        </h3>
                        <p className={"uppercase"}>{brokerino.position}</p>
                        {brokerino.phones.map((phone) => {
                            const prefix = phone.prefix.replace(/^./, "+");
                            const country = codes.find((code) => code.dial_code === prefix);
                            const code = country ? country.code : "";
                            return (
                                <p
                                    key={phone.number}
                                    className={"text-rock-500"}
                                >{`${code}: ${prefix} ${phone.number}`}</p>
                            );
                        })}
                        <a href={`mailto:${brokerino.email}`} className={"text-rock-500"}>
                            <p className={"break-words"}>{brokerino.email}</p>
                        </a>
                        <div className={"flex flex-wrap gap-[0.5vw] text-rock-500"}>
                            {brokerino.langs.map((lang, i) => {
                                const flag = flags.find((flag) => flag.name === lang);
                                return (
                                    flag && (
                                        <Image
                                            src={flag.path}
                                            alt={flag.name}
                                            width={48}
                                            height={48}
                                            className={"size-[1.75rem]"}
                                        />
                                    )
                                );
                            })}
                        </div>
                    </div>
                    <div
                        className={"flex justify-end items-center gap-[0.5vh] flex-wrap"}
                    >
                        {brokerino.socials.map((network) => {
                            const Icon = ({
                                              platform,
                                          }: {
                                platform: typeof network.platform;
                            }): JSX.Element => {
                                switch (platform) {
                                    case "WhatsApp":
                                        return (
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                x="0px"
                                                y="0px"
                                                viewBox="0 0 64 64"
                                                className={"size-[4vh] md:size-[3vh]"}
                                            >
                                                <path d="M 32 10 C 19.85 10 10 19.85 10 32 C 10 36.065 11.10725 39.869719 13.03125 43.136719 L 10.214844 53.683594 L 21.277344 51.208984 C 24.450344 52.983984 28.106 54 32 54 C 44.15 54 54 44.15 54 32 C 54 19.85 44.15 10 32 10 z M 32 14 C 41.941 14 50 22.059 50 32 C 50 41.941 41.941 50 32 50 C 28.269 50 24.803687 48.864875 21.929688 46.921875 L 15.791016 48.294922 L 17.353516 42.439453 C 15.250516 39.493453 14 35.896 14 32 C 14 22.059 22.059 14 32 14 z M 24.472656 21.736328 C 24.105656 21.736328 23.515672 21.871969 23.013672 22.417969 C 22.520672 22.964969 21.113281 24.278844 21.113281 26.964844 C 21.113281 29.640844 23.057078 32.23675 23.330078 32.59375 C 23.603078 32.96075 27.100531 38.639266 32.644531 40.822266 C 37.240531 42.632266 38.179547 42.273688 39.185547 42.179688 C 40.183547 42.093688 42.408328 40.866703 42.861328 39.595703 C 43.313328 38.323703 43.312875 37.232906 43.171875 37.003906 C 43.034875 36.781906 42.676859 36.644094 42.130859 36.371094 C 41.584859 36.097094 38.906297 34.777656 38.404297 34.597656 C 37.909297 34.417656 37.542547 34.323141 37.185547 34.869141 C 36.818547 35.415141 35.778125 36.643953 35.453125 37.001953 C 35.138125 37.368953 34.823344 37.411672 34.277344 37.138672 C 33.731344 36.865672 31.975531 36.292594 29.894531 34.433594 C 28.275531 32.992594 27.182188 31.208063 26.867188 30.664062 C 26.551188 30.119062 26.832469 29.821828 27.105469 29.548828 C 27.353469 29.310828 27.652781 28.916563 27.925781 28.601562 C 28.189781 28.277563 28.282891 28.056453 28.462891 27.689453 C 28.651891 27.332453 28.555922 27.007375 28.419922 26.734375 C 28.284922 26.460375 27.226234 23.765406 26.740234 22.691406 C 26.332234 21.787406 25.905672 21.760953 25.513672 21.751953 C 25.196672 21.735953 24.829656 21.736328 24.472656 21.736328 z"></path>
                                            </svg>
                                        );
                                    case "Facebook":
                                        return (
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                x="0px"
                                                y="0px"
                                                viewBox="0 0 64 64"
                                                className={"size-[4vh] md:size-[3vh]"}
                                            >
                                                <path d="M 23.773438 12 C 12.855437 12 12 12.854437 12 23.773438 L 12 40.226562 C 12 51.144563 12.855438 52 23.773438 52 L 40.226562 52 C 51.144563 52 52 51.145563 52 40.226562 L 52 23.773438 C 52 12.854437 51.145563 12 40.226562 12 L 23.773438 12 z M 21.167969 16 L 42.832031 16 C 47.625031 16 48 16.374969 48 21.167969 L 48 42.832031 C 48 47.625031 47.624031 48 42.832031 48 L 38.617188 48 L 38.617188 36.039062 L 43.353516 36.039062 L 44.099609 30.716797 L 38.617188 30.716797 C 38.617188 30.716797 38.609187 27.599266 38.617188 26.822266 C 38.633187 25.301266 39.904094 24.531969 40.996094 24.542969 C 42.088094 24.554969 44.349609 24.546875 44.349609 24.546875 L 44.349609 19.640625 C 44.349609 19.640625 42.391891 19.386234 40.337891 19.365234 C 38.611891 19.347234 36.705969 19.815234 35.167969 21.365234 C 33.602969 22.941234 33.356172 25.289203 33.326172 28.158203 C 33.317172 28.987203 33.326172 30.714844 33.326172 30.714844 L 28.691406 30.714844 L 28.691406 36.037109 L 33.326172 36.037109 L 33.326172 48 L 21.167969 48 C 16.374969 48 16 47.624031 16 42.832031 L 16 21.167969 C 16 16.374969 16.374969 16 21.167969 16 z"></path>
                                            </svg>
                                        );
                                    case "LinkedIn":
                                        return (
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                x="0px"
                                                y="0px"
                                                viewBox="0 0 64 64"
                                                className={"size-[4vh] md:size-[3vh]"}
                                            >
                                                <path d="M 23.773438 12 C 12.855437 12 12 12.854437 12 23.773438 L 12 40.226562 C 12 51.144563 12.855438 52 23.773438 52 L 40.226562 52 C 51.144563 52 52 51.145563 52 40.226562 L 52 23.773438 C 52 12.854437 51.145563 12 40.226562 12 L 23.773438 12 z M 21.167969 16 L 42.832031 16 C 47.625031 16 48 16.374969 48 21.167969 L 48 42.832031 C 48 47.625031 47.624031 48 42.832031 48 L 21.167969 48 C 16.374969 48 16 47.624031 16 42.832031 L 16 21.167969 C 16 16.374969 16.374969 16 21.167969 16 z M 22.501953 18.503906 C 20.872953 18.503906 19.552734 19.824172 19.552734 21.451172 C 19.552734 23.078172 20.871953 24.400391 22.501953 24.400391 C 24.126953 24.400391 25.447266 23.079172 25.447266 21.451172 C 25.447266 19.826172 24.126953 18.503906 22.501953 18.503906 z M 37.933594 26.322266 C 35.473594 26.322266 33.823437 27.672172 33.148438 28.951172 L 33.078125 28.951172 L 33.078125 26.728516 L 28.228516 26.728516 L 28.228516 43 L 33.28125 43 L 33.28125 34.949219 C 33.28125 32.826219 33.687359 30.771484 36.318359 30.771484 C 38.912359 30.771484 38.945312 33.200891 38.945312 35.087891 L 38.945312 43 L 44 43 L 44 34.074219 C 44 29.692219 43.054594 26.322266 37.933594 26.322266 z M 19.972656 26.728516 L 19.972656 43 L 25.029297 43 L 25.029297 26.728516 L 19.972656 26.728516 z"></path>
                                            </svg>
                                        );
                                    default:
                                        return <></>;
                                }
                            };

                            return (
                                <a
                                    key={network.platform}
                                    className={"h-max w-max"}
                                    href={network.link}
                                    target={"_blank"}
                                >
                                    <Icon platform={network.platform} />
                                </a>
                            );
                        })}
                    </div>
                </div>
                <p className={"uppercase hidden md:block"}>{brokerino.position}</p>
                <div
                    className={
                        "md:flex flex-col justify-end items-start h-max text-rock-500 hidden"
                    }
                >
                    {brokerino.phones.map((phone) => {
                        const prefix = phone.prefix.replace(/^./, "+");
                        const country = codes.find((code) => code.dial_code === prefix);
                        const code = country ? country.code : "";
                        return <p key={phone.number}>{`${prefix} ${phone.number}`}</p>;
                    })}
                    <a href={`mailto:${brokerino.email}`}>
                        <p className={"break-words"}>{brokerino.email}</p>
                    </a>
                    <div className={"flex flex-wrap gap-[0.5vw]"}>
                        {brokerino.langs.map((lang, i) => {
                            const flag = flags.find((flag) => flag.name === lang);
                            return (
                                flag && (
                                    <Image
                                        src={flag.path}
                                        alt={flag.name}
                                        width={48}
                                        height={48}
                                        className={"size-[1.5rem]"}
                                    />
                                )
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
        <a></a>
    </div>
);

export default Brokerino;