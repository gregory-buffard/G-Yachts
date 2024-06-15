import {IDestination} from "@/types/destination";
import {useState} from "react";
import {Button, Image, Modal, ModalBody, ModalContent, ScrollShadow} from "@nextui-org/react";
import {ModalHeader} from "@nextui-org/modal";
import UploadButton from "@/components/destinations/fileUpload";

const ImgDestinationSettingsModal = ({data, replace, onClose, isOpen}: {
    data: IDestination,
    replace: any,
    onClose: any,
    isOpen: boolean
}) => {
    const [images, setImages] = useState<IDestination["photos"]>(data.photos);


    return (
        <Modal
            className={"h-[80%]"}
            size={"4xl"}
            isOpen={isOpen}
            onClose={onClose}
        >
            <ModalContent>
                <ModalHeader>
                    <h2 className={"self-center"}>Image Settings</h2>
                </ModalHeader>
                <ModalBody className={"flex flex-row justify-around "}>
                    <div className={"w-full gap-5 h-fit flex flex-wrap flex-row"}>
                        <p className={"self-center"}>Featured</p>
                        <div className={"relative w-[150px] group h-[150px]"}>
                            <Image src={images.featured} alt={"image"}
                                   className={"w-[150px] h-[150px] object-center object-cover"}/>
                            <div
                                className={"w-[150px] z-20 h-[150px] hidden rounded-xl group-hover:flex bg-black/40 absolute top-0"}>
                                <div className={"w-full h-30% self-center flex flex-row justify-around"}>
                                    <UploadButton id={data._id} name={"featured"} setImages={setImages}/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={"w-full gap-5 h-fit flex flex-wrap flex-row"}>
                        <p className={"self-center"}>destinationPhoto</p>
                        <div className={"relative w-[150px] group h-[150px]"}>
                            <Image src={images.destinationPhoto} alt={"image"}
                                   className={"w-[150px] h-[150px] object-center object-cover"}/>
                            <div
                                className={"w-[150px] z-20 h-[150px] hidden rounded-xl group-hover:flex bg-black/40 absolute top-0"}>
                                <div className={"w-full h-30% self-center flex flex-row justify-around"}>
                                    <UploadButton id={data._id} name={"destinationPhoto"} setImages={setImages}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}

export default ImgDestinationSettingsModal;