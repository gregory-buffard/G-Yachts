"use server"

import DestinationList from "@/components/destinations/destinationList";

const Destination = async () => {



    return (
        <section
            className={
                "containerize h-screen flex max-md:flex-col flex-row max-md:justify-start max-md:items-start justify-center items-start gap-[2vh]"
            }
        >
            <DestinationList />
        </section>
    );
};

export default Destination;
