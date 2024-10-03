import { useTranslations } from "next-intl";

const Subtitle = () => {
    const t = useTranslations("sell-your-yacht.hero");

    return (
        <section className={"flex w-full h-[40dvh] place-items-center justify-center"}>
            <h1 className={"md:text-7xl text-6xl font-medium text-black text-center"}>
                {t.rich("subtitle", { br: () => <br /> })}
            </h1>
        </section>
    );
};

export default Subtitle;