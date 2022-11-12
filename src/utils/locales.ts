export function localesToLocaleList(
  locales: string,
  localeMatcher: Intl.RelativeTimeFormatLocaleMatcher
): Intl.BCP47LanguageTag[] {
  try {
    return Intl.DisplayNames
        .supportedLocalesOf(locales.split(' '), {localeMatcher});
  } catch {
    return [];
  }
}
