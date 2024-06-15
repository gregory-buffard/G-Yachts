import Hero from "@/components/company/hero";
import Bar from "@/components/nav/bar";
import dynamic from "next/dynamic";

const View = dynamic(() => import("@/components/view"));
const Footer = dynamic(() => import("@/components/footer"));
const Story = dynamic(() => import("@/components/company/story"));
const Accordion = dynamic(() => import("@/components/company/accordion"));
const Team = dynamic(() => import("@/components/company/team"));
const Lifestyle = dynamic(() => import("@/components/company/lifestyle"));

const Company = () => {
  return (
    <main className="w-full flex flex-col justify-start items-center">
      <Bar dynamicColor={-1} />
      <View />
      <Hero />
      <Story />
      <Accordion />
      <Team />
      <Lifestyle />
      <Footer />
    </main>
  );
};

export default Company;
