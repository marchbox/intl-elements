# `Intl.Collator` elements

## `<intl-collator>` (`HTMLIntlCollatorElement`)

[Learn more about `Intl.Collator()`](http://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Collator/Collator)

### Attributes

| Name                       | Type                                                     | Default      | Description | Property                  |
| -------------------------- | -------------------------------------------------------- | ------------ | ----------- | ------------------------- |
| `locales`                  | `string \| undefined`                                    | `undefined`  |             | `locales`                 |
| `locales-from`             | `string \| undefined`                                    | `undefined`  |             | `localesFrom`             |
| `option-casefirst`         | `Intl.CollatorOptions['caseFirst'] \| undefined`         | `undefined`  |             | `optionCaseFirst`         |
| `option-collation`         | `Intl.CollatorOptions['collation'] \| undefined`         | `undefined`  |             | `optionCollation`         |
| `option-ignorepunctuation` | `Intl.CollatorOptions['ignorePunctuation'] \| undefined` | `undefined`  |             | `optionIgnorePunctuation` |
| `option-localematcher`     | `Intl.RelativeTimeFormatLocaleMatcher`                   | `'best fit'` |             | `optionLocaleMatcher`     |
| `option-numeric`           | `Intl.CollatorOptions['numeric'] \| undefined`           | `undefined`  |             | `optionNumeric`           |
| `option-sensitivity`       | `Intl.CollatorOptions['sensitivity'] \| undefined`       | `undefined`  |             | `optionSensitivity`       |
| `option-usage`             | `Intl.CollatorOptions['usage'] \| undefined`             | `undefined`  |             | `optionUsage`             |

### Properties

| Name                      | Type                                                     | Default      | Read only? | Description | Attribute                  |
| ------------------------- | -------------------------------------------------------- | ------------ | ---------- | ----------- | -------------------------- |
| `consumerElements`        | `ConsumerElement[]`                                      | `undefined`  | Yes        |             |                            |
| `intlObject`              | `Intl.Collator`                                          | `undefined`  | Yes        |             |                            |
| `localeList`              | `LocaleList`                                             | `undefined`  | Yes        |             |                            |
| `locales`                 | `string \| undefined`                                    | `undefined`  |            |             | `locales`                  |
| `localesFrom`             | `string \| undefined`                                    | `undefined`  |            |             | `locales-from`             |
| `localesFromElements`     | `HTMLIntlLocaleElement[]`                                | `undefined`  | Yes        |             |                            |
| `optionCaseFirst`         | `Intl.CollatorOptions['caseFirst'] \| undefined`         | `undefined`  |            |             | `option-casefirst`         |
| `optionCollation`         | `Intl.CollatorOptions['collation'] \| undefined`         | `undefined`  |            |             | `option-collation`         |
| `optionIgnorePunctuation` | `Intl.CollatorOptions['ignorePunctuation'] \| undefined` | `undefined`  |            |             | `option-ignorepunctuation` |
| `optionLocaleMatcher`     | `Intl.RelativeTimeFormatLocaleMatcher`                   | `'best fit'` |            |             | `option-localematcher`     |
| `optionNumeric`           | `Intl.CollatorOptions['numeric'] \| undefined`           | `undefined`  |            |             | `option-numeric`           |
| `optionSensitivity`       | `Intl.CollatorOptions['sensitivity'] \| undefined`       | `undefined`  |            |             | `option-sensitivity`       |
| `optionUsage`             | `Intl.CollatorOptions['usage'] \| undefined`             | `undefined`  |            |             | `option-usage`             |

### Methods

| Name              | Return                         | Description                                                                                                                                                                   |
| ----------------- | ------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `resolvedOptions` | `Intl.ResolvedCollatorOptions` | [Learn more about `Intl.Collator.prototype.resolvedOptions()`](http://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Collator/resolvedOptions) |

***

## `<intl-collator-compare>` (`HTMLIntlCollatorCompareElement`)

[Learn more about `Intl.Collator.prototype.compare`](http://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Collator/compare)

### Attributes

| Name       | Type                  | Default     | Description | Property   |
| ---------- | --------------------- | ----------- | ----------- | ---------- |
| `provider` | `string \| undefined` | `undefined` |             | `provider` |

### Properties

| Name              | Type                  | Default     | Read only? | Description | Attribute  |
| ----------------- | --------------------- | ----------- | ---------- | ----------- | ---------- |
| `provider`        | `string \| undefined` | `undefined` |            |             | `provider` |
| `providerElement` | `P \| undefined`      | `undefined` | Yes        |             |            |
| `value`           | `string[]`            | `undefined` | Yes        |             |            |

### Slots

| Name     | Description                                                                                                                                                                              |
| -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `list`   | The list conotainer element. Depending on the value of the `option-usage` attribute, the list items are either sorted (default or `sort`) or filtered (`search`).                        |
| `target` | The slotted element must be a `<data>` element with a `value` attribute. When `option-usage` is set to `search`, the list items are filtered based on the value of the `target` element. |

### CSS Parts

| Name    | Description                                                    |
| ------- | -------------------------------------------------------------- |
| `value` | The container element that hosts the result of the comparison. |
