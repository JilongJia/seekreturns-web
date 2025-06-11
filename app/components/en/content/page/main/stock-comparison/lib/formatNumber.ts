type FormatNumberParams = {
  number: number | null;
};

export function formatNumber({ number }: FormatNumberParams): string {
  if (number === null) {
    return "--";
  }
  return number.toFixed(2);
}
