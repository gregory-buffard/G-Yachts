import { createContext, useContext, useState } from "react";
import { IContact } from "@/types/contact";

interface IContext {
  contactCard: IContact;
  setContactCard: (value: IContact) => void;
}

const ContactContext = createContext<IContext | undefined>(undefined);

export const useContactCard = () => {
  const context = useContext(ContactContext);
  if (context === undefined) {
    throw new Error("useContactCard must be used within a ContactProvider.");
  }
  return context;
};

export const ContactProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [contactCard, setContactCard] = useState<IContact>({
    name: "",
    email: "",
    tel: "",
    message: "",
    inquiry: {
      buying: false,
      selling: false,
      chartering: false,
      other: false,
    },
  });

  return (
    <ContactContext.Provider value={{ contactCard, setContactCard }}>
      {children}
    </ContactContext.Provider>
  );
};
