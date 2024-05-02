"use client";

import { useState } from "react";
import FeaturedContent from "@/components/yachts/featured";

const Yachts = () => {
  const [manage, openManage] = useState<"featured" | "listing" | null>(null);

  return (
    <section
      className={
        "containerize h-full flex flex-col lg:flex-row lg:justify-start lg:items-start justify-center items-center"
      }
    >
      <FeaturedContent />
    </section>
  );
};

export default Yachts;
