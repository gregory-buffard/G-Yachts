import { useTranslations } from "next-intl";
import { Close, ContactLinks, SocialLinks } from "@/components/nav/navigation";
import codes from "@/data/CountryCodes.json";
import { useEffect, useRef, useState } from "react";
import { IContact } from "@/types/contact";
import { useContactCard } from "@/contexts/contact";
import { motion } from "framer-motion";

const Input = ({
  props,
  children,
}: {
  props: {
    type: string;
    label: string;
    value: keyof IContact;
  };
  children?: React.ReactNode;
}) => {
  const { contactCard, setContactCard } = useContactCard();

  return (
    <div
      className={
        "w-full flex flex-col justify-start items-start text-base tracking-wider"
      }
    >
      <label
        htmlFor={props.value}
        className={
          "text-rock-300 text-xs uppercase font-classic font-normal mb-[1vh]"
        }
      >
        {props.label}
      </label>
      <div
        className={
          "peer text-base w-[32vw] py-[0.5vh] text-black font-classic font-normal flex justify-start items-baseline gap-[0.5vw]"
        }
      >
        {children}
        <input
          id={props.value}
          type={props.type}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setContactCard({ ...contactCard, [props.value]: e.target.value })
          }
          className={"w-full outline-none"}
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

const Inquiry = ({
  props,
}: {
  props: { label: string; value: keyof IContact["inquiry"] };
}) => {
  const { contactCard, setContactCard } = useContactCard();

  return (
    <div className={"flex justify-start items-baseline gap-[0.5vw]"}>
      <input
        id={props.value}
        type={"checkbox"}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setContactCard({
            ...contactCard,
            inquiry: {
              ...contactCard["inquiry"],
              [props.value]: e.target.checked,
            },
          })
        }
        className={"cursor-pointer form-checkbox"}
      />
      <label
        htmlFor={props.value}
        className={
          "cursor-pointer text-base text-black font-classic font-normal"
        }
      >
        {props.label}
      </label>
    </div>
  );
};

const Contact = ({
  open,
}: {
  open: (value: "navigation" | "contact" | undefined) => void;
}) => {
  const t = useTranslations("contact"),
    [changeCode, setChangeCode] = useState(false),
    [code, setCode] = useState<string>(
      codes.find((code) => code.name === "Monaco").dial_code,
    ),
    menuRef = useRef<HTMLDivElement>(null),
    { contactCard, setContactCard } = useContactCard();

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

  return (
    <motion.section
      initial={{ y: "100vh" }}
      animate={{ y: "0" }}
      exit={{ y: "100vh" }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className={
        "absolute bottom-0 bg-rock-100 h-[86vh] w-screen flex flex-col justify-start items-center px-[2vw] py-[4vh]"
      }
    >
      <div className={"w-full flex justify-end items-center mb-[2vh]"}>
        <Close action={open} value={undefined} />
      </div>
      <div
        className={"h-full w-full flex justify-between items-center px-[2vw]"}
      >
        <div
          className={
            "h-full w-[48vw] flex flex-col justify-between items-start text-black"
          }
        >
          <div
            className={
              "h-full flex flex-col justify-start items-start gap-[2vh]"
            }
          >
            <h1 className={"font-slick text-5xl font-light"}>
              {t.rich("CTA", {
                classic: (chunks) => (
                  <span className={"font-classic uppercase"}>{chunks}</span>
                ),
              })}
            </h1>
            <p className={"font-classic font-normal mb-[2vh]"}>
              {t("subheading")}
            </p>
            <ContactLinks />
          </div>
          <SocialLinks address={true} />
        </div>
        <form
          className={
            "h-full bg-white flex flex-col justify-start items-center px-[2vw] py-[4vh] gap-[3vh]"
          }
        >
          <Input
            props={{
              type: "text",
              label: t("form.name"),
              value: "name",
            }}
          />
          <Input
            props={{
              type: "email",
              label: t("form.email"),
              value: "email",
            }}
          />
          <Input props={{ type: "tel", label: t("form.tel"), value: "tel" }}>
            <>
              <button
                type={"button"}
                onBlur={() => setTimeout(() => setChangeCode(false), 200)}
                onClick={(e: MouseEvent<HTMLButtonElement>) => {
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
                  className={`fill-black size-[1vw] ${changeCode ? "-rotate-180" : ""} transition-transform duration-200 ease-in-out`}
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
                      key={index}
                      type={"button"}
                      onClick={() => {
                        setCode(sel.dial_code);
                        setChangeCode(false);
                      }}
                      className={
                        "w-full flex justify-start items-center gap-[0.5vw] hover:bg-rock-100 transition-[background-color] duration-100 ease-in-out rounded-[0.5vh] px-[1vw] py-[0.5vh]"
                      }
                    >
                      <span>{sel.name}</span>
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
              id={"message"}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setContactCard({
                  ...contactCard,
                  message: e.target.value,
                })
              }
              className={
                "peer text-base w-[32vw] py-[0.5vh] text-black font-classic font-normal flex justify-start items-baseline gap-[0.5vw] outline-none resize-none h-[5rem]"
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
              className={"flex justify-start items-baseline gap-[2vw]"}
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
                id={"newsletter"}
                type={"checkbox"}
                className={"form-checkbox"}
              />
              <label htmlFor={"newsletter"}>{t("form.newsletter")}</label>
            </div>
            <div className={"form-agreement"}>
              <input id={"law"} type={"checkbox"} className={"form-checkbox"} />
              <label htmlFor={"law"}>
                {t.rich("form.law", {
                  confidentiality: (chunks) => <a href={"#"}>{chunks}</a>,
                  guidelines: (chunks) => <a href={"#"}>{chunks}</a>,
                })}
              </label>
            </div>
          </div>
          <button
            type={"button"}
            className={
              "w-full bg-black hover:bg-teal active:bg-teal transition-[background-color] duration-200 ease-in-out text-base font-classic font-normal uppercase text-white py-[2vh] tracking-wider"
            }
          >
            {t("form.submit")}
          </button>
        </form>
      </div>
    </motion.section>
  );
};

export default Contact;
