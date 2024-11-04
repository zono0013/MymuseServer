import type { Metadata } from "next";
import { Provider as JotaiProvider } from 'jotai';
import {Header} from "@/components/header/Header"
import localFont from "next/font/local";
import "./globals.css";
import {Toaster} from "@/components/ui/toaster";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="jp">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <JotaiProvider>
          <Header/>
          {children}
          <Toaster />
        </JotaiProvider>
      </body>
    </html>
  );
}
