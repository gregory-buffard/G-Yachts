import Hero from "@/components/newContructions/hero";
import Bar from "@/components/nav/bar";
import dynamic from "next/dynamic";
import { fetchNewConstructions, fetchShipyards } from "@/actions/newConstructions";
import Shipyards from "@/components/newContructions/shipyards";

const View = dynamic(() => import("@/components/view"));
const Listing = dynamic(() => import("@/components/newContructions/listing"));
const Newsletter = dynamic(() => import("@/components/newsletter"));
const Footer = dynamic(() => import("@/components/footer"));

const NewConstructions = async ({
    searchParams,
}: {
    searchParams: {
        builder?: string;
    };
}) => {
    let newConstructions = await fetchNewConstructions();
    console.log(searchParams.builder);
    console.log(newConstructions.map((construction) => construction.builder));
    if (searchParams.builder) {
        newConstructions = newConstructions.filter(
            (construction) => construction.builder === searchParams.builder
        );
    }
    return (
        <main className="w-full flex flex-col justify-start items-center">
            <Bar dynamicColor={100} />
            <View />
            <Hero />
            <div className="w-full md:px-40">
                <Shipyards data={await fetchShipyards()} />
            </div>
            <Listing data={newConstructions} />
            <Newsletter />
            <Footer />
        </main>
    );
};

export default NewConstructions;
