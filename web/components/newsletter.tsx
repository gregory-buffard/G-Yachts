"use client";

import { useTranslations } from "next-intl";
import { Input } from "@/components/nav/contact";
import { subscribe } from "@/actions/contact";
import { useRef, useState } from "react";
import { motion } from "framer-motion";
import Lottie, { LottieRefCurrentProps } from "lottie-react";
import { colorify } from "lottie-colorify";
import submitted from "@/public/imagery/optimized/newsletter.json";
import { useParams } from "next/navigation";
import { usePath } from "@/utils/contact";
import { useViewContext } from "@/context/view";

const Newsletter = () => {
  const t = useTranslations("newsletter"),
    path = usePath(),
    [registred, setRegistred] = useState<boolean>(false),
    animationRef = useRef<LottieRefCurrentProps>(null),
    params = useParams(),
    { openView } = useViewContext();

  return (
    <section
      className={
        "relative w-full h-max flex flex-col justify-center items-center containerize py-[10vh] lg:py-[8vh] gap-[4vh]"
      }
    >
      <video
        src={"/videos/newsletter.mp4"}
        className={"absolute w-full h-full object-cover -z-10 brightness-75"}
        autoPlay
        muted
        preload={"none"}
        playsInline
        loop
      ></video>
      <div
        className={
          "text-white flex flex-col justify-center items-center gap-[2vh]"
        }
      >
        <h1 className={"text-center"}>
          {t.rich("title", {
            classic: (chunks) => (
              <span className={"font-classic font-medium"}>{chunks}</span>
            ),
          })}
        </h1>
        <p className={"normal-case"}>
          {t.rich("subtitle", {
            br: () => <br />,
          })}
        </p>
      </div>
      <div
        className={"w-full px-[10vw] flex flex-col justify-center items-center"}
      >
        {registred ? (
          <motion.div
            key={"registred"}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className={
              "h-full w-max flex flex-col justify-center items-center lg:px-[4vh] lg:py-[4vh] py-[4vw] text-white gap-[2vh]"
            }
          >
            <h1 className={"text-center font-slick"}>{t("registered")}</h1>
            <Lottie
              loop={false}
              initialSegment={[0, 15]}
              lottieRef={animationRef}
              animationData={colorify(
                [
                  "#ffffff",
                  "#ffffff",
                  "#000000",
                  "#ffffff",
                  "#ffffff",
                  "#ffffff",
                  "#ffffff",
                  "#ffffff",
                ],
                submitted,
              )}
              className={"size-[16vh]"}
            />
            <p className={"text-center"}>{t("feedback")}</p>
          </motion.div>
        ) : (
          <motion.form
            key={"newsletter"}
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            action={async (formData) => {
              await subscribe(formData).then(() => setRegistred(true));
            }}
            className={
              "h-max lg:w-[33vw] w-[92vw] bg-white flex flex-col justify-start items-center lg:px-[4vw] px-[4vw] lg:py-[4vh] py-[4vw] gap-[3vh]"
            }
          >
            <Input
              props={{
                type: "text",
                label: t("name"),
                value: "name",
                required: true,
              }}
            />
            <Input
              props={{
                type: "text",
                label: t("surname"),
                value: "surname",
                required: true,
              }}
            />
            <Input
              props={{
                type: "email",
                label: t("email"),
                value: "email",
                required: true,
              }}
            />
            <div
              className={
                "w-full flex flex-col justify-start items-start gap-[1vh] text-black font-classic font-normal"
              }
            >
              <div className={"form-agreement"}>
                <input
                  id={"law"}
                  type={"checkbox"}
                  className={"form-checkbox"}
                  required
                />
                <label htmlFor={"law"}>
                  {t.rich("law", {
                    confidentiality: (chunks) => (
                      <button
                        type={"button"}
                        onClick={() => openView("privacy")}
                        className={"uppercase underline"}
                      >
                        {chunks}
                      </button>
                    ),
                    guidelines: (chunks) => (
                      <button
                        type={"button"}
                        onClick={() => openView("terms")}
                        className={"uppercase underline"}
                      >
                        {chunks}
                      </button>
                    ),
                  })}
                </label>
              </div>
            </div>
            <button
              type={"submit"}
              className={
                "w-full bg-black hover:bg-teal active:bg-teal transition-[background-color] duration-200 ease-in-out text-base font-classic font-normal uppercase text-white py-[2vh] tracking-wider"
              }
            >
              {t("send")}
            </button>
          </motion.form>
        )}
      </div>
    </section>
  );
};

export default Newsletter;
