"use client";
import {useViewContext} from "@/context/view";
import Dashboard from "@/components/dashboard/dashboard";
import Yachts from "@/components/yachts/yachts";
import New from "@/components/yachts/new";
import Charter from "@/components/charters/charter";
import { ReactNode } from "react";

const ViewComp = ({comps}:{comps:{newsletter: ReactNode,dashboard:ReactNode,yachts:ReactNode, new:ReactNode , charters:ReactNode, destinations:ReactNode}}) => {
    const { active } = useViewContext();

    return (
        <div className="w-full h-full flex justify-center items-center bg-gray-100">
            {comps[active]}
        </div>
    );
}

export default ViewComp;