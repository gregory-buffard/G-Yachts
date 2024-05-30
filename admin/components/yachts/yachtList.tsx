"use client"
import {useState} from "react";
import {IYacht} from "@/types/yacht";
import {Button, ScrollShadow} from "@nextui-org/react";
import Manage from "@/components/yachts/manage";
import {removeYacht, saveYacht} from "@/actions/yachts";

const YachtList = ({data}: { data: IYacht[] }) => {
    const [yachts, setYachts] = useState<IYacht[]>(data);
    const [featured, setFeatured] = useState<boolean>(false);
    return (
        <>
            <div className={"w-fit flex flex-col"}>
                <h1 className={"ml-4 max-md:self-center mt-4"}>Liste des yachts</h1>
                <Button onClick={() => setFeatured(!featured)}
                        className={`mx-auto my-5 ${featured && "bg-amber-300"}`}>Featured <div className={"h-[60%]"}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        x="0px"
                        y="0px"
                        viewBox="0 0 72 72"
                        className={"size-full"}
                    >
                        <path
                            d="M 36 13 C 32.134 13 29 16.134 29 20 C 29 22.146277 29.967419 24.065556 31.488281 25.349609 L 26.412109 32.123047 C 26.113109 32.522047 25.565906 32.641391 25.128906 32.400391 L 20.908203 30.074219 C 20.962494 29.722905 21 29.366519 21 29 C 21 25.134 17.866 22 14 22 C 10.134 22 7 25.134 7 29 C 7 32.11539 9.0362443 34.752433 11.849609 35.660156 L 14.669922 46 L 57.330078 46 L 60.150391 35.660156 C 62.963756 34.752433 65 32.11539 65 29 C 65 25.134 61.866 22 58 22 C 54.134 22 51 25.134 51 29 C 51 29.366519 51.037506 29.722905 51.091797 30.074219 L 46.871094 32.400391 C 46.434094 32.641391 45.888844 32.522047 45.589844 32.123047 L 40.511719 25.349609 C 42.032581 24.065556 43 22.146277 43 20 C 43 16.134 39.866 13 36 13 z M 15.769531 50 L 16.140625 51.369141 C 17.200625 55.269141 20.770312 58 24.820312 58 L 47.179688 58 C 51.229687 58 54.799375 55.269141 55.859375 51.369141 L 56.230469 50 L 15.769531 50 z"></path>
                    </svg>
                </div></Button>
            </div>
            <ScrollShadow
                hideScrollBar={true}
                className={
                    "w-3/4 max-h-[80vh] max-sm:w-[98%] max-md:self-center flex flex-col items-center"
                }
            >
                {yachts.length > 0 && yachts.map((yacht: IYacht, i: number) => {
                    if (featured && !yacht.featured) return null;
                    return (
                        <Manage key={i} setYachts={setYachts} data={yacht} removeYachts={removeYacht} saveYachts={saveYacht}/>
                    );

                })}
            </ScrollShadow>
        </>
    );
}

export default YachtList;