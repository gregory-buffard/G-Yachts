import "../globals.css";
import { NextIntlClientProvider, useMessages } from "next-intl";
import { Viewport } from "next";
import { ViewProvider } from "@/context/view";
import { GoogleAnalytics } from "@next/third-parties/google";

export const viewport: Viewport = {
  themeColor: "#F9F5F2",
};

const RootLayout: React.FC<{
  children: React.ReactNode;
  params: { locale: "en" | "fr" };
}> = ({ children, params: { locale } }) => {
  const messages = useMessages(),
    GA_ID = process.env.GOOGLE_ANALYTICS_ID;

  return (
    <html lang={locale}>
      {GA_ID && <GoogleAnalytics gaId={GA_ID} />}
      <body>
        <NextIntlClientProvider messages={messages}>
          <ViewProvider>{children}</ViewProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
};

export default RootLayout;
