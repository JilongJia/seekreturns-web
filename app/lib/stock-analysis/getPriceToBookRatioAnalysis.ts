import {
  priceToBookRatioConfig,
  type PriceToBookRatioCategory,
} from "@/app/config/industry-standards/price-to-book-ratio";

export type GetPriceToBookRatioAnalysisParams = {
  priceToBookRatio: number;
  industry: string;
};

type DataNotAvailableResult = { type: "DataNotAvailable" };
type IndicatorNotApplicableResult = { type: "IndicatorNotApplicable" };
type DefaultStandardAppliedResult = {
  type: "DefaultStandardApplied";
  category: PriceToBookRatioCategory;
};
type IndustrySpecificStandardAppliedResult = {
  type: "IndustrySpecificStandardApplied";
  category: PriceToBookRatioCategory;
};

export type PriceToBookRatioAnalysisResult =
  | DataNotAvailableResult
  | IndicatorNotApplicableResult
  | DefaultStandardAppliedResult
  | IndustrySpecificStandardAppliedResult;

export function getPriceToBookRatioAnalysis({
  priceToBookRatio,
  industry,
}: GetPriceToBookRatioAnalysisParams): PriceToBookRatioAnalysisResult {
  if (priceToBookRatio === 0) {
    return { type: "DataNotAvailable" };
  }

  const standard =
    priceToBookRatioConfig[industry] || priceToBookRatioConfig._defaults;

  if (standard.type === "NotApplicable") {
    return { type: "IndicatorNotApplicable" };
  }

  const sortedZones = [...standard.zones].sort(
    (a, b) => a.upperBound - b.upperBound,
  );
  const matchingZone = sortedZones.find(
    (zone) => priceToBookRatio <= zone.upperBound,
  );

  const category: PriceToBookRatioCategory = matchingZone
    ? matchingZone.category
    : "Moderate";

  if (standard.type === "Default") {
    return {
      type: "DefaultStandardApplied",
      category,
    };
  } else {
    return {
      type: "IndustrySpecificStandardApplied",
      category,
    };
  }
}
