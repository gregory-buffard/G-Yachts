"use server"

import CharterList from "@/components/charters/charterList";

const Charter = async () => {
    return (
        <section
            className={
                "containerize h-screen flex max-md:flex-col flex-row max-md:justify-start max-md:items-start justify-center items-start gap-[2vh]"
            }
        >
            <CharterList />
        </section>
    );
};

export default Charter;
