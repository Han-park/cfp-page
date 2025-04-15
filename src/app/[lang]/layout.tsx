import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import { Locale } from '@/i18n.config';

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "CFP",
  description: "Community-First Projects",
};

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: Locale };
}) {
  const lang = params.lang;
  
  return (
    <html lang={lang}>
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
} 