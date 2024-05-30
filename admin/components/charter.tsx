"use server"

import {getCharters} from "@/actions/charters";
import CharterList from "@/components/charters/charterList";

const Charter = async () => {
    const data = await getCharters();


    return (
        <section
            className={
                "containerize h-screen flex max-md:flex-col flex-row max-md:justify-start max-md:items-start justify-center items-start gap-[2vh]"
            }
        >
            <CharterList data={data}/>
        </section>
    );
};

export default Charter;
