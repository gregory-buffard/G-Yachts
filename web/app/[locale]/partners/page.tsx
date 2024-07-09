import Bar from "@/components/nav/bar";
import dynamic from "next/dynamic";
import Hero from "@/components/partners/hero";

const View = dynamic(() => import("@/components/view"));
const Newsletter = dynamic(() => import("@/components/newsletter"));
const Footer = dynamic(() => import("@/components/footer"));

const Partners = () => {
  return (
    <main className="w-full flex flex-col justify-start items-center">
      <Bar dynamicColor={100} />
      <View />
      <Hero />
      <Newsletter />
      <Footer />
    </main>
  );
};

export default Partners;