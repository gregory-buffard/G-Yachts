"use client";

import { InteractionProvider } from "@/contexts/interact";
import Components from "@/components/nav/components";

const Bar = ({ dynamicColor }: { dynamicColor: number }) => (
  <InteractionProvider>
    <Components dynamicColor={dynamicColor} />
  </InteractionProvider>
);

export default Bar;
