import {
  forwardPEGRatioConfig,
  type ForwardPEGRatioCategory,
} from "@/app/config/industry-standards/forward-peg-ratio";

export type GetForwardPEGRatioAnalysisParams = {
  forwardPEGRatio: number;
  industry: string;
};

type DataNotAvailableResult = { type: "DataNotAvailable" };
type IndicatorNotApplicableResult = { type: "IndicatorNotApplicable" };
type DefaultStandardAppliedResult = {
  type: "DefaultStandardApplied";
  category: ForwardPEGRatioCategory;
};
type IndustrySpecificStandardAppliedResult = {
  type: "IndustrySpecificStandardApplied";
  category: ForwardPEGRatioCategory;
};

export type ForwardPEGRatioAnalysisResult =
  | DataNotAvailableResult
  | IndicatorNotApplicableResult
  | DefaultStandardAppliedResult
  | IndustrySpecificStandardAppliedResult;

export function getForwardPEGRatioAnalysis({
  forwardPEGRatio,
  industry,
}: GetForwardPEGRatioAnalysisParams): ForwardPEGRatioAnalysisResult {
  if (forwardPEGRatio === 0) {
    return { type: "DataNotAvailable" };
  }

  const standard =
    forwardPEGRatioConfig[industry] || forwardPEGRatioConfig._defaults;

  if (standard.type === "NotApplicable") {
    return { type: "IndicatorNotApplicable" };
  }

  const sortedZones = [...standard.zones].sort(
    (a, b) => a.upperBound - b.upperBound,
  );
  const matchingZone = sortedZones.find(
    (zone) => forwardPEGRatio <= zone.upperBound,
  );

  const category: ForwardPEGRatioCategory = matchingZone
    ? matchingZone.category
    : "Fair";

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
