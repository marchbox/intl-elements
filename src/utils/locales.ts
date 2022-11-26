export function normalizeLocale(locale: string): Intl.BCP47LanguageTag | null {
  if (typeof locale !== 'string') {
    return null;
  }

  locale = locale.trim().replace(/_/g, '-');
  try {
    return Intl.getCanonicalLocales(locale)?.[0] || null;
  } catch {}

  return null;
}

export function normalizeLocales(locales: string): Intl.BCP47LanguageTag[] {
  if (typeof locales !== 'string') {
    return [];
  }

  locales = locales.trim().replace(/\s+/g, ' ');

  const localeList = locales.split(' ');

  return localeList
      .map(normalizeLocale)
      .filter(Boolean) as Intl.BCP47LanguageTag[];
}

export function normalizeLocaleList(list: string[]): Intl.BCP47LanguageTag[] {
  return list
      .filter(Boolean)
      .filter(locale => typeof locale === 'string')
      .map(normalizeLocale)
      .filter(Boolean) as Intl.BCP47LanguageTag[];
}
