# `Intl.Segmenter` elements

## `<intl-segmenter>` (`HTMLIntlSegmenterElement`)

[Learn more about `Intl.Segmenter`](http://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Segmenter/Segmenter)

### Attributes

| Name                   | Type                                   | Default      | Property              |
| ---------------------- | -------------------------------------- | ------------ | --------------------- |
| `locales`              | `string \| undefined`                  | `undefined`  | `locales`             |
| `locales-from`         | `string \| undefined`                  | `undefined`  | `localesFrom`         |
| `option-granularity`   | `Intl.SegmenterOptions['granularity']` | `'grapheme'` | `optionGranularity`   |
| `option-localematcher` | `Intl.RelativeTimeFormatLocaleMatcher` | `'best fit'` | `optionLocaleMatcher` |

### Properties

| Name                  | Type                                   | Default      | Read only? | Attribute              |
| --------------------- | -------------------------------------- | ------------ | ---------- | ---------------------- |
| `consumerElements`    | `ConsumerElement[]`                    | `undefined`  | Yes        |                        |
| `intlObject`          | `Intl.Segmenter`                       | `undefined`  | Yes        |                        |
| `localeList`          | `LocaleList`                           | `undefined`  | Yes        |                        |
| `locales`             | `string \| undefined`                  | `undefined`  |            | `locales`              |
| `localesFrom`         | `string \| undefined`                  | `undefined`  |            | `locales-from`         |
| `localesFromElements` | `HTMLIntlLocaleElement[]`              | `undefined`  | Yes        |                        |
| `optionGranularity`   | `Intl.SegmenterOptions['granularity']` | `'grapheme'` |            | `option-granularity`   |
| `optionLocaleMatcher` | `Intl.RelativeTimeFormatLocaleMatcher` | `'best fit'` |            | `option-localematcher` |

### Methods

| Name              | Return                          | Description                                                                      |
| ----------------- | ------------------------------- | -------------------------------------------------------------------------------- |
| `resolvedOptions` | `Intl.ResolvedSegmenterOptions` | [Learn more about `Intl.Segmenter.prototype.resolvedOptions`](http://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Segmenter/resolvedOptions) |

***

## `<intl-segmenter-segment>` (`HTMLIntlSegmenterSegmentElement`)

[Learn more about `Intl.Segmenter.prototype.segment`](http://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Segmenter/segment)

### Attributes

| Name       | Type                  | Default     | Property   |
| ---------- | --------------------- | ----------- | ---------- |
| `provider` | `string \| undefined` | `undefined` | `provider` |

### Properties

| Name              | Type                         | Default     | Read only? | Attribute  |
| ----------------- | ---------------------------- | ----------- | ---------- | ---------- |
| `input`           | `string`                     | `undefined` | Yes        |            |
| `provider`        | `string \| undefined`        | `undefined` |            | `provider` |
| `providerElement` | `P \| undefined`             | `undefined` | Yes        |            |
| `value`           | `Intl.Segments \| undefined` | `undefined` | Yes        |            |

### Slots

| Name | Description                                                                      |
| ---- | -------------------------------------------------------------------------------- |
|      | The slot should only contain plain text, its `textContent` is used as the `input` argument of `Intl.Segmenter`’s `segment()`. Any HTML elements in the slot are ignored. |

### CSS Parts

| Name       | Description                                                                      |
| ---------- | -------------------------------------------------------------------------------- |
| `segment`  | The `<span>` element that contains the text of a segment. Not that if the provider element’s `option-granularity` is `word`, for a none-word-like segment, the text is not wrapped in a `<span>` element. This is to avoid characters like punctuation marks being inappropriately wrapped to the next line, e.g. a comma at the beginning of a line, or a opening quotation mark at the end of a line. |
| `value`    | The `<span>` element that contains the segmented HTML result.                    |
| `wordlike` | The `<span>` element that contains the text of a segment which `isWordLike` is `true`. |
