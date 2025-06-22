import { Inter, Noto_Sans_SC } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";

import "@/app/globals.css";
import styles from "./layout.module.css";

type RootLayoutProps = { children: React.ReactNode };

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

const noto_sans_sc = Noto_Sans_SC({
  subsets: ["latin"],
  variable: "--font-noto-sans-sc",
});

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL as string),
};

function RootLayout({ children }: RootLayoutProps) {
  const isProduction = process.env.NODE_ENV === "production";

  return (
    <html lang="en" className={`${inter.variable} ${noto_sans_sc.variable}`}>
      <body className={styles.body}>{children}</body>

      {isProduction && <GoogleAnalytics gaId="G-1WHQNHHT0M" />}
    </html>
  );
}

export default RootLayout;
