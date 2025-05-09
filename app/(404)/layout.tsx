import "@/app/globals.css";
import { type Metadata } from "next";
import { Inter } from "next/font/google";

import styles from "./layout.module.css";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

type RootLayoutProps = {
  children: React.ReactNode;
};

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" className={inter.variable}>
      <body className={styles.body}>{children}</body>
    </html>
  );
}

export default RootLayout;
