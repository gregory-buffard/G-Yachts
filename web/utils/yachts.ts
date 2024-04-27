import Cookies from "js-cookie";

export const currency = (): string => {
  const currency = Cookies.get("currency");
  if (currency) return currency;
  Cookies.set("currency", "EUR");
  return "EUR";
};

export const formatCurrency = (amount: number, currency: string) => {
  switch (currency) {
    case "EUR":
      return Number(amount.toFixed(0)).toLocaleString("fr-FR", {
        style: "currency",
        currency: currency,
        maximumFractionDigits: 0,
      });
    case "USD":
      return Number(amount.toFixed(0)).toLocaleString("en-US", {
        style: "currency",
        currency: currency,
        maximumFractionDigits: 0,
      });
    case "GBP":
      return Number(amount.toFixed(0)).toLocaleString("en-GB", {
        style: "currency",
        currency: currency,
        maximumFractionDigits: 0,
      });
    case "JPY":
      return Number(amount.toFixed(0)).toLocaleString("ja-JP", {
        style: "currency",
        currency: currency,
        maximumFractionDigits: 0,
      });
    default:
      return Number(amount.toFixed(0)).toLocaleString("fr-FR", {
        style: "currency",
        currency: currency,
        maximumFractionDigits: 0,
      });
  }
};
