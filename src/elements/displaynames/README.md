# `Intl.DisplayNames` elements

## `<intl-displaynames>` (`HTMLIntlDisplayNamesElement`)

[Learn more about `Intl.DisplayNames()`](http://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DisplayNames/DisplayNames)

### Attributes

| Name                     | Type                                          | Default      | Description | Property                |
| ------------------------ | --------------------------------------------- | ------------ | ----------- | ----------------------- |
| `locales`                | `string \| undefined`                         | `undefined`  |             | `locales`               |
| `locales-from`           | `string \| undefined`                         | `undefined`  |             | `localesFrom`           |
| `option-fallback`        | `Intl.DisplayNamesOptions['fallback']`        | `'code'`     |             | `optionFallback`        |
| `option-languagedisplay` | `Intl.DisplayNamesOptions['languageDisplay']` | `'dialect'`  |             | `optionLanguageDisplay` |
| `option-localematcher`   | `Intl.RelativeTimeFormatLocaleMatcher`        | `'best fit'` |             | `optionLocaleMatcher`   |
| `option-style`           | `Intl.DisplayNamesOptions['style']`           | `'long'`     |             | `optionStyle`           |
| `option-type`            | `Intl.DisplayNamesOptions['type']`            | `'language'` |             | `optionType`            |

### Properties

| Name                    | Type                                          | Default      | Read only? | Description | Attribute                |
| ----------------------- | --------------------------------------------- | ------------ | ---------- | ----------- | ------------------------ |
| `consumerElements`      | `ConsumerElement[]`                           | `undefined`  | Yes        |             |                          |
| `intlObject`            | `Intl.DisplayNames`                           | `undefined`  | Yes        |             |                          |
| `localeList`            | `LocaleList`                                  | `undefined`  | Yes        |             |                          |
| `locales`               | `string \| undefined`                         | `undefined`  |            |             | `locales`                |
| `localesFrom`           | `string \| undefined`                         | `undefined`  |            |             | `locales-from`           |
| `localesFromElements`   | `HTMLIntlLocaleElement[]`                     | `undefined`  | Yes        |             |                          |
| `optionFallback`        | `Intl.DisplayNamesOptions['fallback']`        | `'code'`     |            |             | `option-fallback`        |
| `optionLanguageDisplay` | `Intl.DisplayNamesOptions['languageDisplay']` | `'dialect'`  |            |             | `option-languagedisplay` |
| `optionLocaleMatcher`   | `Intl.RelativeTimeFormatLocaleMatcher`        | `'best fit'` |            |             | `option-localematcher`   |
| `optionStyle`           | `Intl.DisplayNamesOptions['style']`           | `'long'`     |            |             | `option-style`           |
| `optionType`            | `Intl.DisplayNamesOptions['type']`            | `'language'` |            |             | `option-type`            |

### Methods

| Name              | Return                             | Description                                                                                                                                                                           |
| ----------------- | ---------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `resolvedOptions` | `Intl.ResolvedDisplayNamesOptions` | [Learn more about `Intl.DisplayNames.prototype.resolvedOptions()`](http://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DisplayNames/resolvedOptions) |

***

## `<intl-displaynames-of>` (`HTMLIntlDisplayNamesOfElement`)

[Learn more about `Intl.DisplayNames.prototype.of`](http://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DisplayNames/of)

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

| Name | Description                                                                                                                                               |
| ---- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
|      | The slotted element must be a `<data>` element with a `value` attribute. The value is used as the `code` argument of `Intl.DisplayNames`’s `of()` method. |

### CSS Parts

| Name    | Description                                                                          |
| ------- | ------------------------------------------------------------------------------------ |
| `value` | The `<span>` element that contains the string of the display name of the given code. |
