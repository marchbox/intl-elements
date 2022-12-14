import type {PropertyDeclaration} from 'lit';
import {defaultConverter} from 'lit';
import {property} from 'lit/decorators.js';

interface MapValue {
  // Use `Intl.supportedValuesOf` to check if the given value is supported.
  intl?: boolean;
  // Use the value as-is.
  asIs?: boolean;
  // Transform value to upper case.
  upper?: boolean;
  // Transform value to title case.
  title?: boolean;
  // A list of camel-cased values.
  camel?: string[];
}

const SPECIAL_OPTION_MAP: Map<string, MapValue> = new Map([
  ['calendar', {intl: true}],
  ['collation', {intl: true}],
  ['currencyDisplay', {camel: ['narrowSymbol']}],
  ['currency', {intl: true, upper: true}],
  ['numberingSystem', {intl: true}],
  ['region', {upper: true}],
  ['roundingMode', {camel: ['halfCeil', 'halfFloor', 'halfExpand', 'halfTrunc',
      'halfEven']}],
  ['roundingPriority', {camel: ['morePrecision', 'lessPrecision']}],
  ['script', {title: true}],
  ['signDisplay', {camel: ['exceptZero']}],
  ['timeZone', {intl: true, asIs: true}],
  ['timeZoneName', {camel: ['shortOffset', 'longOffset', 'shortGeneric',
      'longGeneric']}],
  ['trailingZeroDisplay', {camel: ['stripIfInteger']}],
  ['type', {camel: ['dateTimeField']}],
  ['unit', {intl: true}],
]);

const SPECIAL_OPTION_KEYS = Array.from(SPECIAL_OPTION_MAP.keys())
    .map(key => `option${key[0]!.toUpperCase()}${key.slice(1)}`);

export function getCanonicalIntlOptionValue(
  key: string,
  value: unknown
): unknown {
  if (SPECIAL_OPTION_MAP.has(key) && value && typeof value === 'string') {
    const spec = SPECIAL_OPTION_MAP.get(key)!;

    if (spec.asIs) {
      // Better handle `timeZone` option.
    } else if (spec.upper) {
      value = value.toUpperCase();
    } else if (spec.title) {
      value = value.toLowerCase().replace(/\w/, l => l.toUpperCase());
    } else if (spec.camel) {
      value = spec.camel
          .find(v => v.toLowerCase() === (value as string).toLowerCase())
          ?? value;
    } else {
      value = value.toLowerCase();
    }

    if (spec.intl && 'supportedValuesOf' in Intl &&
        !Intl.supportedValuesOf(key).includes(value as string)) {
      value = '';
    }
  }

  return value;
}

export function getCanonicalOptionValue(key: string, value: unknown): unknown {
  const _key = key
      .replace(/^option([A-Z])/, (_, letter) => letter.toLowerCase());

  return getCanonicalIntlOptionValue(_key, value);
}

function getOptions(
  name: string,
  options: PropertyDeclaration
): PropertyDeclaration {
  if (name.startsWith('option')) {
    const isSpecialOption = SPECIAL_OPTION_KEYS.includes(name);

    if (options.reflect === undefined) {
      Object.assign(options, {reflect: true});
    }

    if (!options.attribute) {
      Object.assign(options, {
        attribute: name.toLowerCase().replace(/^option/, 'option-')
      });
    }

    if (!options.hasChanged && isSpecialOption) {
      Object.assign(options, {
        hasChanged: (value: unknown, oldValue: unknown) =>
            getCanonicalOptionValue(name, value) !== oldValue
      });
    }

    if (!options.converter) {
      Object.assign(options, {
        converter: {
          fromAttribute: (value: string, type: any = String) =>
              type !== String ? defaultConverter.fromAttribute!(value, type) :
                  isSpecialOption ? getCanonicalOptionValue(name, value) :
                      value.toLocaleLowerCase()
        }
      });
    }
  }

  return options;
}

// Custom decorator for `option-*` attributes / `option*` properties. These
// properties are used the options object of a `Intl` constructor.
// TODO: Update this when the compiler supports stage 3 decorators.
// See: https://github.com/microsoft/TypeScript/issues/48885
export function optionProperty(options: PropertyDeclaration = {}) {
  return function(target: any, name: string) {
    return property(getOptions(name, options))(target, name);
  }
}
