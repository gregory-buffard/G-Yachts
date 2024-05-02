"use client";

import { useView } from "@/app/view";

const View = ({
  dashboard,
  yachts,
}: {
  dashboard: JSX.Element;
  yachts: JSX.Element;
}) => {
  const { view } = useView();

  return view === "dashboard" ? dashboard : view === "yachts" ? yachts : null;
};

export default View;
