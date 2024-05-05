"use client";

import { IYacht } from "@/types/yacht";
import { ObjectId } from "mongoose";
import { useState } from "react";

interface IListing
  extends Pick<
    IYacht,
    "name" | "price" | "builder" | "length" | "yearBuilt" | "sleeps"
  > {
  _id: ObjectId;
}

const Card = ({ data }: { data: IListing }) => {
  return (
    <div className={"w-[28vw] h-max"}>
      <div className={"w-full h-[16vh]"}>
        <div
          className={"w-full h-full"}
          style={{
            backgroundImage: `url(http://51.75.16.185/images/yachts/${data._id}/featured.webp)`,
          }}
        ></div>
        <div
          className={"w-full h-full"}
          style={{
            backgroundImage: `url(http://51.75.16.185/images/yachts/${data._id}/featured.webp)`,
          }}
        ></div>
        <div
          className={"w-full h-full"}
          style={{
            backgroundImage: `url(http://51.75.16.185/images/yachts/${data._id}/featured.webp)`,
          }}
        ></div>
      </div>
    </div>
  );
};

const Listing = ({ data }: { data: IListing[] }) => {
  const [maxListings, setMaxListings] = useState<number>(12),
    [listings, setListings] = useState<IListing[]>(data.slice(0, maxListings));

  return (
    <section
      className={"containerize h-max flex justify-start items-center flex-wrap"}
    >
      {listings.map((yacht, i) => (
        <Card key={i} data={yacht} />
      ))}
    </section>
  );
};

export default Listing;
