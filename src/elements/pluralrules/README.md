# `intl-pluralrules` elements

A custom element for [Intl.PluralRules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/PluralRules)

`intl-pluralrules` elements can be used to pick the correct plural form for a
given number and locale.

You can specify these plural forms in `<template>`
elements and assign them to the slots that represent pluralization
categories. Note that at the minimal, you should specify a `<template>` to
use for the `other` category as it is the fallback when the
`<intl-pluralrules-select>` element can’t find the `<template>` that is
assigned to the slot that represents the selected pluralization category.

You can specify the number to be used for pluralization by assigning a
`<data>` element to the default slot of the `<intl-pluralrules-select>`.

If you need to add the number into the pluralized string, you can use one or
multiple `<ins>` elements in the `<template>` elements as placeholders.

It also supports both ordinal and cardinal pluralization rules.

## Example

Cardinal pluralization

```html
<intl-pluralrules locales="en">
  <intl-pluralrules-select>
    <data value="10"></data>
    <template slot="zero">No notifications</template>
    <template slot="one">1 notification</template>
    <template slot="other"><ins></ins> notifications</template>
  </intl-pluralrules-select>
</intl-pluralrules>
```

Ordinal pluralization

```html
<intl-pluralrules locales="en" option-type="ordinal">
  <p>
    The
    <intl-pluralrules-select>
      <data value="103"></data>
      <template slot="one">1st</template>
      <template slot="two">2nd</template>
      <template slot="few">3rd</template>
      <template slot="other"><ins></ins>th</template>
    </intl-pluralrules-select>
    time
  </p>
</intl-pluralrules>
```

## `<intl-pluralrules>` (`HTMLIntlPluralRulesElement`)

