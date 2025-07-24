import { fetchHreflangPages } from "@/lib/firestore";

import { supportedLocales } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";

type HreflangPage = { pathname: string };

const specialRoutes: Record<string, Locale[]> = {
  "/": ["en", "zh"],
  "/concepts": ["en", "zh"],
  "/guides": ["en", "zh"],
  "/tables": ["en", "zh"],
  "/calculators": ["en", "zh"],
  "/stock-comparisons": ["en", "zh"],
  "/reviews": ["en", "zh"],
  "/about": ["en", "zh"],
  "/privacy-policy": ["en", "zh"],
  "/terms-and-conditions": ["en", "zh"],
  "/search": ["en", "zh"],
};

export async function getHreflangPages(
  pathname: string,
): Promise<HreflangPage[]> {
  const segments = pathname.split("/").filter(Boolean);
  const [maybeLocale, ...rest] = segments;

  if (!supportedLocales.includes(maybeLocale as Locale)) {
    return [];
  }

  if (rest.length === 0) {
    return specialRoutes["/"].map((loc) => ({ pathname: `/${loc}` }));
  }

  if (rest.length === 1 && specialRoutes[`/${rest[0]}`]) {
    return specialRoutes[`/${rest[0]}`].map((loc) => ({
      pathname: `/${loc}/${rest[0]}`,
    }));
  }

  if (rest.length > 1 && rest[0] === "stock-comparisons") {
    const tail = rest.join("/");
    return specialRoutes["/stock-comparisons"].map((loc) => ({
      pathname: `/${loc}/${tail}`,
    }));
  }

  return fetchHreflangPages(pathname);
}
