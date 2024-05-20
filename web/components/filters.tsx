import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { useViewContext } from "@/context/view";
import { convertUnit, formatCurrency } from "@/utils/yachts";
import ReactSlider from "react-slider";

export const Radio = ({
  options,
  currentOption,
  onClick,
}: {
  options: { value: "sail" | "motor" | undefined; label: string }[];
  currentOption: "sail" | "motor" | undefined;
  onClick: (value: "sail" | "motor" | undefined) => void;
}) => {
  return (
    <table
      className={"w-full border-[0.25vh] border-black border-collapse h-[3vh]"}
    >
      {options.map((option) => (
        <td
          key={option.label}
          className={`${currentOption === option.value ? "bg-rock-300" : ""} w-1/3 h-full border-[0.25vh] border-black align-middle`}
        >
          <button
            onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
              e.preventDefault();
              onClick(option.value);
            }}
            className={`w-full h-full flex justify-center items-center`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              viewBox="0 0 64 64"
              className={`${currentOption === option.value ? "h-[1rem] w-auto fill-black" : "hidden"}`}
            >
              <path d="M51.598,11.321c0.927,0.601,1.191,1.839,0.591,2.766l-24.62,38c-0.341,0.525-0.907,0.861-1.532,0.907	C25.987,52.998,25.938,53,25.89,53c-0.572,0-1.12-0.246-1.502-0.679L11.988,38.228c-0.729-0.83-0.648-2.093,0.181-2.823	c0.829-0.73,2.093-0.648,2.823,0.18l10.655,12.111l23.184-35.784C49.432,10.984,50.668,10.722,51.598,11.321z"></path>
            </svg>
            <label className={"cursor-pointer"}>{option.label}</label>
          </button>
        </td>
      ))}
    </table>
  );
};

