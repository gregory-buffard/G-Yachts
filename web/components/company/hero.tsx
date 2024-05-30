import React from "react";
import { useTranslations } from "next-intl";
import hero from "@/public/imagery/optimized/index/hero.webp";
import Image from "next/image";

const Hero = () => {
  const t = useTranslations("company.hero");
  return (
    <div className="h-screen w-full overflow-hidden">
      <div className="grid grid-cols-2">
        <div className={"bg-rock-100"}>
            
        </div>
        <Image src={hero} alt={"Yacht"} className={"bg-contain h-screen"}/>
      </div>
    </div>
    );
}

export default Hero;