# `Intl.ListFormat` elements

## `<intl-listformat>` (`HTMLIntlListFormatElement`)

[Learn more about `Intl.ListFormat`](http://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/ListFormat/ListFormat)

### Attributes

| Name                   | Type                                   | Default         | Description | Property              |
| ---------------------- | -------------------------------------- | --------------- | ----------- | --------------------- |
| `locales`              | `string \| undefined`                  | `undefined`     |             | `locales`             |
| `locales-from`         | `string \| undefined`                  | `undefined`     |             | `localesFrom`         |
| `option-localematcher` | `Intl.RelativeTimeFormatLocaleMatcher` | `'best fit'`    |             | `optionLocaleMatcher` |
| `option-style`         | `Intl.ListFormatOptions['style']`      | `'long'`        |             | `optionStyle`         |
| `option-type`          | `Intl.ListFormatOptions['type']`       | `'conjunction'` |             | `optionType`          |

### Properties

| Name                  | Type                                   | Default         | Read only? | Description | Attribute              |
| --------------------- | -------------------------------------- | --------------- | ---------- | ----------- | ---------------------- |
| `consumerElements`    | `ConsumerElement[]`                    | `undefined`     | Yes        |             |                        |
| `intlObject`          | `Intl.ListFormat`                      | `undefined`     | Yes        |             |                        |
| `localeList`          | `LocaleList`                           | `undefined`     | Yes        |             |                        |
| `locales`             | `string \| undefined`                  | `undefined`     |            |             | `locales`              |
| `localesFrom`         | `string \| undefined`                  | `undefined`     |            |             | `locales-from`         |
| `localesFromElements` | `HTMLIntlLocaleElement[]`              | `undefined`     | Yes        |             |                        |
| `optionLocaleMatcher` | `Intl.RelativeTimeFormatLocaleMatcher` | `'best fit'`    |            |             | `option-localematcher` |
| `optionStyle`         | `Intl.ListFormatOptions['style']`      | `'long'`        |            |             | `option-style`         |
| `optionType`          | `Intl.ListFormatOptions['type']`       | `'conjunction'` |            |             | `option-type`          |

### Methods

| Name              | Return                           | Description                                                                                                                                                                     |
| ----------------- | -------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `resolvedOptions` | `Intl.ResolvedListFormatOptions` | [Learn more about `Intl.ListFormat.prototype.resolvedOptions`](http://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/ListFormat/resolvedOptions) |

***

## `<intl-listformat-format>` (`HTMLIntlListFormatFormatElement`)

[Learn more about `Intl.ListFormat.prototype.format`](http://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/ListFormat/format)

### Attributes

| Name       | Type                  | Default     | Description | Property   |
| ---------- | --------------------- | ----------- | ----------- | ---------- |
| `provider` | `string \| undefined` | `undefined` |             | `provider` |

### Properties

| Name              | Type                  | Default     | Read only? | Description | Attribute  |
| ----------------- | --------------------- | ----------- | ---------- | ----------- | ---------- |
| `provider`        | `string \| undefined` | `undefined` |            |             | `provider` |
| `providerElement` | `P \| undefined`      | `undefined` | Yes        |             |            |
| `value`           | `string`              | `undefined` | Yes        |             |            |

### Slots

| Name | Description                                                                                                                                                                  |
| ---- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|      | One or multiple `<data>` elements with `value` attributes. An array is created based on the values and used as the `list` argument of `Intl.ListFormat`’s `format()` method. |

### CSS Parts

| Name    | Description                                                          |
| ------- | -------------------------------------------------------------------- |
| `value` | The `<span>` element that contains the string of the formatted list. |

***

## `<intl-listformat-formattoparts>` (`HTMLIntlListFormatFormatToPartsElement`)

[Learn more about `Intl.ListFormat.prototype.formatToParts`](http://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/ListFormat/formatToParts)

### Attributes

| Name       | Type                  | Default     | Description | Property   |
| ---------- | --------------------- | ----------- | ----------- | ---------- |
| `provider` | `string \| undefined` | `undefined` |             | `provider` |

### Properties

| Name              | Type                    | Default     | Read only? | Description | Attribute  |
| ----------------- | ----------------------- | ----------- | ---------- | ----------- | ---------- |
| `provider`        | `string \| undefined`   | `undefined` |            |             | `provider` |
| `providerElement` | `P \| undefined`        | `undefined` | Yes        |             |            |
| `value`           | `Intl.ListFormatPart[]` | `undefined` | Yes        |             |            |

### Slots

| Name | Description                                                                                                                                                                         |
| ---- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|      | One or multiple `<data>` elements with `value` attributes. An array is created based on the values and used as the `list` argument of `Intl.ListFormat`’s `formatToParts()` method. |

### CSS Parts

| Name      | Description                                                                                     |
| --------- | ----------------------------------------------------------------------------------------------- |
| `element` | A `<span>` element that contains the string of the formatted part which `type` is `element`.    |
| `literal` | A `<span>` element that contains the string of the formatted part which `type` is `literal`.    |
| `value`   | The `<span>` element that contains the elements that contain formatted parts of the given list. |
