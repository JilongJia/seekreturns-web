import { GoogleAnalytics } from "@next/third-parties/google";
import { Inter } from "next/font/google";

import "@/app/globals.css";
import styles from "./layout.module.css";

type RootLayoutProps = {
  children: React.ReactNode;
};

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

function RootLayout({ children }: RootLayoutProps) {
  const isProduction = process.env.NODE_ENV === "production";

  return (
    <html lang="en" className={inter.variable}>
      <body className={styles.body}>{children}</body>
      {isProduction && <GoogleAnalytics gaId="G-1WHQNHHT0M" />}
    </html>
  );
}

export default RootLayout;
