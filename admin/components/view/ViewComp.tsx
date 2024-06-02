"use client";

import { useViewContext } from "@/context/view";
import { ReactNode } from "react";

const ViewComp = ({ comps }: {
    comps: {
        newsletter: ReactNode,
        dashboard: ReactNode,
        yachts: ReactNode,
        article: ReactNode,
        new: ReactNode,
        charters: ReactNode,
        destinations: ReactNode,
        messages: ReactNode
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