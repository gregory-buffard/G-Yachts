"use client";
import {ICharter} from "@/types/charter";
import {useEffect, useState} from "react";
import {Button, ScrollShadow} from "@nextui-org/react";
import Manage from "@/components/yachts/manage";
import {getDestinations, removeDestination, saveDestination} from "@/actions/destination";
import {IDestination} from "@/types/destination";
import destinations from "@/components/destinations/destinations";
import ManageDestination from "@/components/destinations/manageDestination";

const DestinationList = () => {
    const [destination, setDestination] = useState<IDestination[]>([]);
    useEffect(() => {
        getDestinations().then((res) => setDestination(res? res : []));
    }, []);

    return (
        <>
            <div className={"w-fit flex flex-col"}>
                <h1 className={"ml-4 max-md:self-center mt-4"}>Destinations List</h1>
            </div>
            <ScrollShadow
                hideScrollBar={true}
                className={
                    "w-3/4 max-h-[80vh] max-sm:w-[98%] max-md:self-center flex flex-col items-center"
                }
            >
                {destination.length > 0 && destination.map((d) => {
                    return (
                        <ManageDestination key={d._id} setDestinations={setDestination} data={d} saveDestination={saveDestination} removeDestination={removeDestination} />
                    );

                })}
            </ScrollShadow>
        </>
    )
}

export default DestinationList;