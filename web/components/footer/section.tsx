"use client";

import { InteractionProvider } from "@/contexts/interact";
import Components from "@/components/footer/components";

const Footer = () => (
  <InteractionProvider>
    <Components />
  </InteractionProvider>
);

export default Footer;
