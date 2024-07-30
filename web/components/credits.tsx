import { motion } from "framer-motion";

const Credits = () => {
  return (
    <motion.section
      initial={{ y: "100%" }}
      animate={{ y: "0" }}
      exit={{ y: "100%" }}
      transition={{ duration: 0.2, ease: "easeInOut" }}
      className={
        "fixed bottom-0 w-full bg-rock-100 z-30 flex flex-col justify-center items-center"
      }
    ></motion.section>
  );
};

export default Credits;
