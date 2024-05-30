import FeaturedContent from "@/components/dashboard/featured";
import {IFeatured} from "@/types/charter";

const FeaturedPre = ({data}:{data:IFeatured[]}) => {
    return (
        <FeaturedContent data={data}/>
    );
}

export default FeaturedPre;