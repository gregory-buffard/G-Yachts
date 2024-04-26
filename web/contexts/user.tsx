import { createContext, useContext, useState } from "react";
import { IUser } from "@/types/user";
import { currency } from "@/utils/yachts";
import Cookies from "js-cookie";

interface IContext {
  user: IUser;
  setUser: (user: IUser) => void;
  setCurrency: (code: string) => void;
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
  const [user, setUser] = useState<IUser>({
    currency: currency(),
  });

  const setCurrency = (code: string) => {
    Cookies.set("currency", code);
    setUser({
      ...user,
      currency: code,
    });
  };

  return (
    <UserContext.Provider value={{ user, setUser, setCurrency }}>
      {children}
    </UserContext.Provider>
  );
};
