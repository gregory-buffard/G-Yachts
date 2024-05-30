import {Button, Image, Modal, ModalBody, ModalContent, ScrollShadow} from "@nextui-org/react";
import {ModalHeader} from "@nextui-org/modal";
import {useEffect, useState} from "react";
import axios from "axios";
import Uploady from "@rpldy/uploady";
import UploadButton from "@rpldy/upload-button";
import {changeFeatured, getFeatured, getImages, removeYachtImage} from "@/actions/actions";


const ImgSettingsModal = ({isOpen, yacht, onClose,}: { isOpen: any, yacht: any, onClose: any }) => {
    const [images, setImages] = useState<string[]>([]);
    const [featured, setFeatured] = useState<string>("");
    useEffect(() => {

        getImages(yacht._id).then((data) => {
            setImages(data ? data : [])
        })
        getFeatured(yacht._id).then((data) => {
            setFeatured(data)
        })
    }, []);

    return (
        <Modal
            className={"h-[80%]"}
            size={"4xl"}
            isOpen={isOpen}
            onClose={onClose}
        >
            <ModalContent>
                <ModalHeader>Image Settings <Uploady destination={{ url: `${process.env.NEXT_PUBLIC_API}/yachts/images/${yacht._id}` }}>
                    <UploadButton/>
                </Uploady></ModalHeader>
                <ModalBody className={"flex flex-col "}>
                    <ScrollShadow className={"w-full gap-5 h-[70%] flex flex-wrap flex-row"}>
                        {images.length > 0 && images.map((image: any, i: number) => {
                            const regex = /[^/]+$/;
                            const imageName = image.match(regex)[0];
                            return (
                                <div key={i} className={"relative w-[150px] group h-[150px]"}>
                                    <Image src={image} alt={"image"}
                                           className={"w-[150px] h-[150px] object-center object-cover"}/>
                                    <div
                                        className={`top-2 left-2 fill-amber-500 absolute w-[30px] h-[30px] z-10 ${featured == imageName ? "" : "hidden"}`}>
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
                                    </div>
                                    <div
                                        className={"w-[150px] z-20 h-[150px] hidden rounded-xl group-hover:flex bg-black/40 absolute top-0"}>
                                        <div className={"w-full h-30% self-center flex flex-row justify-around"}>
                                            <Button variant={"light"}
                                                    onClick={() => {
                                                        setFeatured(imageName)
                                                        changeFeatured(yacht._id, imageName)
                                                    }}
                                                    className={"fill-amber-300"} isIconOnly>
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
                                            </Button>
                                            <Button isIconOnly className={"fill-red-600"} onClick={()=>removeYachtImage(yacht._id, imageName)} variant={"light"}>
                                                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100"
                                                     height="100"
                                                     viewBox="0 0 64 64">
                                                    <path
                                                        d="M 28 7 C 25.243 7 23 9.243 23 12 L 23 15 L 13 15 C 11.896 15 11 15.896 11 17 C 11 18.104 11.896 19 13 19 L 15.109375 19 L 16.792969 49.332031 C 16.970969 52.510031 19.600203 55 22.783203 55 L 41.216797 55 C 44.398797 55 47.029031 52.510031 47.207031 49.332031 L 48.890625 19 L 51 19 C 52.104 19 53 18.104 53 17 C 53 15.896 52.104 15 51 15 L 41 15 L 41 12 C 41 9.243 38.757 7 36 7 L 28 7 z M 28 11 L 36 11 C 36.552 11 37 11.449 37 12 L 37 15 L 27 15 L 27 12 C 27 11.449 27.448 11 28 11 z M 19.113281 19 L 44.886719 19 L 43.212891 49.109375 C 43.153891 50.169375 42.277797 51 41.216797 51 L 22.783203 51 C 21.723203 51 20.846109 50.170328 20.787109 49.111328 L 19.113281 19 z M 32 23.25 C 31.033 23.25 30.25 24.034 30.25 25 L 30.25 45 C 30.25 45.966 31.033 46.75 32 46.75 C 32.967 46.75 33.75 45.966 33.75 45 L 33.75 25 C 33.75 24.034 32.967 23.25 32 23.25 z M 24.642578 23.251953 C 23.677578 23.285953 22.922078 24.094547 22.955078 25.060547 L 23.652344 45.146484 C 23.685344 46.091484 24.462391 46.835938 25.400391 46.835938 C 25.421391 46.835938 25.441891 46.835938 25.462891 46.835938 C 26.427891 46.801938 27.183391 45.991391 27.150391 45.025391 L 26.453125 24.939453 C 26.419125 23.974453 25.606578 23.228953 24.642578 23.251953 z M 39.355469 23.251953 C 38.388469 23.224953 37.580875 23.974453 37.546875 24.939453 L 36.849609 45.025391 C 36.815609 45.991391 37.571109 46.801938 38.537109 46.835938 C 38.558109 46.836938 38.578609 46.835938 38.599609 46.835938 C 39.537609 46.835938 40.314656 46.091484 40.347656 45.146484 L 41.044922 25.060547 C 41.078922 24.094547 40.321469 23.285953 39.355469 23.251953 z"></path>
                                                </svg>
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </ScrollShadow>

                </ModalBody>
            </ModalContent>
        </Modal>
    )
}

export default ImgSettingsModal;