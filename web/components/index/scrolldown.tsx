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

    if (button) {
      button.addEventListener("click", scrollDown);
    }

    return () => {
      if (button) {
        button.removeEventListener("click", scrollDown);
      }
    };
  }, []);

  if (!isVisible) return null;

  return (
    <button
      ref={buttonRef}
      className="absolute bottom-20 left-28 text-white font-light py-2 px-4 text-3xl hide-on-mobile"
      aria-label="Scroll down"
    >
      🡣
    </button>
  );
};

export default Scrolldown;
