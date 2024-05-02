import Hero from "@/components/sales/hero/section";
import Bar from "@/components/nav/bar";
import dynamic from "next/dynamic";

const View = dynamic(() => import("@/components/nav/view"));

const Sales = () => {
  return (
    <main className="w-full flex flex-col justify-start items-center">
      <Bar dynamicColor={100} />
      <View />
      <Hero />
    </main>
  );
};

export default Sales;
