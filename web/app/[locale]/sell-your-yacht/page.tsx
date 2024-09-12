import Footer from "@/components/footer";
import Bar from "@/components/nav/bar";
import CenturyBanner from "@/components/sellYourYacht/centuryBanner";
import QualityBanner from "@/components/sellYourYacht/qualityBanner";
import View from "@/components/view";

export default function SellYourYachtPage() {
    return (
        <main className="w-full flex flex-col justify-start items-center">
            <Bar dynamicColor={100} />
            <View />
            <div className="w-full h-20"></div> {/* PLACEHOLDER - Delete after creating missing components */}
            <QualityBanner />
            <CenturyBanner />
            <Footer />
        </main>
    );
}
