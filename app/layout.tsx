import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Verity Beta — Join the Inner Circle",
  description:
    "Help us kill the Shadow Spreadsheet. Sign up for the Verity beta and get early access to the CRM data integrity platform.",
  openGraph: {
    title: "Verity Beta — Join the Inner Circle",
    description: "Help us kill the Shadow Spreadsheet. Sign up for early access.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans`}>{children}</body>
    </html>
  );
}
