import { IYacht } from "@/types/yacht";
import { ObjectId } from "mongoose";
import { Card } from "@nextui-org/react";

interface IFeatured extends Pick<IYacht, "name"> {
  _id: ObjectId;
}

const Listing = ({ yachts }: { yachts: IFeatured[] }) => {
  return yachts.map((yacht) => (
    <Card key={`${yacht._id}`}>
      <p>{yacht.name}</p>
    </Card>
  ));
};

export default Listing;
