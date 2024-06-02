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
import { GiHamburgerMenu, GiPalmTree } from "react-icons/gi";
import { useState } from "react";

const navItems: { icon: IconType; id: NavActive; title: string }[] = [
    {
        icon: FaHome,
        id: "dashboard",
        title: "Dashboard"
    },
    {
        icon: IoMdBoat,
        id: "yachts",
        title: "Yachts"
    },
    {
        icon: FaArrowsSpin,
        id: "charters",
        title: "Charters"
    },
    {
        icon: GiPalmTree,
        id: "destinations",
        title: "Destinations",
    },
    {
        icon: FaPlus,
        id: "new",
        title: "New"
    },
    {
        icon: RiMegaphoneFill,
        id: "newsletter",
        title: "Newsletters"
    },
    {
        icon: FaNewspaper,
        id: "article",
        title: "Articles"
    },
    {
        icon: FaMessage,
        id: "messages",
        title: "Customer messages"
    },
];

const Selector = ({
    active,
    id,
    Icon,
    onSetActive,
    title,
}: {
    active: NavActive;
    id: NavActive;
    Icon: IconType;
    onSetActive: (id: NavActive) => void;
    title?: string;
}) => {
    return (
        <Button
            isIconOnly={true}
            variant={"shadow"}
            onPress={() => {
                onSetActive(id);
            }}
            className={twMerge([
                "lg:size-[4vh] w-full text-left fill-neutral-100 align-middle text-neutral-800 px-5 rounded-2xl",
                active === id ? "bg-primary-500" : "bg-neutral-400/35",
            ])}
        >
            <div className="flex flex-row gap-2">
                <Icon
                    className={twMerge([
                        active === id ? "text-white" : "text-neutral-700",
                    ])}
                    fontSize={25}
                />
                {
                    title && (
                        <span
                            className={twMerge([
                                "text-sm h-fit",
                                active === id ? "text-white" : "text-neutral-700",
                            ])}
                        >
                            {title}
                        </span>
                    )}
            </div>
        </Button>
    );
};

const Nav = () => {
    const { active, setActive } = useViewContext();

    const [mobileOpen, setMobileOpen] = useState<boolean>(false);
    const toggleMobileOpen = () => setMobileOpen(!mobileOpen);

    return (
        <>
            <nav
                className={
                    "fixed bottom-[4vh] z-50 w-full flex justify-center items-center"
                }
            >
                <div className="lg:hidden flex justify-between items-center w-full px-4">
                    <Button isIconOnly={true} variant={"shadow"} onPress={toggleMobileOpen}>
                        <GiHamburgerMenu fontSize={25} />
                    </Button>
                </div>

                <div className={twMerge([
                    "lg:hidden fixed top-0 right-0 w-[250px] h-screen z-[1000] bg-white cursor-pointer transition-transform duration-300 ease-in-out",
                    mobileOpen ? "translate-x-0" : "translate-x-full"
                ])}>
                    <div className="flex flex-col items-start p-4">
                        <Button isIconOnly={true} variant={"shadow"} onPress={toggleMobileOpen}>
                            <GiHamburgerMenu fontSize={25} />
                        </Button>
                        <div className="mt-8 flex flex-col gap-4">
                            {navItems.map(item => (
                                <Selector
                                    key={item.id}
                                    active={active}
                                    onSetActive={(id) => {
                                        setActive(id);
                                        toggleMobileOpen();
                                    }}
                                    id={item.id}
                                    Icon={item.icon}
                                    title={item.title}
                                />
                            ))}
                        </div>
                    </div>
                </div>

                <div
                    className={
                        "bg-neutral-300/50 lg:flex hidden border-neutral-300/25 border-[0.25vh] backdrop-blur-2xl px-[2vw] py-[1vh] rounded-3xl justify-center items-center gap-8"
                    }
                >
                    {navItems.map(item => (
                        <Selector
                            key={item.id}
                            active={active}
                            onSetActive={setActive}
                            id={item.id}
                            Icon={item.icon}
                        />
                    ))}
                </div>
            </nav>
        </>
    );
};

export default Nav;
