export const SUPPORTED_INTL_OPTION_KEYS = [
  'calendar',
  'collation',
  'currency',
  'numberingSystem',
  'timeZone',
  'unit',
];

export const SUPPORTED_OPTION_KEYS = SUPPORTED_INTL_OPTION_KEYS
    .map(key => `option${key[0]!.toUpperCase()}${key.slice(1)}`);

export function getCanonicalIntlOptionValue(
  key: string,
  value: unknown
): unknown {
  if (SUPPORTED_INTL_OPTION_KEYS.includes(key) &&
      typeof value === 'string' && value !== '') {
    switch (key) {
      case 'timeZone':
        // TODO: Better handle this.
        break;
      case 'currency':
        // Currency codes are uppercase.
        value = value.toUpperCase();
        break;
      default:
        // All other values are lowercase.
        value = value.toLowerCase();
    }

    if (!Intl.supportedValuesOf(key as Intl.SupportedValueKey)
        .includes(value as string)) {
      return '';
    }
  }

  return value;
}

export function getCanonicalOptionValue(key: string, value: unknown): unknown {
  const _key = (key as string)
      .replace(/^option([A-Z])/, (_, letter) => letter.toLowerCase());

  return getCanonicalIntlOptionValue(_key, value);
}
