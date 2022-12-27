# `Intl.PluralRules` elements

## `<intl-pluralrules>` (`HTMLIntlPluralRulesElement`)

[Learn more about `Intl.PluralRules()`](http://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/PluralRules/PluralRules)

### Attributes

| Name                              | Type                                                               | Default      | Description | Property                         |
| --------------------------------- | ------------------------------------------------------------------ | ------------ | ----------- | -------------------------------- |
| `locales`                         | `string \| undefined`                                              | `undefined`  |             | `locales`                        |
| `locales-from`                    | `string \| undefined`                                              | `undefined`  |             | `localesFrom`                    |
| `option-localematcher`            | `Intl.RelativeTimeFormatLocaleMatcher`                             | `'best fit'` |             | `optionLocaleMatcher`            |
| `option-maximumfractiondigits`    | `Intl.PluralRulesOptions['maximumFractionDigits'] \| undefined`    | `undefined`  |             | `optionMaximumFractionDigits`    |
| `option-maximumsignificantdigits` | `Intl.PluralRulesOptions['maximumSignificantDigits'] \| undefined` | `undefined`  |             | `optionMaximumSignificantDigits` |
| `option-minimumfractiondigits`    | `Intl.PluralRulesOptions['minimumFractionDigits'] \| undefined`    | `undefined`  |             | `optionMinimumFractionDigits`    |
| `option-minimumintegerdigits`     | `Intl.PluralRulesOptions['minimumIntegerDigits'] \| undefined`     | `undefined`  |             | `optionMinimumIntegerDigits`     |
| `option-minimumsignificantdigits` | `Intl.PluralRulesOptions['minimumSignificantDigits'] \| undefined` | `undefined`  |             | `optionMinimumSignificantDigits` |
| `option-type`                     | `Intl.PluralRulesOptions['type']`                                  | `'cardinal'` |             | `optionType`                     |

### Properties

| Name                             | Type                                                               | Default      | Read only? | Description | Attribute                         |
| -------------------------------- | ------------------------------------------------------------------ | ------------ | ---------- | ----------- | --------------------------------- |
| `consumerElements`               | `ConsumerElement[]`                                                | `undefined`  | Yes        |             |                                   |
| `intlObject`                     | `Intl.PluralRules`                                                 | `undefined`  | Yes        |             |                                   |
| `localeList`                     | `LocaleList`                                                       | `undefined`  | Yes        |             |                                   |
| `locales`                        | `string \| undefined`                                              | `undefined`  |            |             | `locales`                         |
| `localesFrom`                    | `string \| undefined`                                              | `undefined`  |            |             | `locales-from`                    |
| `localesFromElements`            | `HTMLIntlLocaleElement[]`                                          | `undefined`  | Yes        |             |                                   |
| `optionLocaleMatcher`            | `Intl.RelativeTimeFormatLocaleMatcher`                             | `'best fit'` |            |             | `option-localematcher`            |
| `optionMaximumFractionDigits`    | `Intl.PluralRulesOptions['maximumFractionDigits'] \| undefined`    | `undefined`  |            |             | `option-maximumfractiondigits`    |
| `optionMaximumSignificantDigits` | `Intl.PluralRulesOptions['maximumSignificantDigits'] \| undefined` | `undefined`  |            |             | `option-maximumsignificantdigits` |
| `optionMinimumFractionDigits`    | `Intl.PluralRulesOptions['minimumFractionDigits'] \| undefined`    | `undefined`  |            |             | `option-minimumfractiondigits`    |
| `optionMinimumIntegerDigits`     | `Intl.PluralRulesOptions['minimumIntegerDigits'] \| undefined`     | `undefined`  |            |             | `option-minimumintegerdigits`     |
| `optionMinimumSignificantDigits` | `Intl.PluralRulesOptions['minimumSignificantDigits'] \| undefined` | `undefined`  |            |             | `option-minimumsignificantdigits` |
| `optionType`                     | `Intl.PluralRulesOptions['type']`                                  | `'cardinal'` |            |             | `option-type`                     |

### Methods

| Name                | Return                            | Description                                                                                                                                                                         |
| ------------------- | --------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `resolvedOptions()` | `Intl.ResolvedPluralRulesOptions` | [Learn more about `Intl.PluralRules.prototype.resolvedOptions()`](http://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/PluralRules/resolvedOptions) |

***

## `<intl-pluralrules-select>` (`HTMLIntlPluralRulesSelectElement`)

[Learn more about `Intl.PluralRules.prototype.select`](http://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/PluralRules/select)

### Attributes

| Name       | Type                  | Default     | Description | Property   |
| ---------- | --------------------- | ----------- | ----------- | ---------- |
| `provider` | `string \| undefined` | `undefined` |             | `provider` |

### Properties

| Name              | Type                        | Default     | Read only? | Description | Attribute  |
| ----------------- | --------------------------- | ----------- | ---------- | ----------- | ---------- |
| `provider`        | `string \| undefined`       | `undefined` |            |             | `provider` |
| `providerElement` | `P \| undefined`            | `undefined` | Yes        |             |            |
| `value`           | `Intl.LDMLPluralRule \| ''` | `undefined` | Yes        |             |            |

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
