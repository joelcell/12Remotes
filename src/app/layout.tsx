import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SessionWrapper from "@/components/SessionWrapper";
import { LanguageProvider } from "@/context/LanguageContext";
import LanguageSwitcher from "@/components/ui/LanguageSwitcher";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "12remotes - Văn Phòng Trên Mây",
  description: "Global Talent. Local Compliance. Zero Friction.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased min-h-screen flex flex-col`}>
        <LanguageProvider>
          <LanguageSwitcher />
          <SessionWrapper>
            {children}
          </SessionWrapper>
        </LanguageProvider>
      </body>
    </html>
  );
}
