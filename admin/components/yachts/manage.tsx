"use client";

import Link from "next/link";
import {IYacht} from "@/types/yacht";
import {ObjectId} from "mongoose";
import {
    Button,
    Chip, Image,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ScrollShadow,
    useDisclosure
} from "@nextui-org/react";
import Lottie, {LottieRefCurrentProps} from "lottie-react";
import {flatten} from "lottie-colorify";
import context from "@/public/assets/UI/context.json";
import {useRef, useState} from "react";
import {ModalHeader} from "@nextui-org/modal";
import Gallery from "@/components/yachts/gallery";
import {fetchYacht, removeYacht, saveYacht} from "@/actions/yachts";
import {object} from "prop-types";
import {useYacht} from "@/context/yacht";
import {BooleanLine, ClassicLine, NumberLine} from "@/components/yachts/manageLines";
import {Input} from "@nextui-org/input";
import Crown from "@/components/Crown";
import ImgSettings from "@/components/imgsettings";

interface IManage
    extends Pick<
        IYacht,
        "name" | "price" | "builder" | "yearBuilt" | "featured"
    > {
    _id: string;
}


const RemoveBtn = ({onClick}: { onClick: () => void }) => {
    const {isOpen, onOpen, onClose} = useDisclosure();
    return (
        <>
            <Button variant={"light"} color={"danger"} onClick={() => onOpen()}>Remove</Button>
            <Modal
                isOpen={isOpen}
                onClose={onClose}
                size={"xs"}>
                <ModalContent>
                    <ModalHeader>Are you sure?</ModalHeader>
                    <ModalBody>
                        <p>The removal is permanent</p>
                        <Button variant={"light"} color={"danger"} onClick={() => {
                            onClick()
                            onClose()
                        }}>Yes</Button>
                        <Button variant={"light"} color={"default"} onClick={onClose}>No</Button>
                    </ModalBody>
                </ModalContent>
            </Modal></>
    )
}

const Manage = ({data}: { data: IManage }) => {
    const contextRef = useRef<LottieRefCurrentProps>(null);
    const {isOpen, onOpen, onClose} = useDisclosure();
    const [yacht, setYacht] = useState<IYacht | null>(null);
    const [find, setFind] = useState<string>("");

    return (
        <div
            className={
                "w-full h-100px min-w-[300px] px-[4vw] py-[0.5vh] justify-between flex items-center bg-neutral-200 mt-5 mb-2 rounded-2xl"
            }
        >
            <div className={"flex flex-row justify-start items-center gap-4"}>
                <p>{`${data.name}`}</p>
                {data.featured && <Crown/>}
            </div>
            <Modal
                className={"h-[80%]"}
                size={"4xl"}
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalContent>
                    {yacht && <>
                        <ModalHeader className={"gap-6"}><h1>{yacht.name}</h1>{yacht.featured && <Crown/>}
                            <Input value={find} className={"w-[30%] absolute right-[13%]"} placeholder={"Find"}
                                   onValueChange={setFind}/>
                        </ModalHeader>
                        <ModalBody className={"h-[50%]"}>
                            <ScrollShadow className={"w-full h-full"}>
                                {Object.entries(yacht).map(([key, value], i) => {
                                        if (!key.toLowerCase().includes(find.toLowerCase()) && find !== "") return null;


                                        if (typeof value === "object") {
                                            return (
                                                <></>
                                            );
                                        } else if (typeof value === "boolean") {
                                            return (
                                                <BooleanLine key={i} name={key} value={value}
                                                             setYacht={(e: boolean) => setYacht({...yacht, [key]: e})}/>
                                            );
                                        } else if (typeof value === "string") {
                                            return (
                                                <ClassicLine key={i} name={key} value={value}
                                                             setYacht={(e: string) => setYacht({...yacht, [key]: e})}/>
                                            );
                                        } else if (typeof value === "number") {
                                            return (
                                                <NumberLine key={i} name={key} value={value}
                                                            setYacht={(e: any) => setYacht({...yacht, [key]: e})}/>
                                            );
                                        }
                                    }
                                )}
                            </ScrollShadow>
                        </ModalBody>
                        <ModalFooter>
                            <a className={"absolute left-5"} target="_blank" rel="noopener noreferrer"
                               href={`http://51.75.16.185/en/yacht/${data._id}`}>
                                <Button
                                    variant={"light"}
                                >
                                    View
                                </Button>
                            </a>
                            <Button variant={"light"} color={"success"} onClick={
                                () => {
                                    saveYacht(yacht)
                                    onClose()
                                }
                            }>Save</Button>
                            <RemoveBtn onClick={() => {
                                onClose()
                                removeYacht(data._id)
                            }}/>
                        </ModalFooter>
                    </>}
                </ModalContent>
            </Modal>
            <div className={"w-fit h-full flex "}>
                <Button
                    className={""}
                    isIconOnly={true}
                    variant={"light"}
                    onMouseEnter={() => {
                        const ref = contextRef.current!;
                        ref.setSpeed(2);
                        ref.play();
                        setTimeout(() => ref.stop(), 600);
                    }}
                    onClick={() => {
                        onOpen()
                        fetchYacht(data._id).then((yacht) => setYacht(yacht));
                    }
                    }
                >
                    <Lottie
                        lottieRef={contextRef}
                        loop={false}
                        autoplay={false}
                        animationData={flatten([115, 115, 115], context)}
                        className={"size-[1.5rem]"}
                    />
                </Button>
                <ImgSettings yacht={data}/>
            </div>
        </div>
    );
};

export default Manage;
