export function localesToLocaleList(
  locales: string,
  localeMatcher: Intl.RelativeTimeFormatLocaleMatcher
): Intl.BCP47LanguageTag[] {
  try {
    // FIXME: Make this generic instead of being hardcoded to Intl.DisplayNames.
    return Intl.DisplayNames
        .supportedLocalesOf(locales.split(' '), {localeMatcher});
  } catch {
    return [];
  }
}
