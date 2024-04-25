import { createContext, useContext, useState } from "react";

interface IContext {
  translate: number;
  animate: boolean;
}

const FeaturedContext = createContext<IContext | undefined>(undefined);

export const useFeaturedContext = () => {
  const context = useContext(FeaturedContext);
  if (context === undefined)
    throw new Error(
      "useFeaturedContext must be used within a FeaturedProvider.",
    );

  return context;
};

export const FeaturedProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [translate, setTranslate] = useState<IContext["translate"]>(0),
    [animate, setAnimate] = useState<IContext["animate"]>(false);

  return (
    <FeaturedContext.Provider
      value={{ translate: translate, animate: animate }}
    >
      {children}
    </FeaturedContext.Provider>
  );
};
