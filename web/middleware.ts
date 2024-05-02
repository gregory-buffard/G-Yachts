import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { localePrefix, pathnames } from "@/navigation";
import { locales } from "@/i18n";

const nextIntlMiddleware = createMiddleware({
  defaultLocale: "en",
  localePrefix,
  locales,
  pathnames,
});

export default function (req: NextRequest): NextResponse {
  return nextIntlMiddleware(req);
}

export const config = {
  matcher: ["/", "/(fr|en)/:path*"],
};
