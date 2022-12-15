export const safeMatch = (value, expression) => {
  try {
    // NOTE: This applies a regex, which may throw for an invalid expression.
    // Example: `\`
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/match
    // Consider expression errors to be negligible, i.e., always match.
    const res = value.match(expression);
    return !!res;
  } catch (e) {
    return true;
  }
}

/**
 * Filter a value by any space delimited substring of `filter`.
 * Trim first, so whitespace-only will be ignored, i.e., always match.
 */
export const matches = (value, filter) => {
  const trimmed = filter.toLowerCase().trim();
  if (trimmed.length === 0) {
    return true;
  }
  const filters = trimmed.split(" ");
  const v = value.toLowerCase();
  return filters.some((f) => safeMatch(v, f));
}
