import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import SessionWrapper from "@/components/SessionWrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "bitlinks",
  description: "Generated your links",
  icons: {
    icon: '/bitlinks-icon.svg', // looks inside the public/ folder
    shortcut: '/bitlinks-icon.svg',
    apple: '/bitlinks-icon.svg', // optional
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >

      <body className="min-h-full flex flex-col">
        <SessionWrapper>
        <Navbar />
        {children}
        </SessionWrapper>
      </body>
    </html>
  );
}
