const defaultOptions: Intl.DateTimeFormatOptions = {
  weekday: "short",
  year: "numeric",
  month: "long",
  day: "numeric",
};

/**
 * This function is to convert ISO date string to local date string.
 *
 * @return local date string
 */
export default function convertISODateStr(
  isoDateStr: string,
  locales: Intl.LocalesArgument = "en-US",
  options = defaultOptions
) {
  return new Date(isoDateStr).toLocaleDateString(locales, options);
}
