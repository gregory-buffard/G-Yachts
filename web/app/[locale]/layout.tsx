import "../globals.css";
import { NextIntlClientProvider, useMessages } from "next-intl";
import { getTranslations } from "next-intl/server";
import { Viewport } from "next";
import { ViewProvider } from "@/context/view";

export const viewport: Viewport = {
  themeColor: "#F9F5F2",
};

const RootLayout: React.FC<{
  children: React.ReactNode;
  params: { locale: "en" | "fr" };
}> = ({ children, params: { locale } }) => {
  const messages = useMessages();
  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider messages={messages}>
          <ViewProvider>{children}</ViewProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
};

export default RootLayout;
