import {
  priceToEarningsRatioConfig,
  type PriceToEarningsRatioCategory,
} from "@/app/config/industry-standards/price-to-earnings-ratio";

export type GetPriceToEarningsRatioAnalysisParams = {
  priceToEarningsRatio: number;
  industry: string;
};

type DataNotAvailableResult = { type: "DataNotAvailable" };
type IndicatorNotApplicableResult = { type: "IndicatorNotApplicable" };
type DefaultStandardAppliedResult = {
  type: "DefaultStandardApplied";
  category: PriceToEarningsRatioCategory;
};
type IndustrySpecificStandardAppliedResult = {
  type: "IndustrySpecificStandardApplied";
  category: PriceToEarningsRatioCategory;
};

export type PriceToEarningsRatioAnalysisResult =
  | DataNotAvailableResult
  | IndicatorNotApplicableResult
  | DefaultStandardAppliedResult
  | IndustrySpecificStandardAppliedResult;

export function getPriceToEarningsRatioAnalysis({
  priceToEarningsRatio,
  industry,
}: GetPriceToEarningsRatioAnalysisParams): PriceToEarningsRatioAnalysisResult {
  if (priceToEarningsRatio === 0) {
    return { type: "DataNotAvailable" };
  }

  const standard =
    priceToEarningsRatioConfig[industry] ||
    priceToEarningsRatioConfig._defaults;

  if (standard.type === "NotApplicable") {
    return { type: "IndicatorNotApplicable" };
  }

  const sortedZones = [...standard.zones].sort(
    (a, b) => a.upperBound - b.upperBound,
  );
  const matchingZone = sortedZones.find(
    (zone) => priceToEarningsRatio <= zone.upperBound,
  );

  const category: PriceToEarningsRatioCategory = matchingZone
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
