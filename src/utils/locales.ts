export function normalizeLocale(locale: string): Intl.BCP47LanguageTag | '' {
  if (typeof locale === 'string') {
    locale = locale.trim().replace(/_/g, '-');
    try {
      return Intl.getCanonicalLocales(locale)[0]!;
    } catch {}
  }

  return '';
}

export function isLocaleRtl(locale: Intl.BCP47LanguageTag): boolean {
  try {
    return new Intl.Locale(locale).textInfo.direction === 'rtl';
  } catch {}

  return false;
}