export const Select = ({
  options,
  currentOption,
  onChange,
  label,
}: {
  options: any[];
  currentOption: any;
  onChange: (value: any) => void;
  label: string;
}) => {
  const [opened, open] = useState<boolean>(false),
    menuRef = useRef<HTMLDivElement>(null),
    t = useTranslations("sales.listing.filters");

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!opened) return;
      const key = e.key.toUpperCase(),
        match = options.find((o) => o.name.toUpperCase().startsWith(key));
      if (match) {
        const i = options.indexOf(match);
        if (menuRef.current) {
          const buttons = menuRef.current.querySelectorAll("button");
          if (buttons[i])
            buttons[i].scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
    };

    if (opened) window.addEventListener("keypress", handleKeyPress);

    return () => window.removeEventListener("keypress", handleKeyPress);
  }, [opened]);

  return (
    <div className={"filter border-b-[0.25vh] border-black pb-[0.5vh]"}>
      <button
        type={"button"}
        onBlur={() => setTimeout(() => open(false), 200)}
        onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
          e.preventDefault();
          setTimeout(() => open(!opened), 200);
        }}
        className={"w-full flex justify-start items-center gap-[0.5vw]"}
      >
        <label className={"cursor-pointer"}>{label}</label>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          viewBox="0 0 72 72"
          className={`fill-black lg:size-[1vw] h-[1rem] ${opened ? "-rotate-180" : ""} transition-transform duration-200 ease-in-out`}
        >
          <path d="M35.98,50.002c-1.046,0-2.093-0.395-2.863-1.185L13.595,28.809c-1.542-1.581-1.512-4.114,0.069-5.656	c1.582-1.542,4.113-1.512,5.657,0.069L35.98,40.296l16.698-17.113c1.544-1.582,4.076-1.612,5.657-0.069s1.611,4.075,0.069,5.656	L38.844,48.817C38.073,49.607,37.026,50.002,35.98,50.002z"></path>
        </svg>
      </button>
      <label className={"w-full h-max normal-case"}>
        {currentOption === undefined
          ? options.find((option) => option.value === undefined).label
          : currentOption}
      </label>
      {opened && (
        <div
          className={
            "absolute translate-y-[1rem] flex flex-col justify-start items-start bg-white md:w-max w-[92vw] max-h-[18vh] overflow-y-auto drop-shadow-2xl gap-[1vh] px-[0.5vw] py-[0.5vw] rounded-[1vh] z-10"
          }
          ref={menuRef}
        >
          {options.map((option) => (
            <button
              key={option.label}
              type={"button"}
              onClick={() => {
                onChange(option.value);
                console.log(option.value);
                open(false);
              }}
              className={
                "w-full flex justify-start items-baseline lg:gap-[0.5vw] gap-[1vh] hover:bg-rock-100 transition-[background-color] duration-100 ease-in-out rounded-[0.5vh] lg:px-[1vw] px-[2vw] lg:py-[0.5vh] py-[2vw]"
              }
            >
              <label
                className={`text-wrap text-left cursor-pointer normal-case ${currentOption === option.value ? "font-medium" : ""}`}
              >
                {option.label}
              </label>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export const Range = ({
  min,
  max,
  step,
  onChange,
  dataType,
}: {
  min: number;
  max: number;
  step: number;
  onChange: (value: { min: number; max: number }) => void;
  dataType?: "length" | "price";
}) => {
  const [value, setValue] = useState({ min: min, max: max }),
    { currency, units, rates } = useViewContext();

  useEffect(() => {
    onChange({ min: value.min, max: value.max });
  }, [value]);

  return (
    <>
      <label className={"lowercase"}>
        {dataType === "price"
          ? formatCurrency(value.min * rates[currency], currency) +
            " – " +
            formatCurrency(value.max * rates[currency], currency)
          : dataType === "length"
            ? convertUnit(value.min, units.length) +
              " – " +
              convertUnit(value.max, units.length)
            : value.min + " – " + value.max}
      </label>
      <ReactSlider
        className={"w-full h-[3vh] flex justify-between items-center"}
        trackClassName={"bg-black h-[0.25vh] hover:cursor-pointer"}
        thumbClassName={
          "bg-black size-[1rem] outline-none rounded-full cursor-grab active:cursor-grabbing"
        }
        min={min}
        max={max}
        step={step}
        defaultValue={[min, max]}
        value={[value.min, value.max]}
        minDistance={step}
        onChange={(value, index) => {
          setValue({ min: value[0], max: value[1] });
        }}
      />
    </>
  );
};

export const ListingModifier = ({
  options,
  label,
  onChange,
}: {
  options: any[];
  label: string;
  onChange: (e: any) => void;
}) => {
  const [opened, open] = useState<boolean>(false),
    menuRef = useRef<HTMLDivElement>(null),
    t = useTranslations("sales.listing.filters");

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!opened) return;
      const key = e.key.toUpperCase(),
        match = options.find((o) => o.name.toUpperCase().startsWith(key));
      if (match) {
        const i = options.indexOf(match);
        if (menuRef.current) {
          const buttons = menuRef.current.querySelectorAll("button");
          if (buttons[i])
            buttons[i].scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
    };

    if (opened) window.addEventListener("keypress", handleKeyPress);

    return () => window.removeEventListener("keypress", handleKeyPress);
  }, [opened]);

  return (
    <div className={"w-1/2"}>
      <button
        type={"button"}
        onBlur={() => setTimeout(() => open(false), 200)}
        onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
          e.preventDefault();
          setTimeout(() => open(!opened), 200);
        }}
        className={"w-full flex justify-start items-center gap-[0.5vw]"}
      >
        <label className={"cursor-pointer"}>{label}</label>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          viewBox="0 0 72 72"
          className={`fill-black lg:size-[1vw] h-[1rem] ${opened ? "-rotate-180" : ""} transition-transform duration-200 ease-in-out`}
        >
          <path d="M35.98,50.002c-1.046,0-2.093-0.395-2.863-1.185L13.595,28.809c-1.542-1.581-1.512-4.114,0.069-5.656	c1.582-1.542,4.113-1.512,5.657,0.069L35.98,40.296l16.698-17.113c1.544-1.582,4.076-1.612,5.657-0.069s1.611,4.075,0.069,5.656	L38.844,48.817C38.073,49.607,37.026,50.002,35.98,50.002z"></path>
        </svg>
      </button>
      {opened && (
        <div
          className={
            "absolute flex flex-col justify-start items-start bg-white w-max h-max overflow-y-auto drop-shadow-2xl gap-[1vh] px-[0.5vw] py-[0.5vw] rounded-[1vh]"
          }
          ref={menuRef}
        >
          {options.map((option) => (
            <button
              key={option.value}
              type={"button"}
              onClick={() => {
                onChange(option.value);
                open(false);
              }}
              className={
                "w-full flex justify-start items-baseline lg:gap-[0.5vw] gap-[1vh] hover:bg-rock-100 transition-[background-color] duration-100 ease-in-out rounded-[0.5vh] lg:px-[1vw] px-[2vw] lg:py-[0.5vh] py-[2vw]"
              }
            >
              <label className={"text-wrap text-left cursor-pointer"}>
                {option.label}
              </label>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
