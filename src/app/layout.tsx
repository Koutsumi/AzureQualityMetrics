import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { ToastProvider } from "@/shared/contexts/toast.context";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Controle de qualidade da BNP",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br" className="flex justify-center px-10 pt-20">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-slate-50 w-full max-w-screen-xl`}
      >
        <ToastProvider>{children}</ToastProvider>
      </body>
    </html>
  );
}
