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
  interface Locale {
    textInfo: {
      direction: 'ltr' | 'rtl';
    }
  }

  // TODO: Remove when this bug is fixed:
  // https://github.com/microsoft/TypeScript/issues/51023
  // Also see: http://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/ListFormat/resolvedOptions
  interface ListFormat {
    resolvedOptions(): ResolvedListFormatOptions;
  }
}
