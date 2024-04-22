import dynamic from "next/dynamic";
import { ContactProvider } from "@/contexts/contact";
import { motion, AnimatePresence } from "framer-motion";

const Navigation: React.ComponentType<{
  open: (value: "navigation" | "contact" | undefined) => void;
}> = dynamic(() => import("@/components/nav/navigation"));
const Contact: React.ComponentType<{
  open: (value: "navigation" | "contact" | undefined) => void;
}> = dynamic(() => import("@/components/nav/contact"));

const Burger = ({
  opened,
  setOpened,
}: {
  opened: "navigation" | "contact" | undefined;
  setOpened: (value: "navigation" | "contact" | undefined) => void;
}) => {
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
            onClick={() => setOpened(undefined)}
          />
        )}
        {opened === "navigation" && (
          <Navigation key={"navigation"} open={setOpened} />
        )}
        {opened === "contact" && (
          <ContactProvider>
            <Contact key={"contact"} open={setOpened} />
          </ContactProvider>
        )}
      </AnimatePresence>
      <button
        onClick={() => setOpened("navigation")}
        className={
          "h-[2.7vh] center flex-col lg:w-[2vw] w-[8vw] gap-[0.5vh] lg:hover:gap-[0.75vh] lg:transition-[gap] lg:duration-200 lg:ease-in-out"
        }
      >
        <div className={"burger-bar"} />
        <div className={"burger-bar"} />
        <div className={"burger-bar"} />
      </button>
    </>
  );
};

export default Burger;
