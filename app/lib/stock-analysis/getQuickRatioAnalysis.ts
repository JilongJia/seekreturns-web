import {
  quickRatioConfig,
  type QuickRatioCategory,
} from "@/app/config/industry-standards/quick-ratio";

export type GetQuickRatioAnalysisParams = {
  quickRatio: number;
  industry: string;
};

type DataNotAvailableResult = { type: "DataNotAvailable" };
type IndicatorNotApplicableResult = { type: "IndicatorNotApplicable" };
type DefaultStandardAppliedResult = {
  type: "DefaultStandardApplied";
  category: QuickRatioCategory;
};
type IndustrySpecificStandardAppliedResult = {
  type: "IndustrySpecificStandardApplied";
  category: QuickRatioCategory;
};

export type QuickRatioAnalysisResult =
  | DataNotAvailableResult
  | IndicatorNotApplicableResult
  | DefaultStandardAppliedResult
  | IndustrySpecificStandardAppliedResult;

export function getQuickRatioAnalysis({
  quickRatio,
  industry,
}: GetQuickRatioAnalysisParams): QuickRatioAnalysisResult {
  if (quickRatio === 0) {
    return { type: "DataNotAvailable" };
  }

  const standard = quickRatioConfig[industry] || quickRatioConfig._defaults;

  if (standard.type === "NotApplicable") {
    return { type: "IndicatorNotApplicable" };
  }

  const sortedZones = [...standard.zones].sort(
    (a, b) => a.upperBound - b.upperBound,
  );
  const matchingZone = sortedZones.find(
    (zone) => quickRatio <= zone.upperBound,
  );

  const category: QuickRatioCategory = matchingZone
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
