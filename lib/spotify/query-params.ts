type LimitOptions = {
  defaultValue: number;
  max: number;
};

export function getLimitParam(
  searchParams: URLSearchParams,
  { defaultValue, max }: LimitOptions,
) {
  const value = Number(searchParams.get("limit") ?? String(defaultValue));

  if (!Number.isFinite(value)) {
    return defaultValue;
  }

  return Math.min(Math.max(Math.trunc(value), 1), max);
}
