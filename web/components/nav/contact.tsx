import { useTranslations } from "next-intl";
import { Close } from "@/components/nav/navigation";
import SocialLinks from "@/components/nav/socialLinks";
import ContactLinks from "@/components/nav/contactLinks";
import codes from "@/data/CountryCodes.json";
import { useEffect, useRef, useState } from "react";
import { ICustomer } from "@/types/customer";
import { INewsletter } from "@/types/newsletter";
import { contact } from "@/actions/contact";
import { motion } from "framer-motion";
import { useFormStatus } from "react-dom";
import Lottie, { LottieRefCurrentProps } from "lottie-react";
import { colorify } from "lottie-colorify";
import loading from "@/public/imagery/optimized/contact/loading.json";
import submitted from "@/public/imagery/optimized/contact/submitted.json";
import { handleMouseMove } from "@/utils/mouseCoords";
import { useParams } from "next/navigation";
import { usePathname } from "@/navigation";

export const Input = ({
  props,
  children,
}: {
  props: {
    type: string;
    label: string;
    value: keyof ICustomer | keyof INewsletter;
    required: boolean;
  };
  children?: React.ReactNode;
}) => {
  const { pending } = useFormStatus();

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    switch (props.value) {
      case "name":
      case "surname":
        e.target.value = e.target.value.replace(/[^A-Za-zÀ-ÖØ-öø-ÿ\s]/g, "");
        break;
      case "email":
        e.target.value = e.target.value.replace(/[^a-z0-9@._-]/g, "");
        break;
      case "tel":
        e.target.value = e.target.value.replace(/[^0-9]/g, "");
        break;
    }
  };

  return (
    <div
      className={
        "w-full flex flex-col justify-start items-start text-base tracking-wider"
      }
    >
      <label htmlFor={props.value} className={"text-rock-300 mb-[1vh]"}>
        {props.label}
      </label>
      <div
        className={
          "peer text-base w-full py-[0.5vh] text-black font-classic font-normal flex justify-start items-baseline gap-[0.5vw]"
        }
      >
        {children}
        <input
          disabled={pending}
          id={props.value}
          name={props.value}
          type={props.type}
          required={props.required}
          className={"w-full outline-none"}
          onInput={handleInput}
        />
      </div>
      <div
        className={
          "w-full h-[0.1vh] peer-has-[:focus]:bg-black bg-rock-200 transition-[background-color] duration-500 ease-in-out"
        }
      />
    </div>
  );
};

const Inquiry = ({ props }: { props: { label: string; value: string } }) => {
  const { pending } = useFormStatus();

  return (
    <div
      className={"flex justify-start items-baseline lg:gap-[0.5vw] gap-[2vw]"}
    >
      <input
        disabled={pending}
        id={props.value}
        type={"checkbox"}
        name={props.value}
        className={"cursor-pointer form-checkbox"}
      />
      <label htmlFor={props.value} className={"cursor-pointer"}>
        {props.label}
      </label>
    </div>
  );
};

const Submit = () => {
  const { pending } = useFormStatus(),
    t = useTranslations("contact");

  return (
    <button
      disabled={pending}
      type={"submit"}
      className={
        "w-full bg-black hover:bg-teal active:bg-teal transition-[background-color] duration-200 ease-in-out text-white py-[2vh]"
      }
    >
      {pending ? (
        <Lottie
          loop={true}
          animationData={colorify(["#ffffff", "#ffffff"], loading)}
          className={"h-[1.5rem]"}
        />
      ) : (
        <p>{t("form.submit")}</p>
      )}
    </button>
  );
};

