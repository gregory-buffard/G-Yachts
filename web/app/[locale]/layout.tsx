import "../globals.css";
import { NextIntlClientProvider, useMessages } from "next-intl";
import { getTranslations } from "next-intl/server";
import { Viewport } from "next";

export const generateMetadata = async ({
  params: { locale },
}: {
  params: { locale: "en" | "fr" };
}) => {
  const t = await getTranslations({ locale, namespace: "index.metadata" });
  return {
    title: t("title"),
    description: t("description"),
    keywords: t("keywords"),
    author: t("author"),
  };
};

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
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
};

export default RootLayout;
