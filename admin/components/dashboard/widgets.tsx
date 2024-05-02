import { fetchFeatured } from "@/actions/yachts";
import FeaturedContent from "@/components/dashboard/featured";

export const Featured = async () => (
  <FeaturedContent data={await fetchFeatured()} />
);
