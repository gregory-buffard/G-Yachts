import Listing from "@/components/yachts/featuredListing";
import { fetchFeatured } from "@/actions/yachts";

const FeaturedContent = async () => {
  return (
    <section className={"flex justify-start items-start flex-wrap"}>
      <Listing yachts={await fetchFeatured()} />
    </section>
  );
};

export default FeaturedContent;
