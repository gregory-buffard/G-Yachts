"use client";

import React, { useRef, useEffect, useState } from "react";

const Scrolldown: React.FC = () => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const button = buttonRef.current;
    const scrollDown = () => {
      window.scrollBy({ top: window.innerHeight, behavior: "smooth" });
      setIsVisible(false);
    };

    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsVisible(false);
      }
    };

    if (button) {
      button.addEventListener("click", scrollDown);
      window.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (button) {
        button.removeEventListener("click", scrollDown);
      }
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <button
      ref={buttonRef}
      className="hidden md:block absolute z-10 animate-bounce bottom-16 left-28 text-white font-light py-2 px-4 text-3xl"
      aria-label="Scroll down"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        x="0px"
        y="0px"
        viewBox="0 0 64 64"
        fill="currentColor"
        className={"w-10 h-7"}
      >
        <path d="M 32 10 C 30.896 10 30 10.896 30 12 L 30 47.279297 L 18.431641 36.076172 C 17.637641 35.308172 16.370516 35.329047 15.603516 36.123047 C 14.835516 36.916047 14.855438 38.182172 15.648438 38.951172 L 30.607422 53.4375 C 30.995422 53.8125 31.498 54 32 54 C 32.502 54 33.003625 53.8125 33.390625 53.4375 L 48.351562 38.951172 C 49.144562 38.183172 49.165484 36.916047 48.396484 36.123047 C 47.629484 35.329047 46.362359 35.308172 45.568359 36.076172 L 34 47.279297 L 34 12 C 34 10.896 33.104 10 32 10 z"></path>
      </svg>
    </button>
  );
};

export default Scrolldown;
