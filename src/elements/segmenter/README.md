# `intl-segmenter` elements

A custom element for [Intl.Segmenter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Segmenter)

`intl-segmenter` elements can be used to separate a string with
language-sensitive sematic segmentation.

A particularly useful case is a page title used in a hero area of a webpage.
Usually this kind of title is used in a graphical way, and often in languages
like Chinese and Japanese, because they are written in characters without
spaces to separate words, they could result in awkward line breaks. For
example, the Chinese sentence, “欢迎来到我的网站！” (Welcome to my website), has
the following semantic segments:

+ “欢迎” (“Welcome”)
+ “来到” (“to”)
+ “我的” (“my”)
+ “网站” (“website”)
+ “！” (exclamation mark)

But it could be broken into:

```
欢迎来到我
的网站！
```
(The word “我的” is broken into two lines)

The ideal result should be:

```
欢迎来到
我的网站！
```

The `<intl-segmenter-segment>` element takes its own `textContent`, segments
it, and wraps each segment in a `<span part="segment">` element in its shadow
DOM. For the above case, the `<intl-segmenter>` element should have its
`option-granularity` attribute set to `word`, and the `<span>` elements in
the Shadow DOM will have to `wordlike` as their parts, and non-wordlike
segments are not wrapped in a `<span>`, this makes sure that punctuation
segments will stay in the appropriate line between line breaks (e.g. a comma
won’t be at the beginning of a line and an opening quotation mark won’t be at
the beginning of a line).

## Example

Segmenting a string into words

```html
<style>.title-content::part(wordlike) { white-space: nowrap; }</style>
<intl-segmenter locales="zh-Hans" option-granularity="word">
  <h1>
    <intl-segmenter-segment class="title-content">
      欢迎来到我的网站！
    </intl-segmenter-segment>
  </h1>
</intl-segmenter>
```

## `<intl-segmenter>` (`HTMLIntlSegmenterElement`)

[Learn more about `Intl.Segmenter()`](http://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Segmenter/Segmenter)

### Attributes

| Name                   | Type                                   | Default      | Description | Property              |
| ---------------------- | -------------------------------------- | ------------ | ----------- | --------------------- |
| `locales`              | `string \| undefined`                  | `undefined`  |             | `locales`             |
| `locales-from`         | `string \| undefined`                  | `undefined`  |             | `localesFrom`         |
| `option-granularity`   | `Intl.SegmenterOptions['granularity']` | `'grapheme'` |             | `optionGranularity`   |
| `option-localematcher` | `Intl.RelativeTimeFormatLocaleMatcher` | `'best fit'` |             | `optionLocaleMatcher` |

### Properties

| Name                  | Type                                   | Default      | Read only? | Description | Attribute              |
| --------------------- | -------------------------------------- | ------------ | ---------- | ----------- | ---------------------- |
| `intlObject`          | `Intl.Segmenter`                       | `undefined`  | Yes        |             |                        |
| `localeList`          | `DOMTokenList`                         | `undefined`  | Yes        |             |                        |
| `locales`             | `string \| undefined`                  | `undefined`  |            |             | `locales`              |
| `localesFrom`         | `string \| undefined`                  | `undefined`  |            |             | `locales-from`         |
| `localesFromElements` | `HTMLIntlLocaleElement[]`              | `undefined`  | Yes        |             |                        |
| `optionGranularity`   | `Intl.SegmenterOptions['granularity']` | `'grapheme'` |            |             | `option-granularity`   |
| `optionLocaleMatcher` | `Intl.RelativeTimeFormatLocaleMatcher` | `'best fit'` |            |             | `option-localematcher` |

### Methods

| Name                | Return                          | Description                                                                                                                                                                     |
| ------------------- | ------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `resolvedOptions()` | `Intl.ResolvedSegmenterOptions` | [Learn more about `Intl.Segmenter.prototype.resolvedOptions()`](http://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Segmenter/resolvedOptions) |

***

## `<intl-segmenter-segment>` (`HTMLIntlSegmenterSegmentElement`)

[Learn more about `Intl.Segmenter.prototype.segment`](http://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Segmenter/segment)

### Attributes

| Name       | Type                  | Default     | Description | Property   |
| ---------- | --------------------- | ----------- | ----------- | ---------- |
| `provider` | `string \| undefined` | `undefined` |             | `provider` |

### Properties

| Name              | Type                                    | Default     | Read only? | Description                                                                      | Attribute  |
| ----------------- | --------------------------------------- | ----------- | ---------- | -------------------------------------------------------------------------------- | ---------- |
| `input`           | `string`                                | `undefined` | Yes        | A read only reference to the `input` argument of `Intl.Segmenter`’s `segment()`. |            |
| `provider`        | `string \| undefined`                   | `undefined` |            |                                                                                  | `provider` |
| `providerElement` | `HTMLIntlSegmenterElement \| undefined` | `undefined` | Yes        |                                                                                  |            |
| `value`           | `Intl.Segments \| undefined`            | `undefined` | Yes        |                                                                                  |            |

### Slots

| Name | Description                                                                                                                                                              |
| ---- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
|      | The slot should only contain plain text, its `textContent` is used as the `input` argument of `Intl.Segmenter`’s `segment()`. Any HTML elements in the slot are ignored. |

### CSS Parts

| Name       | Description                                                                                                                                                                                                                                                                                                                                                                                            |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `segment`  | The `<span>` element that contains the text of a segment. Not that if the provider element’s `option-granularity` is `word`, for a non-word-like segment, the text is not wrapped in a `<span>` element. This is to avoid characters like punctuation marks being inappropriately wrapped to the next line, e.g. a comma at the beginning of a line, or a opening quotation mark at the end of a line. |
| `value`    | The `<span>` element that contains the segmented HTML result.                                                                                                                                                                                                                                                                                                                                          |
| `wordlike` | The `<span>` element that contains the text of a segment which `isWordLike` is `true`.                                                                                                                                                                                                                                                                                                                 |
