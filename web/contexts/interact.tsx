import { createContext, useContext, useEffect, useState } from "react";

interface IContext {
  UI: "navigation" | "contact" | null;
  openUI: (UI: "navigation" | "contact" | null) => void;
}

const InteractionContext = createContext<IContext | undefined>(undefined);

export const useInteraction = () => {
  const context = useContext(InteractionContext);
  if (context === undefined)
    throw new Error(
      "useInteraction must be used within a InteractionProvider.",
    );

  return context;
};

export const InteractionProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [UI, openUI] = useState<"navigation" | "contact" | null>(null);

  useEffect(() => {
    console.log(UI);
  }, [UI]);

  return (
    <InteractionContext.Provider value={{ UI, openUI }}>
      {children}
    </InteractionContext.Provider>
  );
};
