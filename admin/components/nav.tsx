"use client";

import { Button } from "@nextui-org/react";
import { NavActive, useViewContext } from "@/context/view";
import { IconType } from "react-icons";
import { twMerge } from "tailwind-merge";

import { FaMessage } from "react-icons/fa6";
import { IoMdBoat } from "react-icons/io";
import { FaHome } from "react-icons/fa";
import { FaArrowsSpin } from "react-icons/fa6";
import { FaNewspaper } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import { RiMegaphoneFill } from "react-icons/ri";
import { GiPalmTree } from "react-icons/gi";

const navItems: { icon: IconType; id: NavActive; }[] = [
    { icon: FaHome, id: "dashboard" },
    { icon: IoMdBoat, id: "yachts" },
    { icon: FaArrowsSpin, id: "charters" },
    { icon: GiPalmTree, id: "destinations" },
    { icon: FaPlus, id: "new" },
    { icon: RiMegaphoneFill, id: "newsletter" },
    { icon: FaNewspaper, id: "article" },
    { icon: FaMessage, id: "messages" },
];

const Selector = ({
    active,
    id,
    Icon,
    onSetActive
}: {
    active: NavActive;
    id: NavActive,
    Icon: IconType,
    onSetActive: (id: NavActive) => void;
}) => {
    return (
        <Button
            isIconOnly={true}
            variant={"shadow"}
            onPress={() => {
                onSetActive(id);
            }}
            className={twMerge([
                "size-[4vh] fill-neutral-100 text-neutral-800 p-[0.5vh] rounded-2xl",
                active === id ? "bg-primary-500" : "bg-neutral-300/50"
            ])}
        >
            {<Icon
                className={twMerge([
                    active === id ? "text-white" : "text-neutral-700"
                ])}
                fontSize={25}
            />}
        </Button>
    );
};

const Nav = () => {
    const { active, setActive } = useViewContext();

    return (
        <nav
            className={
                "fixed bottom-[4vh] z-50 w-full flex justify-center items-center"
            }
        >
            <div
                className={
                    "bg-neutral-300/50 border-neutral-300/25 border-[0.25vh] backdrop-blur-2xl px-[2vw] py-[1vh] rounded-3xl flex justify-center items-center gap-8"
                }
            >
                {navItems.map(item => (
                    <Selector
                        active={active}
                        onSetActive={setActive}
                        id={item.id}
                        Icon={item.icon}
                    />
                ))}
            </div>
        </nav>
    );
};

export default Nav;
