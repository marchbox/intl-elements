# `intl-collator` elements

A custom element for [Intl.Collator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Collator)

`intl-collator` elements can be used for language-sensitive list sorting and
filtering, both are done by using the `<intl-collator-compare>` element. The
“list” here means the element you assign to the `list` slot, the
`textContent` of each direct child element is a string member of the list.

The `<intl-collator-compare>` element does NOT modify the author content, it
makes a copy of the list element and its descendants, and then sorts or
filters the copy inside its Shadow DOM.

## Example

Sorting a list of strings:

```html
<intl-collator locales="de-u-co-phonebk">
  <intl-collator-compare>
    <ol slot="list">
      <li>Offenbach</li>
      <li>Österreich</li>
      <li>Odenwald</li>
    </ol>
  </intl-collator-compare>
</intl-collator>
```

Filtering a list of strings:

```html
<intl-collator locales="fr">
  <intl-collator-compare>
    <data slot="target" value="congres"></data>
    <ul slot="list">
      <li>Congrès</li>
      <li>congres</li>
      <li>Assemblée</li>
      <li>poisson</li>
    </ul>
  </intl-collator-compare>
</intl-collator>
```

## `<intl-collator>` (`HTMLIntlCollatorElement`)

[Learn more about `Intl.Collator()`](http://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Collator/Collator)

### Attributes

| Name                       | Type                                                     | Default     | Required? | Description | Property                  |
| -------------------------- | -------------------------------------------------------- | ----------- | --------- | ----------- | ------------------------- |
| `locales`                  | `string \| undefined`                                    | `undefined` |           |             | `locales`                 |
| `locales-from`             | `string \| undefined`                                    | `undefined` |           |             | `localesFrom`             |
| `option-casefirst`         | `Intl.CollatorOptions['caseFirst'] \| undefined`         | `undefined` |           |             | `optionCaseFirst`         |
| `option-collation`         | `Intl.CollatorOptions['collation'] \| undefined`         | `undefined` |           |             | `optionCollation`         |
| `option-ignorepunctuation` | `Intl.CollatorOptions['ignorePunctuation'] \| undefined` | `undefined` |           |             | `optionIgnorePunctuation` |
| `option-localematcher`     | `Intl.RelativeTimeFormatLocaleMatcher \| undefined`      | `undefined` |           |             | `optionLocaleMatcher`     |
| `option-numeric`           | `Intl.CollatorOptions['numeric'] \| undefined`           | `undefined` |           |             | `optionNumeric`           |
| `option-sensitivity`       | `Intl.CollatorOptions['sensitivity'] \| undefined`       | `undefined` |           |             | `optionSensitivity`       |
| `option-usage`             | `Intl.CollatorOptions['usage'] \| undefined`             | `undefined` |           |             | `optionUsage`             |

### Properties

| Name                      | Type                                                     | Default     | Required? | Read only? | Description | Attribute                  |
| ------------------------- | -------------------------------------------------------- | ----------- | --------- | ---------- | ----------- | -------------------------- |
| `intlObject`              | `Intl.Collator`                                          | `undefined` |           | Yes        |             |                            |
| `localeList`              | `DOMTokenList`                                           | `undefined` |           | Yes        |             |                            |
| `locales`                 | `string \| undefined`                                    | `undefined` |           |            |             | `locales`                  |
| `localesFrom`             | `string \| undefined`                                    | `undefined` |           |            |             | `locales-from`             |
| `localesFromElements`     | `HTMLIntlLocaleElement[]`                                | `undefined` |           | Yes        |             |                            |
| `optionCaseFirst`         | `Intl.CollatorOptions['caseFirst'] \| undefined`         | `undefined` |           |            |             | `option-casefirst`         |
| `optionCollation`         | `Intl.CollatorOptions['collation'] \| undefined`         | `undefined` |           |            |             | `option-collation`         |
| `optionIgnorePunctuation` | `Intl.CollatorOptions['ignorePunctuation'] \| undefined` | `undefined` |           |            |             | `option-ignorepunctuation` |
| `optionLocaleMatcher`     | `Intl.RelativeTimeFormatLocaleMatcher \| undefined`      | `undefined` |           |            |             | `option-localematcher`     |
| `optionNumeric`           | `Intl.CollatorOptions['numeric'] \| undefined`           | `undefined` |           |            |             | `option-numeric`           |
| `optionSensitivity`       | `Intl.CollatorOptions['sensitivity'] \| undefined`       | `undefined` |           |            |             | `option-sensitivity`       |
| `optionUsage`             | `Intl.CollatorOptions['usage'] \| undefined`             | `undefined` |           |            |             | `option-usage`             |

### Methods

| Name                | Return                         | Description                                                                                                                                                                   |
| ------------------- | ------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `resolvedOptions()` | `Intl.ResolvedCollatorOptions` | [Learn more about `Intl.Collator.prototype.resolvedOptions()`](http://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Collator/resolvedOptions) |

***

## `<intl-collator-compare>` (`HTMLIntlCollatorCompareElement`)

[Learn more about `Intl.Collator.prototype.compare`](http://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Collator/compare)

### Attributes

| Name       | Type                  | Default     | Required? | Description | Property   |
| ---------- | --------------------- | ----------- | --------- | ----------- | ---------- |
| `provider` | `string \| undefined` | `undefined` |           |             | `provider` |

### Properties

| Name              | Type                                   | Default     | Required? | Read only? | Description | Attribute  |
| ----------------- | -------------------------------------- | ----------- | --------- | ---------- | ----------- | ---------- |
| `provider`        | `string \| undefined`                  | `undefined` |           |            |             | `provider` |
| `providerElement` | `HTMLIntlCollatorElement \| undefined` | `undefined` |           | Yes        |             |            |
| `value`           | `string[]`                             | `undefined` |           | Yes        |             |            |

### Slots

| Name     | Description                                                                                                                                                                              |
| -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `list`   | The list conotainer element. Depending on the value of the `option-usage` attribute, the list items are either sorted (default or `sort`) or filtered (`search`).                        |
| `target` | The slotted element must be a `<data>` element with a `value` attribute. When `option-usage` is set to `search`, the list items are filtered based on the value of the `target` element. |

### CSS Parts

| Name    | Description                                                    |
| ------- | -------------------------------------------------------------- |
| `value` | The container element that hosts the result of the comparison. |
