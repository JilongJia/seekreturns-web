import {
  debtToEquityRatioConfig,
  type DebtToEquityRatioCategory,
} from "@/app/config/industry-standards/debt-to-equity-ratio";

export type GetDebtToEquityRatioAnalysisParams = {
  debtToEquityRatio: number;
  industry: string;
};

type DataNotAvailableResult = { type: "DataNotAvailable" };
type IndicatorNotApplicableResult = { type: "IndicatorNotApplicable" };
type DefaultStandardAppliedResult = {
  type: "DefaultStandardApplied";
  category: DebtToEquityRatioCategory;
};
type IndustrySpecificStandardAppliedResult = {
  type: "IndustrySpecificStandardApplied";
  category: DebtToEquityRatioCategory;
};

export type DebtToEquityRatioAnalysisResult =
  | DataNotAvailableResult
  | IndicatorNotApplicableResult
  | DefaultStandardAppliedResult
  | IndustrySpecificStandardAppliedResult;

export function getDebtToEquityRatioAnalysis({
  debtToEquityRatio,
  industry,
}: GetDebtToEquityRatioAnalysisParams): DebtToEquityRatioAnalysisResult {
  if (debtToEquityRatio === 0) {
    return { type: "DataNotAvailable" };
  }

  const standard =
    debtToEquityRatioConfig[industry] || debtToEquityRatioConfig._defaults;

  if (standard.type === "NotApplicable") {
    return { type: "IndicatorNotApplicable" };
  }

  const sortedZones = [...standard.zones].sort(
    (a, b) => a.upperBound - b.upperBound,
  );
  const matchingZone = sortedZones.find(
    (zone) => debtToEquityRatio <= zone.upperBound,
  );

  const category: DebtToEquityRatioCategory = matchingZone
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
