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
  return (
    <html lang="en" className={inter.variable}>
      <body className={styles.body}>{children}</body>
    </html>
  );
}

export default RootLayout;
