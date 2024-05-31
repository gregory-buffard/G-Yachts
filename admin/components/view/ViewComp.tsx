"use client";

import { useViewContext } from "@/context/view";
import { ReactNode } from "react";

const ViewComp = ({
    comps
}: {
    comps: {
        dashboard: ReactNode,
        yachts: ReactNode,
        new: ReactNode,
        charters: ReactNode,
        destinations: ReactNode,
        newsletter: ReactNode
    }
}) => {
    const { active } = useViewContext();

    return (
        <div className="w-full h-full flex justify-center items-center bg-gray-100">
            {comps[active]}
        </div>
    );
}

export default ViewComp;