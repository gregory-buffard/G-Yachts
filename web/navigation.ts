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
  "/sales/[slug]": {
    en: "/sales/[slug]",
    fr: "/ventes/[slug]",
  },
  "/charters": "/charters",
  "/charters/[slug]": "/charters/[slug]",
  "/new-constructions": {
    en: "/new-constructions",
    fr: "/nouvelles-constructions",
  },
  "/new-constructions/[slug]": {
    en: "/new-constructions/[slug]",
    fr: "/nouvelles-constructions/[slug]",
  },
  "/sell-your-yacht": {
    en: "/sell-your-yacht",
    fr: "/vendre-votre-yacht",
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
  "/news/[slug]": {
    en: "/news/[slug]",
    fr: "/actualites/[slug]",
  },
  "/events": {
    en: "/events",
    fr: "/evenements",
  },
  "/events/[slug]": {
    en: "/events/[slug]",
    fr: "/evenements/[slug]",
  },
  "/recruitment": {
    en: "/recruitment",
    fr: "/recrutement",
  },
  "/contact": {
    en: "/contact",
    fr: "/contact",
  },
  "/destinations": {
    en: "/destinations",
    fr: "/destinations",
  },
  "/destinations/[slug]": "/destinations/[slug]",
  "/brochure/[id]": "/brochure/[id]",
} satisfies Pathnames<typeof locales>;

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createLocalizedPathnamesNavigation({ locales, localePrefix, pathnames });
