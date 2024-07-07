import Cookies from "js-cookie";
import { IContext } from "@/context/view";

export const currency = (): IContext["currency"] => {
  const currency = Cookies.get("currency") as IContext["currency"];
  if (currency) return currency;
  Cookies.set("currency", "EUR");
  return "EUR";
};

export const units = (): IContext["units"] => {
  const units = {
    length: Cookies.get("length"),
    weight: Cookies.get("weight"),
  };
  if (units.weight && units.length)
    return units as unknown as IContext["units"];

  Cookies.set("length", "m");
  Cookies.set("weight", "t");
  return { length: "m", weight: "t" };
};

export const bookmarks = (): IContext["bookmarks"] => {
  const bookmarks = Cookies.get("bookmarks");
  if (bookmarks) return JSON.parse(bookmarks);
  Cookies.set("bookmarks", "[]");
  return [];
};

export const convertUnit = (amount: number, unit: string) => {
  switch (unit) {
    case "m":
      return amount + "m";
    case "ft":
      return (amount * 3.28084).toFixed(0) + "ft";
    default:
      return amount + "m";
  }
};

export const formatCurrency = (amount: number, currency: string) => {
  if (amount === 0) return "";

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

export const remapYachtPhotos = (yacht: any) => {
  return {
    ...yacht,
    photos: {
      featured: yacht.photos.featured.url,
      gallery: yacht.photos.gallery.map((photo: any) => photo.image.url),
    },
    broker: {
      ...yacht.broker,
      langs: yacht.broker.langs.map((lang: any) => lang.lang),
    },
  };
};