const Contact = () => {
  const t = useTranslations("contact"),
    currentPath = usePathname(),
    [changeCode, setChangeCode] = useState(false),
    [code, setCode] = useState<string>("+377"),
    menuRef = useRef<HTMLDivElement>(null),
    animationRef = useRef<LottieRefCurrentProps>(null),
    { pending } = useFormStatus(),
    [sent, setSent] = useState<boolean>(false),
    params = useParams();

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!changeCode) return;
      const key = e.key.toUpperCase(),
        match = codes.find((c) => c.name.toUpperCase().startsWith(key));
      if (match) {
        const i = codes.indexOf(match);
        if (menuRef.current) {
          const buttons = menuRef.current.querySelectorAll("button");
          if (buttons[i])
            buttons[i].scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
    };

    if (changeCode) window.addEventListener("keypress", handleKeyPress);

    return () => window.removeEventListener("keypress", handleKeyPress);
  }, [changeCode]);

  const detectPage = (): string => {
    switch (currentPath) {
      case "/":
        return "Main Page";
      case "/sales":
        return "Sales Page";
      case "/sales/[id]":
        return "Yacht Page";
      case "/charter/[id]":
        return "Yacht for Charter Page";
      case "/charters":
        return "Charters Page";
      case "/new-constructions":
        return "New Constructions Page";
      case "/new-constructions/[id]":
        return "New Construction Page";
      case "/management":
        return "Management Page";
      case "/company":
        return "Company Page";
      case "/partners":
        return "Partners Page";
      case "/news":
        return "News Page";
      case "/news/[id]":
        return "News Article Page";
      case "/events":
        return "Events Page";
      case "/events/[id]":
        return "Event Page";
      case "/recruitment":
        return "Recruitment Page";
      case "/destinations":
        return "Destinations Page";
      case "/destinations/[id]":
        return "Destination Page";
      default:
        return "Unknown Page";
    }
  };

  return (
    <motion.section
      initial={{ y: "100%" }}
      animate={{ y: "0%" }}
      exit={{ y: "100%" }}
      transition={{ duration: 0.2, ease: "easeInOut" }}
      className={
        "fixed lg:bottom-0 lg:top-auto top-0 left-0 z-20 bg-rock-100 lg:h-[86vh] h-[100dvh] overflow-y-auto w-full flex flex-col justify-start items-center lg:px-[2vw] px-[4vw] py-[4vh] lg:gap-[2vh] gap-[4vh] overflow-x-hidden"
      }
      onMouseMove={handleMouseMove}
    >
      <div
        className={
          "w-full lg:static lg:top-auto sticky top-0 flex justify-end items-center"
        }
      >
        <Close />
      </div>
      <div
        className={
          "lg:h-full h-max w-full lg:px-[2vw] px-0 flex lg:flex-row flex-col lg:gap-0 gap-[8vh] justify-between items-center"
        }
      >
        <div
          className={
            "h-full lg:w-[48vw] w-full flex flex-col justify-between items-start text-black lg:gap-0 gap-[8vh]"
          }
        >
          <div
            className={
              "h-full flex flex-col justify-start items-start gap-[2vh]"
            }
          >
            <h1 className={"font-slick lg:text-5xl text-4xl font-light"}>
              {t.rich("CTA", {
                classic: (chunks) => (
                  <span className={"font-classic uppercase"}>{chunks}</span>
                ),
              })}
            </h1>
            <p className={"font-classic font-normal"}>{t("subheading")}</p>
            <ContactLinks />
          </div>
          <div
            className={
              "w-full flex flex-col justify-start items-start lg:gap-0 gap-[2vh]"
            }
          >
            <div className={"lg:hidden block w-full h-[0.25vh] bg-rock-200"} />
            <SocialLinks address={true} />
          </div>
        </div>
        {sent ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            key={"sent"}
            className={
              "h-full lg:w-max w-full flex flex-col justify-center items-center lg:px-[8vw] px-[4vw] lg:py-[4vh] py-[4vw]"
            }
          >
            <Lottie
              lottieRef={animationRef}
              loop={false}
              animationData={submitted}
              className={"size-[16vh]"}
            />
            <h1
              className={`font-slick font-light transition-opacity duration-500 ease-in-out delay-500 text-center whitespace-nowrap ${sent && "opacity-100"}`}
            >
              {t.rich("form.sent", {
                classic: (chunk) => (
                  <span className={"font-classic"}>{chunk}</span>
                ),
              })}
            </h1>
            <p
              className={`my-[2vh] transition-opacity duration-500 ease-in-out delay-1000 text-center ${sent && "opacity-100"}`}
            >
              {t("form.feedback")}
            </p>
          </motion.div>
        ) : (
          <motion.form
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            key={"form"}
            action={async (formData) => {
              await contact(formData, {
                prefix: code,
                locale: params.locale as string,
                page: detectPage(),
              }).then(() => setSent(true));
            }}
            className={
              "h-full lg:w-max w-full bg-white flex flex-col justify-start items-center lg:px-[4vh] px-[4vw] lg:py-[4vh] py-[4vw] gap-[3vh]"
            }
          >
            <Input
              props={{
                type: "text",
                label: t("form.name"),
                value: "name",
                required: true,
              }}
            />
            <Input
              props={{
                type: "email",
                label: t("form.email"),
                value: "email",
                required: true,
              }}
            />
            <Input
              props={{
                type: "tel",
                label: t("form.tel"),
                value: "tel",
                required: false,
              }}
            >
              <>
                <button
                  disabled={pending}
                  type={"button"}
                  onBlur={() => setTimeout(() => setChangeCode(false), 200)}
                  onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                    e.preventDefault();
                    setTimeout(() => setChangeCode(!changeCode), 200);
                  }}
                  className={"flex justify-start items-center gap-[0.5vw]"}
                >
                  {code}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    x="0px"
                    y="0px"
                    viewBox="0 0 72 72"
                    className={`fill-black lg:size-[1vw] size-[2vh] ${changeCode ? "-rotate-180" : ""} transition-transform duration-200 ease-in-out`}
                  >
                    <path d="M35.98,50.002c-1.046,0-2.093-0.395-2.863-1.185L13.595,28.809c-1.542-1.581-1.512-4.114,0.069-5.656	c1.582-1.542,4.113-1.512,5.657,0.069L35.98,40.296l16.698-17.113c1.544-1.582,4.076-1.612,5.657-0.069s1.611,4.075,0.069,5.656	L38.844,48.817C38.073,49.607,37.026,50.002,35.98,50.002z"></path>
                  </svg>
                </button>
                {changeCode && (
                  <div
                    className={
                      "absolute translate-y-[1.75rem] flex flex-col justify-start items-start bg-white w-max h-[18vh] overflow-y-auto drop-shadow-2xl gap-[1vh] px-[0.5vw] py-[0.5vw] rounded-[1vh]"
                    }
                    ref={menuRef}
                  >
                    {codes.map((sel, index) => (
                      <button
                        disabled={pending}
                        key={index}
                        type={"button"}
                        onClick={() => {
                          setCode(sel.dial_code);
                          setChangeCode(false);
                        }}
                        className={
                          "w-full flex justify-start items-baseline lg:gap-[0.5vw] gap-[1vh] hover:bg-rock-100 transition-[background-color] duration-100 ease-in-out rounded-[0.5vh] lg:px-[1vw] px-[2vw] lg:py-[0.5vh] py-[2vw]"
                        }
                      >
                        <span className={"text-wrap text-left"}>
                          {sel.name}
                        </span>
                        <span className={"text-rock-300"}>{sel.dial_code}</span>
                      </button>
                    ))}
                  </div>
                )}
              </>
            </Input>
            <div
              className={
                "w-full flex flex-col justify-start items-start text-base tracking-wider"
              }
            >
              <label
                htmlFor={"message"}
                className={
                  "text-rock-300 text-xs uppercase font-classic font-normal mb-[1vh]"
                }
              >
                {t("form.message")}
              </label>
              <textarea
                disabled={pending}
                id={"message"}
                name={"message"}
                required={true}
                className={
                  "peer text-base lg:w-[32vw] w-full py-[0.5vh] text-black font-classic font-normal flex justify-start items-baseline gap-[0.5vw] outline-none resize-none h-[5rem]"
                }
              />
              <div
                className={
                  "w-full h-[0.1vh] peer-focus:bg-black bg-rock-200 transition-[background-color] duration-500 ease-in-out"
                }
              />
            </div>
            <div className={"w-full flex flex-col justify-start items-start"}>
              <label
                htmlFor={"inquiry"}
                className={
                  "text-rock-300 text-xs uppercase font-classic font-normal mb-[1vh]"
                }
              >
                {t("form.inquiry.title")}
              </label>
              <div
                id={"inquiry"}
                className={
                  "flex justify-start items-baseline flex-wrap lg:gap-[2vw] gap-[4vw]"
                }
              >
                <Inquiry
                  props={{ label: t("form.inquiry.buying"), value: "buying" }}
                />
                <Inquiry
                  props={{ label: t("form.inquiry.selling"), value: "selling" }}
                />
                <Inquiry
                  props={{
                    label: t("form.inquiry.chartering"),
                    value: "chartering",
                  }}
                />
                <Inquiry
                  props={{ label: t("form.inquiry.other"), value: "other" }}
                />
              </div>
            </div>
            <div
              className={
                "w-full flex flex-col justify-start items-start gap-[1vh] text-black font-classic font-normal"
              }
            >
              <div className={"form-agreement"}>
                <input
                  disabled={pending}
                  id={"newsletter"}
                  name={"newsletter"}
                  type={"checkbox"}
                  className={"form-checkbox"}
                />
                <label htmlFor={"newsletter"}>{t("form.newsletter")}</label>
              </div>
              <div className={"form-agreement"}>
                <input
                  disabled={pending}
                  id={"law"}
                  required
                  type={"checkbox"}
                  className={"form-checkbox"}
                />
                <label htmlFor={"law"}>
                  {t.rich("form.law", {
                    confidentiality: (chunks) => <a href={"#"}>{chunks}</a>,
                    guidelines: (chunks) => <a href={"#"}>{chunks}</a>,
                  })}
                </label>
              </div>
            </div>
            <Submit />
          </motion.form>
        )}
      </div>
    </motion.section>
  );
};

export default Contact;
