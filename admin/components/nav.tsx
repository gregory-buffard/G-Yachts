"use client";

import { useView } from "@/app/view";

const Selector = () => {
  return <button></button>;
};

const Nav = () => {
  const { view, openView } = useView();

  return (
    <nav>
      <button></button>
    </nav>
  );
};

export default Nav;
