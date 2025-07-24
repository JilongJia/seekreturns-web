import { propertyNames } from "@/constants/properties";
import type { PropertyKey } from "@/constants/properties";

type Language = "en" | "zh";
type NameType = "short" | "long";

export function getPropertyName(
  key: PropertyKey,
  lang: Language = "en",
  nameType: NameType = "short",
): string {
  const propertyInfo = propertyNames.find((p) => p.property === key);

  if (!propertyInfo) {
    return key;
  }

  const fieldMap: Record<
    Language,
    Record<NameType, keyof typeof propertyInfo>
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
  return propertyInfo[field];
}
