# `intl-relativetimeformat` elements

A custom element for [Intl.RelativeTimeFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/RelativeTimeFormat)

`intl-relativetimeformat` elements can be used to format relative dates and
times with language-sensitivity. You can format both past and future dates
and times. The `<intl-relativetimeformat-format>` and
`<intl-relativetimeformat-formattoparts>` elements require 2 slots for the
relative time and the unit of time. You can either use named slots (`rtime`
and `unit`) or unnamed slots (first and second `<data>` elements).

## Example

Format a past time

```html
<intl-relativetimeformat locales="pt-BR" option-style="long">
  <p>
    <intl-relativetimeformat-format>
      <data slot="rtime" value="-1">1</data>
      <data slot="unit" value="day">day</data>
      ago
    </intl-relativetimeformat-format>
  </p>
</intl-relativetimeformat>
```

Format a future time

```html
<intl-relativetimeformat locales="is" option-style="long">
  <p>
    <intl-relativetimeformat-format>
      in
      <data value="10">10</data>
      <data value="years">years</data>
    </intl-relativetimeformat-format>
  </p>
</intl-relativetimeformat>
```

## `<intl-relativetimeformat>` (`HTMLIntlRelativeTimeFormatElement`)

[Learn more about `Intl.RelativeTimeFormat()`](http://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/RelativeTimeFormat/RelativeTimeFormat)

### Attributes

| Name                   | Type                                        | Default      | Description | Property              |
| ---------------------- | ------------------------------------------- | ------------ | ----------- | --------------------- |
| `locales`              | `string \| undefined`                       | `undefined`  |             | `locales`             |
| `locales-from`         | `string \| undefined`                       | `undefined`  |             | `localesFrom`         |
| `option-localematcher` | `Intl.RelativeTimeFormatLocaleMatcher`      | `'best fit'` |             | `optionLocaleMatcher` |
| `option-numeric`       | `Intl.RelativeTimeFormatOptions['numeric']` | `'always'`   |             | `optionNumeric`       |
| `option-style`         | `Intl.RelativeTimeFormatOptions['style']`   | `'long'`     |             | `optionStyle`         |

### Properties

| Name                  | Type                                        | Default      | Read only? | Description | Attribute              |
| --------------------- | ------------------------------------------- | ------------ | ---------- | ----------- | ---------------------- |
| `intlObject`          | `Intl.RelativeTimeFormat`                   | `undefined`  | Yes        |             |                        |
| `localeList`          | `DOMTokenList`                              | `undefined`  | Yes        |             |                        |
| `locales`             | `string \| undefined`                       | `undefined`  |            |             | `locales`              |
| `localesFrom`         | `string \| undefined`                       | `undefined`  |            |             | `locales-from`         |
| `localesFromElements` | `HTMLIntlLocaleElement[]`                   | `undefined`  | Yes        |             |                        |
| `optionLocaleMatcher` | `Intl.RelativeTimeFormatLocaleMatcher`      | `'best fit'` |            |             | `option-localematcher` |
| `optionNumeric`       | `Intl.RelativeTimeFormatOptions['numeric']` | `'always'`   |            |             | `option-numeric`       |
| `optionStyle`         | `Intl.RelativeTimeFormatOptions['style']`   | `'long'`     |            |             | `option-style`         |

### Methods

| Name                | Return                                   | Description                                                                                                                                                                                       |
| ------------------- | ---------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `resolvedOptions()` | `Intl.ResolvedRelativeTimeFormatOptions` | [Learn more about `Intl.RelativeTimeFormat.prototype.resolvedOptions()`](http://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/RelativeTimeFormat/resolvedOptions) |

***

## `<intl-relativetimeformat-format>` (`HTMLIntlRelativeTimeFormatFormatElement`)

[Learn more about `Intl.RelativeTimeFormat.prototype.format`](http://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/RelativeTimeFormat/format)

### Attributes

| Name       | Type                  | Default     | Description | Property   |
| ---------- | --------------------- | ----------- | ----------- | ---------- |
| `provider` | `string \| undefined` | `undefined` |             | `provider` |

### Properties

| Name              | Type                                             | Default     | Read only? | Description | Attribute  |
| ----------------- | ------------------------------------------------ | ----------- | ---------- | ----------- | ---------- |
| `provider`        | `string \| undefined`                            | `undefined` |            |             | `provider` |
| `providerElement` | `HTMLIntlRelativeTimeFormatElement \| undefined` | `undefined` | Yes        |             |            |
| `value`           | `string`                                         | `undefined` | Yes        |             |            |

### Slots

| Name    | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|         | The slotted elements must be `<data>` elements with `value` attributes, the first slotted `<data>` element’s `value` must be a string of number that represents the relative time, the second slotted `<data>` element’s `value` must be a string that represents the unit, and it must be one of the supported unit. See more details in the [MDN documentation](http://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/RelativeTimeFormat/format). Alternatively, use the `rtime` and `unit` slots, which take higher precedence over the default slotted elements. |
| `rtime` | The relative time. See the default slot for more details.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| `unit`  | The unit. See the default slot for more details.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |

### CSS Parts

| Name    | Description                                                                   |
| ------- | ----------------------------------------------------------------------------- |
| `value` | The `<span>` element that contains the string of the formatted relative time. |

***

## `<intl-relativetimeformat-formattoparts>` (`HTMLIntlRelativeTimeFormatFormatToPartsElement`)

[Learn more about `Intl.RelativeTimeFormat.prototype.formatToParts`](http://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/RelativeTimeFormat/formatToParts)

### Properties

| Name    | Type                            | Default     | Read only? | Description | Attribute |
| ------- | ------------------------------- | ----------- | ---------- | ----------- | --------- |
| `value` | `Intl.RelativeTimeFormatPart[]` | `undefined` | Yes        |             |           |

### Slots

| Name    | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|         | The slotted elements must be `<data>` elements with `value` attributes, the first slotted `<data>` element’s `value` must be a number that represents the relative time, the second slotted `<data>` element’s `value` must be a string that represents the unit, and it must be one of the supported unit. See more details in the [MDN documentation](http://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/RelativeTimeFormat/format). Alternatively, use the `rtime` and `unit` slots, which take higher precedence over the default slotted elements. |
| `rtime` | The relative time. See the default slot for more details.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| `unit`  | The unit. See the default slot for more details.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |

### CSS Parts

| Name      | Description                                                                                                       |
| --------- | ----------------------------------------------------------------------------------------------------------------- |
| `integer` | The `<span>` element that contains the string of the formatted part which `type` is `integer`.                    |
| `literal` | A `<span>` element that contains the string of a formatted part which `type` is `literal`.                        |
| `value`   | The `<span>` element that contains the elements that contain formatted parts of the given relative time and unit. |
