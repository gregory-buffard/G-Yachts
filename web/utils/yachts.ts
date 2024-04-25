import Cookies from "js-cookie";

export const currency = (): string => {
  const currency = Cookies.get("currency");
  if (currency) return currency;
  Cookies.set("currency", "EUR");
  return "EUR";
};
