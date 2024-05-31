import Hero from "@/components/company/hero";
import Bar from "@/components/nav/bar";
import dynamic from "next/dynamic";

const View = dynamic(() => import("@/components/view"));
const Newsletter = dynamic(() => import("@/components/newsletter"));
const Footer = dynamic(() => import("@/components/footer"));
const Story = dynamic(() => import("@/components/company/story"));

const Company = () => {
    return (
        <main className="w-full flex flex-col justify-start items-center">
            <Bar dynamicColor={100} />
            <View />
            <Hero />
            <Story />
            <Newsletter />
            <Footer />
        </main>
    );
}

export default Company;