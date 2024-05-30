"use client";

import addnew from "@/public/addNew.webp";
import {Medium} from "@/components/widgetsProviders";
import {useViewContext} from "@/context/view";

const AddNew = () => {
    const {setActive} = useViewContext();
    return (
        <Medium
            onClick={() => {setActive("new")} }
            name={"Add new"}
            className={"overflow-hidden shadow-inner bg-neutral-200 group"}
        >
            <div
                className={
                    "w-full h-[44vw] lg:h-[16vw] bg-cover bg-center rounded-3xl flex justify-start items-start py-[2vw] lg:py-[1vw] px-[2vw] lg:px-[1vw]"
                }
                style={{
                    backgroundImage: `url(${addnew.src})`,
                }}
            >
            </div>
        </Medium>
    )
}
export default AddNew;