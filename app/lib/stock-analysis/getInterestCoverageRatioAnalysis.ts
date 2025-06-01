import {
  interestCoverageRatioConfig,
  type InterestCoverageRatioCategory,
} from "@/app/config/industry-standards/interest-coverage-ratio";

export type GetInterestCoverageRatioAnalysisParams = {
  interestCoverageRatio: number;
  industry: string;
};

type DataNotAvailableResult = { type: "DataNotAvailable" };
type IndicatorNotApplicableResult = { type: "IndicatorNotApplicable" };
type DefaultStandardAppliedResult = {
  type: "DefaultStandardApplied";
  category: InterestCoverageRatioCategory;
};
type IndustrySpecificStandardAppliedResult = {
  type: "IndustrySpecificStandardApplied";
  category: InterestCoverageRatioCategory;
};

export type InterestCoverageRatioAnalysisResult =
  | DataNotAvailableResult
  | IndicatorNotApplicableResult
  | DefaultStandardAppliedResult
  | IndustrySpecificStandardAppliedResult;

export function getInterestCoverageRatioAnalysis({
  interestCoverageRatio,
  industry,
}: GetInterestCoverageRatioAnalysisParams): InterestCoverageRatioAnalysisResult {
  if (interestCoverageRatio === 0) {
    return { type: "DataNotAvailable" };
  }

  const standard =
    interestCoverageRatioConfig[industry] ||
    interestCoverageRatioConfig._defaults;

  if (standard.type === "NotApplicable") {
    return { type: "IndicatorNotApplicable" };
  }

  const sortedZones = [...standard.zones].sort(
    (a, b) => a.upperBound - b.upperBound,
  );
  const matchingZone = sortedZones.find(
    (zone) => interestCoverageRatio <= zone.upperBound,
  );

  const category: InterestCoverageRatioCategory = matchingZone
    ? matchingZone.category
    : "Adequate";

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
