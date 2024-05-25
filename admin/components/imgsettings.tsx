import {Button, Modal, ModalBody, ModalContent, useDisclosure} from "@nextui-org/react";
import {ModalHeader} from "@nextui-org/modal";
import {useEffect, useState} from "react";
import axios from "axios";
import {fetchFeatured, fetchYacht} from "@/actions/yachts";

const ImgSettings = ({yacht}: { yacht: any }) => {
    const {isOpen, onOpen, onClose} = useDisclosure();
    const [images, setImages] = useState<any>([]);
    const [data, setData] = useState<any>([]);




    return (
        <div className={"w-fit"}>
            <Button
                isIconOnly={true}
                variant={"light"}
                onClick={() => {
                    onOpen()
                    //fetch
                }
                }
            >
                <div className={"w-[25px] self-center h-[25px]"}>
                    <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 122.88 98.27">
                        <path
                            d="M4.84,27.31H90.76a4.77,4.77,0,0,1,3.4,1.41,4.84,4.84,0,0,1,1.41,3.4V93.47a4.75,4.75,0,0,1-1.41,3.39,1.36,1.36,0,0,1-.25.22,4.67,4.67,0,0,1-3.18,1.19H4.81A4.81,4.81,0,0,1,0,93.47V32.12a4.77,4.77,0,0,1,1.41-3.4,4.83,4.83,0,0,1,3.4-1.41ZM32.15,0h85.92a4.77,4.77,0,0,1,3.4,1.41,4.84,4.84,0,0,1,1.41,3.4V66.16a4.75,4.75,0,0,1-1.41,3.39,1.09,1.09,0,0,1-.25.22A4.67,4.67,0,0,1,118,71h-5.38V65.22h4.51V5.71H33.06v4.2H27.31V4.81a4.77,4.77,0,0,1,1.41-3.4A4.84,4.84,0,0,1,32.12,0ZM18.5,13.66h85.92a4.75,4.75,0,0,1,3.39,1.41,4.8,4.8,0,0,1,1.41,3.39V79.81a4.77,4.77,0,0,1-1.41,3.4,1.4,1.4,0,0,1-.25.22,4.67,4.67,0,0,1-3.18,1.19H99V78.88h4.51V19.37H19.4v4.2H13.65V18.46a4.81,4.81,0,0,1,4.81-4.8ZM24.68,44a6.9,6.9,0,1,1-6.89,6.89A6.89,6.89,0,0,1,24.68,44Zm29,29.59L67.49,49.71,82.14,86.77H13.77V82.18l5.74-.29,5.75-14.08,2.87,10.06h8.62l7.47-19.25L53.7,73.56ZM89.86,33H5.75V92.53H89.86V33Z"/>
                    </svg>
                </div>

            </Button>
            <Modal
                className={"h-[80%]"}
                size={"4xl"}
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalContent>
                    <ModalHeader>Image Settings</ModalHeader>
                    <ModalBody>

                    </ModalBody>
                </ModalContent>
            </Modal>
        </div>
    )
}

export default ImgSettings;