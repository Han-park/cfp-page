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

export default function Layout({
  children,
  params: { lang }
}: {
  children: React.ReactNode;
  params: { lang: Locale };
}) {
  return (
    <html lang={lang}>
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
} 