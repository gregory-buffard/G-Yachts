import Section from "@/components/destination/featured/components";
import { IDestination } from "@/types/destination";
import { fetchChartersForDestination } from "@/actions/yachts";

const ChartersInDestination = async ({
  destination,
}: {
  destination: IDestination;
}) => {
  return (
    <Section carouselData={await fetchChartersForDestination(destination)} />
  );
};

export default ChartersInDestination;
