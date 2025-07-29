import { displayNames } from "@/constants/stock";
import type { StockInfoKey } from "@/constants/stock";

type Language = "en" | "zh";
type NameType = "short" | "long";

export function getDisplayName(
  key: StockInfoKey,
  lang: Language = "en",
  nameType: NameType = "short",
): string {
  const displayNameInfo = displayNames.find((d) => d.key === key);

  if (!displayNameInfo) {
    return key;
  }

  const fieldMap: Record<
    Language,
    Record<NameType, keyof typeof displayNameInfo>
  > = {
    en: {
      short: "shortNameEn",
      long: "longNameEn",
    },
    zh: {
      short: "shortNameZh",
      long: "longNameZh",
    },
  };

  const field = fieldMap[lang][nameType];
  return displayNameInfo[field];
}
