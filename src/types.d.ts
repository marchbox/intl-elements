declare namespace Intl {
  // TODO: Remove when this bug is fixed:
  // https://github.com/microsoft/TypeScript/issues/51023
  // Also see: http://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/ListFormat/resolvedOptions
  interface ResolvedListFormatOptions {
    locale: Intl.BCP47LanguageTag;
    style: Intl.ListFormatStyle;
    type: Intl.ListFormatType;
  }

  // TODO: Remove when this bug is fixed:
  // https://github.com/microsoft/TypeScript/issues/49231
  // Also see: http://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/supportedValuesOf
  type SupportedValueKey = 'calendar' | 'collation' | 'currency' |
      'numberingSystem' | 'timeZone' | 'unit';
  type SupportedValuesReturnType = string[];
  function supportedValuesOf(key: SupportedValueKey): SupportedValuesReturnType;

  // TODO: Remove when TypeScript adds the support.
  type LocaleTextInfoDirection = 'lrt' | 'rtl';
  // See: http://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Locale/textInfo
  interface LocaleTextInfo {
    direction: LocaleTextInfoDirection;
  }
  // See: http://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Locale/weekInfo
  type LocaleWeekInfoValue = 1 | 2 | 3 | 4 | 5 | 6 | 7;
  interface LocaleWeekInfo {
    firstDay: LocaleWeekInfoValue;
    weekend: [LocaleWeekInfoValue, LocaleWeekInfoValue];
    minimalDays: 1 | 7;
  }
  interface Locale {
    calendars: string[];
    hourCycles: LocaleHourCycleKey[];
    numberingSystems: string[];
    textInfo: LocaleTextInfo;
    timeZones: string[];
    weekInfo: LocaleWeekInfo;
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
