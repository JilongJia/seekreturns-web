import {
  currentRatioConfig,
  type CurrentRatioCategory,
} from "@/app/config/industry-standards/current-ratio";

export type GetCurrentRatioAnalysisParams = {
  currentRatio: number;
  industry: string;
};

type DataNotAvailableResult = { type: "DataNotAvailable" };
type IndicatorNotApplicableResult = { type: "IndicatorNotApplicable" };
type DefaultStandardAppliedResult = {
  type: "DefaultStandardApplied";
  category: CurrentRatioCategory;
};
type IndustrySpecificStandardAppliedResult = {
  type: "IndustrySpecificStandardApplied";
  category: CurrentRatioCategory;
};

export type CurrentRatioAnalysisResult =
  | DataNotAvailableResult
  | IndicatorNotApplicableResult
  | DefaultStandardAppliedResult
  | IndustrySpecificStandardAppliedResult;

export function getCurrentRatioAnalysis({
  currentRatio,
  industry,
}: GetCurrentRatioAnalysisParams): CurrentRatioAnalysisResult {
  if (currentRatio === 0) {
    return { type: "DataNotAvailable" };
  }

  const standard = currentRatioConfig[industry] || currentRatioConfig._defaults;

  if (standard.type === "NotApplicable") {
    return { type: "IndicatorNotApplicable" };
  }

  const sortedZones = [...standard.zones].sort(
    (a, b) => a.upperBound - b.upperBound,
  );
  const matchingZone = sortedZones.find(
    (zone) => currentRatio <= zone.upperBound,
  );

  const category: CurrentRatioCategory = matchingZone
    ? matchingZone.category
    : "Normal";

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
