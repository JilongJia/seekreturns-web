import {
  priceToFreeCashFlowRatioConfig,
  type PriceToFreeCashFlowRatioCategory,
} from "@/app/config/industry-standards/price-to-free-cash-flow-ratio";

export type GetPriceToFreeCashFlowRatioAnalysisParams = {
  priceToFreeCashFlowRatio: number;
  industry: string;
};

type DataNotAvailableResult = { type: "DataNotAvailable" };
type IndicatorNotApplicableResult = { type: "IndicatorNotApplicable" };
type DefaultStandardAppliedResult = {
  type: "DefaultStandardApplied";
  category: PriceToFreeCashFlowRatioCategory;
};
type IndustrySpecificStandardAppliedResult = {
  type: "IndustrySpecificStandardApplied";
  category: PriceToFreeCashFlowRatioCategory;
};

export type PriceToFreeCashFlowRatioAnalysisResult =
  | DataNotAvailableResult
  | IndicatorNotApplicableResult
  | DefaultStandardAppliedResult
  | IndustrySpecificStandardAppliedResult;

export function getPriceToFreeCashFlowRatioAnalysis({
  priceToFreeCashFlowRatio,
  industry,
}: GetPriceToFreeCashFlowRatioAnalysisParams): PriceToFreeCashFlowRatioAnalysisResult {
  if (priceToFreeCashFlowRatio === 0) {
    return { type: "DataNotAvailable" };
  }

  const standard =
    priceToFreeCashFlowRatioConfig[industry] ||
    priceToFreeCashFlowRatioConfig._defaults;

  if (standard.type === "NotApplicable") {
    return { type: "IndicatorNotApplicable" };
  }

  const sortedZones = [...standard.zones].sort(
    (a, b) => a.upperBound - b.upperBound,
  );
  const matchingZone = sortedZones.find(
    (zone) => priceToFreeCashFlowRatio <= zone.upperBound,
  );

  const category: PriceToFreeCashFlowRatioCategory = matchingZone
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
