import Bar from "@/components/nav/bar";
import Hero from "@/components/index/hero";
import dynamic from "next/dynamic";

const View = dynamic(() => import("@/components/view"));
const Services = dynamic(() => import("@/components/index/services"));
const WorkingTogether = dynamic(() => import("@/components/index/working"));
const Featured = dynamic(() => import("@/components/index/featured/section"));
const Memories = dynamic(() => import("@/components/index/memories"));
const Destinations = dynamic(
  () => import("@/components/index/destinations/section"),
);
const Learn = dynamic(() => import("@/components/index/learn"));
const Newsletter = dynamic(() => import("@/components/newsletter"));
const Footer = dynamic(() => import("@/components/footer"));

const Home = () => {
  return (
    <main className="w-full flex flex-col justify-start items-center">
      <Bar dynamicColor={100} />
      <View />
      <Hero />
      <Learn />
      <Services />
      <WorkingTogether />
      {/*<Featured */}
      <Memories />
      <Destinations />
      <Newsletter />
      <Footer />
    </main>
  );
};

export default Home;
