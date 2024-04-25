import { createContext, useContext, useState } from "react";
import { IUser } from "@/types/user";
import { currency } from "@/utils/yachts";

interface IContext {
  user: IUser;
  setUser: (user: IUser) => void;
}

const UserContext = createContext<IContext | undefined>(undefined);

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (context === undefined)
    throw new Error("useUserContext must be used within a UserProvider.");

  return context;
};

export const UserProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const currencySymbol = () => {
      switch (currency()) {
        case "EUR":
          return "€";
        case "USD":
          return "$";
        case "GBP":
          return "£";
        case "JPY":
          return "¥";
        default:
          return "";
      }
    },
    [user, setUser] = useState<IUser>({
      currency: {
        code: currency(),
        symbol: currencySymbol(),
      },
    });

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
