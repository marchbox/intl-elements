# `intl-displaynames` elements

A custom element for [Intl.DisplayNames](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DisplayNames)

`intl-displaynames` elements are used to create display names of language
names, region/country names, script names, calendar names, etc. Use `<data>`
elements with `value` attributes to pass the codes to get display names.

## Example

Display language names:

```html
<intl-displaynames locales="en" option-type="language">
  <ul>
    <li>
      <intl-displaynames-of>
        <data value="ar-EG">Arabic (Egypt)</data>
      </intl-displaynames-of>
    </li>
    <li>
      <intl-displaynames-of>
        <data value="zh-Hant">Traditional Chinese</data>
      </intl-displaynames-of>
    </li>
    <li>
      <intl-displaynames-of>
        <data value="de">German</data>
      </intl-displaynames-of>
    </li>
  </ul>
</intl-displaynames>
```

Display date time field names:

```html
<intl-displaynames locales="ja" option-type="datetimefield">
  <label>
    <intl-displaynames-of>
      <data value="year">Year</data>
    </intl-displaynames-of>
    <input name="year">
  </label>
  <label>
    <intl-displaynames-of>
      <data value="month">Month</data>
    </intl-displaynames-of>
    <input name="month">
  </label>
  <label>
    <intl-displaynames-of>
      <data value="day">Day</data>
    </intl-displaynames-of>
    <input name="day">
  </label>
</intl-displaynames>
```

## `<intl-displaynames>` (`HTMLIntlDisplayNamesElement`)

[Learn more about `Intl.DisplayNames()`](http://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DisplayNames/DisplayNames)

### Attributes

| Name                     | Type                                                       | Default     | Required? | Description | Property                |
| ------------------------ | ---------------------------------------------------------- | ----------- | --------- | ----------- | ----------------------- |
| `locales`                | `string \| undefined`                                      | `undefined` |           |             | `locales`               |
| `locales-from`           | `string \| undefined`                                      | `undefined` |           |             | `localesFrom`           |
| `option-fallback`        | `Intl.DisplayNamesOptions['fallback'] \| undefined`        | `undefined` |           |             | `optionFallback`        |
| `option-languagedisplay` | `Intl.DisplayNamesOptions['languageDisplay'] \| undefined` | `undefined` |           |             | `optionLanguageDisplay` |
| `option-localematcher`   | `Intl.RelativeTimeFormatLocaleMatcher \| undefined`        | `undefined` |           |             | `optionLocaleMatcher`   |
| `option-style`           | `Intl.DisplayNamesOptions['style'] \| undefined`           | `undefined` |           |             | `optionStyle`           |
| `option-type`            | `Intl.DisplayNamesOptions['type']`                         | `undefined` | Yes       |             | `optionType`            |

### Properties

| Name                    | Type                                                       | Default     | Required? | Read only? | Description | Attribute                |
| ----------------------- | ---------------------------------------------------------- | ----------- | --------- | ---------- | ----------- | ------------------------ |
| `intlObject`            | `Intl.DisplayNames`                                        | `undefined` |           | Yes        |             |                          |
| `localeList`            | `DOMTokenList`                                             | `undefined` |           | Yes        |             |                          |
| `locales`               | `string \| undefined`                                      | `undefined` |           |            |             | `locales`                |
| `localesFrom`           | `string \| undefined`                                      | `undefined` |           |            |             | `locales-from`           |
| `localesFromElements`   | `HTMLIntlLocaleElement[]`                                  | `undefined` |           | Yes        |             |                          |
| `optionFallback`        | `Intl.DisplayNamesOptions['fallback'] \| undefined`        | `undefined` |           |            |             | `option-fallback`        |
| `optionLanguageDisplay` | `Intl.DisplayNamesOptions['languageDisplay'] \| undefined` | `undefined` |           |            |             | `option-languagedisplay` |
| `optionLocaleMatcher`   | `Intl.RelativeTimeFormatLocaleMatcher \| undefined`        | `undefined` |           |            |             | `option-localematcher`   |
| `optionStyle`           | `Intl.DisplayNamesOptions['style'] \| undefined`           | `undefined` |           |            |             | `option-style`           |
| `optionType`            | `Intl.DisplayNamesOptions['type']`                         | `undefined` | Yes       |            |             | `option-type`            |

### Methods

| Name                | Return                             | Description                                                                                                                                                                           |
| ------------------- | ---------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `resolvedOptions()` | `Intl.ResolvedDisplayNamesOptions` | [Learn more about `Intl.DisplayNames.prototype.resolvedOptions()`](http://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DisplayNames/resolvedOptions) |

***

## `<intl-displaynames-of>` (`HTMLIntlDisplayNamesOfElement`)

[Learn more about `Intl.DisplayNames.prototype.of`](http://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DisplayNames/of)

### Attributes

| Name       | Type                  | Default     | Required? | Description | Property   |
| ---------- | --------------------- | ----------- | --------- | ----------- | ---------- |
| `provider` | `string \| undefined` | `undefined` |           |             | `provider` |

### Properties

| Name              | Type                                       | Default     | Required? | Read only? | Description | Attribute  |
| ----------------- | ------------------------------------------ | ----------- | --------- | ---------- | ----------- | ---------- |
| `provider`        | `string \| undefined`                      | `undefined` |           |            |             | `provider` |
| `providerElement` | `HTMLIntlDisplayNamesElement \| undefined` | `undefined` |           | Yes        |             |            |
| `value`           | `string`                                   | `undefined` |           | Yes        |             |            |

### Slots

| Name | Description                                                                                                                                               |
| ---- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
|      | The slotted element must be a `<data>` element with a `value` attribute. The value is used as the `code` argument of `Intl.DisplayNames`’s `of()` method. |

### CSS Parts

| Name    | Description                                                                          |
| ------- | ------------------------------------------------------------------------------------ |
| `value` | The `<span>` element that contains the string of the display name of the given code. |
