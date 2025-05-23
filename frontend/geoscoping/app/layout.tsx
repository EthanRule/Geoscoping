import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "../components/layout/header";
import Footer from "../components/layout/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Geoscoping - Natural Disaster Tracker",
  description:
    "Worldwide natural disaster tracker. View and explore geological events.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}
      >
        <Header />
        <main className="flex-grow container mx-auto px-4 py-20 ">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
