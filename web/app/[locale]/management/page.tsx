import dynamic from "next/dynamic";
import Bar from "@/components/nav/bar";
import Hero from "@/components/management/hero";

const View = dynamic(() => import("@/components/view"));
const Footer = dynamic(() => import("@/components/footer"));
const Services = dynamic(() => import("@/components/management/services"));
const ServiceList = dynamic(
  () => import("@/components/management/serviceList"),
);
const Assets = dynamic(() => import("@/components/management/assets"));
const Accordion = dynamic(() => import("@/components/management/accordion"));
const Bottom = dynamic(() => import("@/components/management/bottom"));

const Management = () => {
  return (
    <main className="w-full flex flex-col justify-start items-center">
      <Bar dynamicColor={100} />
      <View />
      <Hero />
      <Services />
      <ServiceList />
      <Assets />
      <Accordion />
      <Bottom />
      <Footer />
    </main>
  );
};

export default Management;
