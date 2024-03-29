# `intl-numberformat` elements

A custom element for [Intl.NumberFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat)

`intl-numberformat` elements can be used to format numbers with the given
style (e.g. currency, percent, unit, etc.) and locale.

## Example

Format a number as currency

```html
<intl-numberformat locales="de-CH" option-style="currency"
  option-currency="chf">
  <intl-numberformat-format>
    <data value="1234.56">1,234.56</data>
  </intl-numberformat-format>
</intl-numberformat>
```

## `<intl-numberformat>` (`HTMLIntlNumberFormatElement`)

[Learn more about `Intl.NumberFormat()`](http://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat)

### Attributes

| Name                              | Type                                                                | Default     | Required? | Description | Property                         |
| --------------------------------- | ------------------------------------------------------------------- | ----------- | --------- | ----------- | -------------------------------- |
| `locales`                         | `string \| undefined`                                               | `undefined` |           |             | `locales`                        |
| `locales-from`                    | `string \| undefined`                                               | `undefined` |           |             | `localesFrom`                    |
| `option-compactdisplay`           | `Intl.NumberFormatOptions['compactDisplay'] \| undefined`           | `undefined` |           |             | `optionCompactDisplay`           |
| `option-currency`                 | `Intl.NumberFormatOptions['currency'] \| undefined`                 | `undefined` |           |             | `optionCurrency`                 |
| `option-currencydisplay`          | `Intl.NumberFormatOptions['currencyDisplay'] \| undefined`          | `undefined` |           |             | `optionCurrencyDisplay`          |
| `option-currencysign`             | `Intl.NumberFormatOptions['currencySign'] \| undefined`             | `undefined` |           |             | `optionCurrencySign`             |
| `option-localematcher`            | `Intl.RelativeTimeFormatLocaleMatcher \| undefined`                 | `undefined` |           |             | `optionLocaleMatcher`            |
| `option-maximumfractiondigits`    | `Intl.NumberFormatOptions['maximumFractionDigits'] \| undefined`    | `undefined` |           |             | `optionMaximumFractionDigits`    |
| `option-maximumsignificantdigits` | `Intl.NumberFormatOptions['maximumSignificantDigits'] \| undefined` | `undefined` |           |             | `optionMaximumSignificantDigits` |
| `option-minimumfractiondigits`    | `Intl.NumberFormatOptions['minimumFractionDigits'] \| undefined`    | `undefined` |           |             | `optionMinimumFractionDigits`    |
| `option-minimumintegerdigits`     | `Intl.NumberFormatOptions['minimumIntegerDigits'] \| undefined`     | `undefined` |           |             | `optionMinimumIntegerDigits`     |
| `option-minimumsignificantdigits` | `Intl.NumberFormatOptions['minimumSignificantDigits'] \| undefined` | `undefined` |           |             | `optionMinimumSignificantDigits` |
| `option-notation`                 | `Intl.NumberFormatOptions['notation'] \| undefined`                 | `undefined` |           |             | `optionNotation`                 |
| `option-signdisplay`              | `Intl.NumberFormatOptions['signDisplay'] \| undefined`              | `undefined` |           |             | `optionSignDisplay`              |
| `option-style`                    | `Intl.NumberFormatOptions['style'] \| undefined`                    | `undefined` |           |             | `optionStyle`                    |
| `option-unit`                     | `Intl.NumberFormatOptions['unit'] \| undefined`                     | `undefined` |           |             | `optionUnit`                     |
| `option-unitdisplay`              | `Intl.NumberFormatOptions['unitDisplay'] \| undefined`              | `undefined` |           |             | `optionUnitDisplay`              |
| `option-usegrouping`              | `Intl.NumberFormatOptions['useGrouping'] \| undefined`              | `undefined` |           |             | `optionUseGrouping`              |

### Properties

| Name                             | Type                                                                | Default     | Required? | Read only? | Description | Attribute                         |
| -------------------------------- | ------------------------------------------------------------------- | ----------- | --------- | ---------- | ----------- | --------------------------------- |
| `intlObject`                     | `Intl.NumberFormat`                                                 | `undefined` |           | Yes        |             |                                   |
| `localeList`                     | `DOMTokenList`                                                      | `undefined` |           | Yes        |             |                                   |
| `locales`                        | `string \| undefined`                                               | `undefined` |           |            |             | `locales`                         |
| `localesFrom`                    | `string \| undefined`                                               | `undefined` |           |            |             | `locales-from`                    |
| `localesFromElements`            | `HTMLIntlLocaleElement[]`                                           | `undefined` |           | Yes        |             |                                   |
| `optionCompactDisplay`           | `Intl.NumberFormatOptions['compactDisplay'] \| undefined`           | `undefined` |           |            |             | `option-compactdisplay`           |
| `optionCurrency`                 | `Intl.NumberFormatOptions['currency'] \| undefined`                 | `undefined` |           |            |             | `option-currency`                 |
| `optionCurrencyDisplay`          | `Intl.NumberFormatOptions['currencyDisplay'] \| undefined`          | `undefined` |           |            |             | `option-currencydisplay`          |
| `optionCurrencySign`             | `Intl.NumberFormatOptions['currencySign'] \| undefined`             | `undefined` |           |            |             | `option-currencysign`             |
| `optionLocaleMatcher`            | `Intl.RelativeTimeFormatLocaleMatcher \| undefined`                 | `undefined` |           |            |             | `option-localematcher`            |
| `optionMaximumFractionDigits`    | `Intl.NumberFormatOptions['maximumFractionDigits'] \| undefined`    | `undefined` |           |            |             | `option-maximumfractiondigits`    |
| `optionMaximumSignificantDigits` | `Intl.NumberFormatOptions['maximumSignificantDigits'] \| undefined` | `undefined` |           |            |             | `option-maximumsignificantdigits` |
| `optionMinimumFractionDigits`    | `Intl.NumberFormatOptions['minimumFractionDigits'] \| undefined`    | `undefined` |           |            |             | `option-minimumfractiondigits`    |
| `optionMinimumIntegerDigits`     | `Intl.NumberFormatOptions['minimumIntegerDigits'] \| undefined`     | `undefined` |           |            |             | `option-minimumintegerdigits`     |
| `optionMinimumSignificantDigits` | `Intl.NumberFormatOptions['minimumSignificantDigits'] \| undefined` | `undefined` |           |            |             | `option-minimumsignificantdigits` |
| `optionNotation`                 | `Intl.NumberFormatOptions['notation'] \| undefined`                 | `undefined` |           |            |             | `option-notation`                 |
| `optionSignDisplay`              | `Intl.NumberFormatOptions['signDisplay'] \| undefined`              | `undefined` |           |            |             | `option-signdisplay`              |
| `optionStyle`                    | `Intl.NumberFormatOptions['style'] \| undefined`                    | `undefined` |           |            |             | `option-style`                    |
| `optionUnit`                     | `Intl.NumberFormatOptions['unit'] \| undefined`                     | `undefined` |           |            |             | `option-unit`                     |
| `optionUnitDisplay`              | `Intl.NumberFormatOptions['unitDisplay'] \| undefined`              | `undefined` |           |            |             | `option-unitdisplay`              |
| `optionUseGrouping`              | `Intl.NumberFormatOptions['useGrouping'] \| undefined`              | `undefined` |           |            |             | `option-usegrouping`              |

### Methods

| Name                | Return                             | Description                                                                                                                                                                           |
| ------------------- | ---------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `resolvedOptions()` | `Intl.ResolvedNumberFormatOptions` | [Learn more about `Intl.NumberFormat.prototype.resolvedOptions()`](http://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/resolvedOptions) |

***

## `<intl-numberformat-format>` (`HTMLIntlNumberFormatFormatElement`)

[Learn more about `Intl.NumberFormat.prototype.format`](http://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/format)

### Attributes

| Name       | Type                  | Default     | Required? | Description | Property   |
| ---------- | --------------------- | ----------- | --------- | ----------- | ---------- |
| `provider` | `string \| undefined` | `undefined` |           |             | `provider` |

### Properties

| Name              | Type                                       | Default     | Required? | Read only? | Description | Attribute  |
| ----------------- | ------------------------------------------ | ----------- | --------- | ---------- | ----------- | ---------- |
| `provider`        | `string \| undefined`                      | `undefined` |           |            |             | `provider` |
| `providerElement` | `HTMLIntlNumberFormatElement \| undefined` | `undefined` |           | Yes        |             |            |
| `value`           | `string`                                   | `undefined` |           | Yes        |             |            |

### Slots

| Name | Description                                                                                                                                                     |
| ---- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|      | The slotted element must be a `<data>` element with a `value` attribute. The value is used as the `number` argument of `Intl.NumberFormat`’s `format()` method. |

### CSS Parts

| Name    | Description                                                            |
| ------- | ---------------------------------------------------------------------- |
| `value` | The `<span>` element that contains the string of the formatted number. |

***

## `<intl-numberformat-formattoparts>` (`HTMLIntlNumberFormatFormatToPartsElement`)

[Learn more about `Intl.NumberFormat.prototype.formatToParts`](http://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/formatToParts)

### Attributes

| Name       | Type                  | Default     | Required? | Description | Property   |
| ---------- | --------------------- | ----------- | --------- | ----------- | ---------- |
| `provider` | `string \| undefined` | `undefined` |           |             | `provider` |

### Properties

| Name              | Type                                       | Default     | Required? | Read only? | Description | Attribute  |
| ----------------- | ------------------------------------------ | ----------- | --------- | ---------- | ----------- | ---------- |
| `provider`        | `string \| undefined`                      | `undefined` |           |            |             | `provider` |
| `providerElement` | `HTMLIntlNumberFormatElement \| undefined` | `undefined` |           | Yes        |             |            |
| `value`           | `Intl.NumberFormatPart[]`                  | `undefined` |           | Yes        |             |            |

### Slots

| Name | Description                                                                                                                                                            |
| ---- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|      | The slotted element must be a `<data>` element with a `value` attribute. The value is used as the `number` argument of `Intl.NumberFormat`’s `formatToParts()` method. |

### CSS Parts

| Name                 | Description                                                                                            |
| -------------------- | ------------------------------------------------------------------------------------------------------ |
| `compact`            | A `<span>` element that contains the string of the formatted part which `type` is `compact`.           |
| `currency`           | A `<span>` element that contains the string of the formatted part which `type` is `currency`.          |
| `decimal`            | A `<span>` element that contains the string of the formatted part which `type` is `decimal`.           |
| `exponent-integer`   | A `<span>` element that contains the string of the formatted part which `type` is `exponentInteger`.   |
| `exponent-minusSign` | A `<span>` element that contains the string of the formatted part which `type` is `exponentMinusSign`. |
| `exponent-separator` | A `<span>` element that contains the string of the formatted part which `type` is `exponentSeparator`. |
| `fraction`           | A `<span>` element that contains the string of the formatted part which `type` is `fraction`.          |
| `group`              | A `<span>` element that contains the string of a formatted part which `type` is `group`.               |
| `infinity`           | A `<span>` element that contains the string of the formatted part which `type` is `infinity`.          |
| `integer`            | A `<span>` element that contains the string of a formatted part which `type` is `integer`.             |
| `literal`            | A `<span>` element that contains the string of a formatted part which `type` is `literal`.             |
| `minus-sign`         | A `<span>` element that contains the string of the formatted part which `type` is `minusSign`.         |
| `nan`                | A `<span>` element that contains the string of the formatted part which `type` is `nan`.               |
| `percent-sign`       | A `<span>` element that contains the string of the formatted part which `type` is `percentSign`.       |
| `plus-sign`          | A `<span>` element that contains the string of the formatted part which `type` is `plusSign`.          |
| `unit`               | A `<span>` element that contains the string of the formatted part which `type` is `unit`.              |
| `unknown`            | A `<span>` element that contains the string of a formatted part which `type` is `unknown`.             |
| `value`              | The `<span>` element that contains the elements that contain formatted parts of the given number.      |
