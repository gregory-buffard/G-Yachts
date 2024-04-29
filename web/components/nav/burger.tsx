import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import { useInteraction } from "@/contexts/interact";

const Navigation: React.ComponentType = dynamic(
  () => import("@/components/nav/navigation"),
);
const Contact: React.ComponentType = dynamic(
  () => import("@/components/nav/contact"),
);

const Burger = ({
  opened,
  setOpened,
  dark,
}: {
  opened: "navigation" | "contact" | null;
  setOpened: (opened: "navigation" | "contact" | null) => void;
  dark: boolean;
}) => {
  const { openUI } = useInteraction();

  return (
    <>
      <AnimatePresence mode={"popLayout"}>
        {opened && (
          <motion.div
            key={"blur"}
            initial={{
              backgroundColor: "rgba(255, 255, 255, 0)",
              backdropFilter: "blur(0)",
            }}
            animate={{
              backgroundColor: "rgba(255, 255, 255, 0.1)",
              backdropFilter: "blur(10px)",
            }}
            exit={{
              backgroundColor: "rgba(255, 255, 255, 0)",
              backdropFilter: "blur(0)",
            }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className={
              "absolute lg:block hidden w-screen h-screen inset-0 cursor-pointer z-20"
            }
            onClick={() => openUI(null)}
          />
        )}
        {opened === "navigation" && <Navigation key={"navigation"} />}
        {opened === "contact" && <Contact key={"contact"} />}
      </AnimatePresence>
      <button
        onClick={() => setOpened("navigation")}
        className={`center flex-col lg:w-[2vw] w-[4vw] gap-[0.5vh] lg:hover:gap-[0.75vh] lg:transition-[gap] duration-200 ease-in-out ${dark ? "fill-black" : "fill-white"}`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 128 8"
          className={"burger-bar"}
        >
          <rect width="128" height="8" rx="4" />
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 128 8"
          className={"burger-bar"}
        >
          <rect width="128" height="8" rx="4" />
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 128 8"
          className={"burger-bar"}
        >
          <rect width="128" height="8" rx="4" />
        </svg>
      </button>
    </>
  );
};

export default Burger;
