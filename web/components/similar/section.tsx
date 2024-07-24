import Section from "@/components/similar/components";
import { fetchSimilarYachts, fetchSimilarCharters } from "@/actions/yachts";
import { fetchSimilarNewConstructions } from "@/actions/newConstructions";

const Similar = async ({
    type,
    length,
}: {
    type: "yachts" | "charters" | "new-constructions";
    length: number;
}) => {
    var data;
    switch (type) {
        case "yachts":
            data = await fetchSimilarYachts(length);
            break;
        case "charters":
            data = await fetchSimilarCharters(length);
            break;
        case "new-constructions":
            data = await fetchSimilarNewConstructions(length);
            break;
    }
    return <Section carouselData={data} type={type} />;
};

export default Similar;
