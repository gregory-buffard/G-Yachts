import React from "react";
import { useTranslations } from "next-intl";

const OurServices = () => {
  const t = useTranslations("ourServices");
  return (
    <div className="m-4 grid gap-4 sm:grid-cols-4 bg-rock-100">
      <div className=""></div>
      <div className=""></div>
      <div className=""></div>
      <div className=""></div>
    </div>
  );
};

export default OurServices;
