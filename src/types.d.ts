declare namespace Intl {
  // TODO: Remove when this bug is fixed:
  // https://github.com/microsoft/TypeScript/issues/49231
  // Also see: http://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/supportedValuesOf
  function supportedValuesOf(key: string): string[];

  // TODO: Remove when TypeScript supports this:
  // See: http://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/getCanonicalLocales
  function getCanonicalLocales(locales: string | string[]): string[];

  // TODO: Remove when TypeScript adds the support.
  interface Locale {
    calendars: string[];
    hourCycles: LocaleHourCycleKey[];
    numberingSystems: string[];
    textInfo: {
      direction: 'ltr' | 'rtl';
    };
    timeZones: string[];
    weekInfo: {
      firstDay: 1 | 2 | 3 | 4 | 5 | 6 | 7;
      weekend: [1 | 2 | 3 | 4 | 5 | 6 | 7, 1 | 2 | 3 | 4 | 5 | 6 | 7];
      minimalDays: 1 | 7;
    };
  }

  // TODO: Remove when this bug is fixed:
  // https://github.com/microsoft/TypeScript/issues/51023
  // Also see: http://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/ListFormat/resolvedOptions
  interface ListFormat {
    resolvedOptions(): ResolvedListFormatOptions;
  }

  // TODO: Remove when this is supported in TypeScript.
  type ListFormatPart = {type: 'element' | 'literal', value: string};
}