[Learn more about `Intl.PluralRules()`](http://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/PluralRules/PluralRules)

### Attributes

| Name                              | Type                                                               | Default     | Required? | Description | Property                         |
| --------------------------------- | ------------------------------------------------------------------ | ----------- | --------- | ----------- | -------------------------------- |
| `locales`                         | `string \| undefined`                                              | `undefined` |           |             | `locales`                        |
| `locales-from`                    | `string \| undefined`                                              | `undefined` |           |             | `localesFrom`                    |
| `option-localematcher`            | `Intl.RelativeTimeFormatLocaleMatcher \| undefined`                | `undefined` |           |             | `optionLocaleMatcher`            |
| `option-maximumfractiondigits`    | `Intl.PluralRulesOptions['maximumFractionDigits'] \| undefined`    | `undefined` |           |             | `optionMaximumFractionDigits`    |
| `option-maximumsignificantdigits` | `Intl.PluralRulesOptions['maximumSignificantDigits'] \| undefined` | `undefined` |           |             | `optionMaximumSignificantDigits` |
| `option-minimumfractiondigits`    | `Intl.PluralRulesOptions['minimumFractionDigits'] \| undefined`    | `undefined` |           |             | `optionMinimumFractionDigits`    |
| `option-minimumintegerdigits`     | `Intl.PluralRulesOptions['minimumIntegerDigits'] \| undefined`     | `undefined` |           |             | `optionMinimumIntegerDigits`     |
| `option-minimumsignificantdigits` | `Intl.PluralRulesOptions['minimumSignificantDigits'] \| undefined` | `undefined` |           |             | `optionMinimumSignificantDigits` |
| `option-type`                     | `Intl.PluralRulesOptions['type'] \| undefined`                     | `undefined` |           |             | `optionType`                     |

### Properties

| Name                             | Type                                                               | Default     | Required? | Read only? | Description | Attribute                         |
| -------------------------------- | ------------------------------------------------------------------ | ----------- | --------- | ---------- | ----------- | --------------------------------- |
| `intlObject`                     | `Intl.PluralRules`                                                 | `undefined` |           | Yes        |             |                                   |
| `localeList`                     | `DOMTokenList`                                                     | `undefined` |           | Yes        |             |                                   |
| `locales`                        | `string \| undefined`                                              | `undefined` |           |            |             | `locales`                         |
| `localesFrom`                    | `string \| undefined`                                              | `undefined` |           |            |             | `locales-from`                    |
| `localesFromElements`            | `HTMLIntlLocaleElement[]`                                          | `undefined` |           | Yes        |             |                                   |
| `optionLocaleMatcher`            | `Intl.RelativeTimeFormatLocaleMatcher \| undefined`                | `undefined` |           |            |             | `option-localematcher`            |
| `optionMaximumFractionDigits`    | `Intl.PluralRulesOptions['maximumFractionDigits'] \| undefined`    | `undefined` |           |            |             | `option-maximumfractiondigits`    |
| `optionMaximumSignificantDigits` | `Intl.PluralRulesOptions['maximumSignificantDigits'] \| undefined` | `undefined` |           |            |             | `option-maximumsignificantdigits` |
| `optionMinimumFractionDigits`    | `Intl.PluralRulesOptions['minimumFractionDigits'] \| undefined`    | `undefined` |           |            |             | `option-minimumfractiondigits`    |
| `optionMinimumIntegerDigits`     | `Intl.PluralRulesOptions['minimumIntegerDigits'] \| undefined`     | `undefined` |           |            |             | `option-minimumintegerdigits`     |
| `optionMinimumSignificantDigits` | `Intl.PluralRulesOptions['minimumSignificantDigits'] \| undefined` | `undefined` |           |            |             | `option-minimumsignificantdigits` |
| `optionType`                     | `Intl.PluralRulesOptions['type'] \| undefined`                     | `undefined` |           |            |             | `option-type`                     |

### Methods

| Name                | Return                            | Description                                                                                                                                                                         |
| ------------------- | --------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `resolvedOptions()` | `Intl.ResolvedPluralRulesOptions` | [Learn more about `Intl.PluralRules.prototype.resolvedOptions()`](http://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/PluralRules/resolvedOptions) |

***

## `<intl-pluralrules-select>` (`HTMLIntlPluralRulesSelectElement`)

[Learn more about `Intl.PluralRules.prototype.select`](http://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/PluralRules/select)

### Attributes

| Name       | Type                  | Default     | Required? | Description | Property   |
| ---------- | --------------------- | ----------- | --------- | ----------- | ---------- |
| `provider` | `string \| undefined` | `undefined` |           |             | `provider` |

### Properties

| Name              | Type                                      | Default     | Required? | Read only? | Description | Attribute  |
| ----------------- | ----------------------------------------- | ----------- | --------- | ---------- | ----------- | ---------- |
| `provider`        | `string \| undefined`                     | `undefined` |           |            |             | `provider` |
| `providerElement` | `HTMLIntlPluralRulesElement \| undefined` | `undefined` |           | Yes        |             |            |
| `value`           | `Intl.LDMLPluralRule \| ''`               | `undefined` |           | Yes        |             |            |

### Slots

| Name    | Description                                                                                                                                                                                                                                                    |
| ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|         | The slotted element must be a `<data>` element with a `value` attribute. The value should be a number, it’s used as the `number` argument of `Intl.PluralRules`’s `select()` method.                                                                           |
| `few`   | The slotted element must be a `<template>` element. The template’s content is displayed when the `select()` method returns `few`. The `<template>` can contain an `<ins>` element with empty content as a placeholder for the number.                          |
| `many`  | The slotted element must be a `<template>` element. The template’s content is displayed when the `select()` method returns `many`. The `<template>` can contain an `<ins>` element with empty content as a placeholder for the number.                         |
| `one`   | The slotted element must be a `<template>` element. The template’s content is displayed when the `select()` method returns `one`. The `<template>` can contain an `<ins>` element with empty content as a placeholder for the number.                          |
| `other` | This slot is required. The slotted element must be a `<template>` element. The template’s content is displayed when the `select()` method returns `other`. The `<template>` can contain an `<ins>` element with empty content as a placeholder for the number. |
| `two`   | The slotted element must be a `<template>` element. The template’s content is displayed when the `select()` method returns `two`. The `<template>` can contain an `<ins>` element with empty content as a placeholder for the number.                          |
| `zero`  | The slotted element must be a `<template>` element. The template’s content is displayed when the `select()` method returns `zero`. The `<template>` can contain an `<ins>` element with empty content as a placeholder for the number.                         |

### CSS Parts

| Name    | Description                                                      |
| ------- | ---------------------------------------------------------------- |
| `value` | The `<span>` element that contains the selected template’s HTML. |
