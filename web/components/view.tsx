"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useViewContext } from "@/context/view";
import Navigation from "@/components/nav/navigation";
import Contact from "@/components/nav/contact";
import Search from "@/components/nav/search";
import Credits from "@/components/credits";

const View = () => {
  const { view, openView } = useViewContext();

  return (
    <AnimatePresence mode={"popLayout"}>
      {view && (
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
            "fixed lg:block hidden w-screen h-screen inset-0 cursor-pointer z-20"
          }
          onClick={() => openView(null)}
        />
      )}
      {view === "navigation" && <Navigation key={"navigation"} />}
      {view === "contact" && <Contact key={"contact"} />}
      {view === "search" && <Search key={"search"} />}
      {view === "credits" && <Credits key={"credits"} />}
    </AnimatePresence>
  );
};

export default View;
