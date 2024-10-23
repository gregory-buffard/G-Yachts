import Image from "next/image";
import working from "@/public/pictures/index/working.webp";
import { useTranslations } from "next-intl";
import { Link } from "@/navigation";

const WorkingTogether = () => {
  const t = useTranslations("index.working");

  return (
    <section
      className={
        "w-full flex lg:flex-row flex-col justify-center items-center lg:items-start lg:gap-[0vw] gap-[4vh]"
      }
    >
      <Image
        className={"lg:w-1/2 lg:h-[80vh] w-full"}
        src={working}
        alt={"Two yachts sailing in the sea next to an island"}
      />
      <div
        className={
          "w-full lg:w-1/2 lg:py-[4vw] containerize flex flex-col justify-start items-start gap-[2vh]"
        }
      >
        <h4>{t("subtitle")}</h4>
        <h1>
          {t.rich("title", {
            classic: (chunks) => (
              <span className={"classic"}>
                <br className={"hidden lg:block"} />
                {chunks}
              </span>
            ),
          })}
        </h1>
        <div
          className={
            "w-full flex justify-end items-center my-[8vh] lg:my-[10vh]"
          }
        >
          <div className={"flex flex-col justify-center items-start gap-[2vh]"}>
            <p className={"text-justify lg:w-[24vw] w-[36vh]"}>
              {t("description")}
            </p>
            <Link href={"/sales"} className={"glass-button glass-button-dark"}>
              {t("CTA")}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorkingTogether;
