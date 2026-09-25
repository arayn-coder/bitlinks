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
    icon: '/bitlinks-logo.png', // looks inside the public/ folder
    shortcut: '/bitlinks-logo.png',
    apple: '/apple-touch-bitlinks-icon.png', // optional
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
