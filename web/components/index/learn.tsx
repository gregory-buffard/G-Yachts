import { useTranslations } from "next-intl";
import { Link } from "@/navigation";

const Learn = () => {
  const t = useTranslations("index");

  return (
    <section className="bg-white py-28 flex flex-col leading-relaxed justify-center items-start containerize">
      <div className="flex flex-col md:ml-16 lg:ml-16 xl:ml-40 font-slick font-light">
        <h1 className={"md:text-4xl text-2xl leading-normal"}>
          {t.rich("learn.title", { br: () => <br /> })}
        </h1>
      </div>
      <Link
        href={"/company"}
        type={"button"}
        className="glass-button glass-button-dark mt-8 md:ml-16 lg:ml-16 xl:ml-40"
      >
        {t("learn.CTA")}
      </Link>
    </section>
  );
};

export default Learn;
