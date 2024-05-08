import {
  createLocalizedPathnamesNavigation,
  Pathnames,
} from "next-intl/navigation";
import { locales } from "@/i18n";

export const localePrefix = "always";
export const pathnames = {
  "/": "/",
  "/sales": {
    en: "/sales",
    fr: "/ventes",
  },
  "/sales/[id]": {
    en: "/sales/[id]",
    fr: "/ventes/[id]",
  },
  "/charters": {
    en: "/charters",
    fr: "/charters",
  },
  "/management": {
    en: "/management",
    fr: "/management",
  },
  "/company": {
    en: "/company",
    fr: "/compagnie",
  },
  "/partners": {
    en: "/partners",
    fr: "/partenaires",
  },
  "/news": {
    en: "/news",
    fr: "/actualites",
  },
  "/recruitment": {
    en: "/recruitment",
    fr: "/recrutement",
  },
  "/contact": {
    en: "/contact",
    fr: "/contact",
  },
} satisfies Pathnames<typeof locales>;

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createLocalizedPathnamesNavigation({ locales, localePrefix, pathnames });
