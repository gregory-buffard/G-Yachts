"use client";

import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from "react-simple-maps";
import { type IDestination } from "@/types/destination";

const Map = ({ destinations }: { destinations: IDestination[] }) => {
  const markers = destinations.filter((destination) => destination.coordinates);

  return (
    <ComposableMap className={"m-auto w-[72vw] md:w-[56vw] lg:w-[56vw]"}>
      <Geographies geography={"/map/topology.json"}>
        {({ geographies }: { geographies: any }) =>
          geographies.map((geo: any) => (
            <Geography
              key={geo.rsmKey}
              geography={geo}
              fill="#d9d9d9"
              stroke="#ffffff"
              style={{
                default: { outline: "none" },
                hover: { outline: "none" },
                pressed: { outline: "none" },
              }}
            />
          ))
        }
      </Geographies>
      {markers.map((destination) => (
        <Marker key={destination.id} coordinates={destination.coordinates}>
          <circle r={8} fill="#6db8c9" stroke="#fff" strokeWidth={2} />
        </Marker>
      ))}
    </ComposableMap>
  );
};

export default Map;
