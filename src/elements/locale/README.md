# `intl-locale` elements

A custom element for [Intl.Locale](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Locale)

An `<intl-locale>` element represents a Unicode locale identifier. It can be
used with other intl elements to supply locale information for them. It can
also be used to normalize a locale identifier, its `value` property is an
`Intl.Locale` object and its `valueAsString` property is a string value of
the locale identifier (by `Intl.Locale.prototype.toString()`).

## Example

As an ancestor of other intl elements

```html
<intl-locale tag="ja-JP-u-ca-japanese">
  <intl-datetimeformat option-datestyle="long">
    <p>
      <intl-datetimeformat-format>
        <time datetime="1923-10-16">October 16, 1923</time>
      </intl-datetimeformat-format>
    </p>
  </intl-datetimeformat>
</intl-locale>
```

As cousins of other intl elements

```html
<intl-locale id="locale1" tag="ja"></intl-locale>
<intl-locale id="locale2" tag="ja-JP-u-ca-japanese"></intl-locale>
<intl-datetimeformat option-datestyle="long" locales-from="locale1 locale2">
  <p>
    <intl-datetimeformat-format>
      <time datetime="1923-10-16">October 16, 1923</time>
    </intl-datetimeformat-format>
  </p>
</intl-datetimeformat>
```

## `<intl-locale>` (`HTMLIntlLocaleElement`)

[Learn more about `Intl.Locale()`](http://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Locale/Locale)

### Attributes

| Name                     | Type                                                 | Default     | Description | Property                |
| ------------------------ | ---------------------------------------------------- | ----------- | ----------- | ----------------------- |
| `option-basename`        | `Intl.LocaleOptions['baseName'] \| undefined`        | `undefined` |             | `optionBaseName`        |
| `option-calendar`        | `Intl.LocaleOptions['calendar'] \| undefined`        | `undefined` |             | `optionCalendar`        |
| `option-casefirst`       | `Intl.LocaleOptions['caseFirst'] \| undefined`       | `undefined` |             | `optionCaseFirst`       |
| `option-collation`       | `Intl.LocaleOptions['collation'] \| undefined`       | `undefined` |             | `optionCollation`       |
| `option-hourcycle`       | `Intl.LocaleOptions['hourCycle'] \| undefined`       | `undefined` |             | `optionHourCycle`       |
| `option-language`        | `Intl.LocaleOptions['language'] \| undefined`        | `undefined` |             | `optionLanguage`        |
| `option-numberingsystem` | `Intl.LocaleOptions['numberingSystem'] \| undefined` | `undefined` |             | `optionNumberingSystem` |
| `option-numeric`         | `Intl.LocaleOptions['numeric'] \| undefined`         | `undefined` |             | `optionNumeric`         |
| `option-region`          | `Intl.LocaleOptions['region'] \| undefined`          | `undefined` |             | `optionRegion`          |
| `option-script`          | `Intl.LocaleOptions['script'] \| undefined`          | `undefined` |             | `optionScript`          |
| `tag`                    | `string`                                             | `undefined` |             | `tag`                   |

### Properties

| Name                    | Type                                                 | Default     | Read only? | Description                                                                                                                                                               | Attribute                |
| ----------------------- | ---------------------------------------------------- | ----------- | ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------ |
| `baseName`              | `Intl.Locale['baseName'] \| undefined`               | `undefined` | Yes        | [Learn more about `Intl.Locale.prototype.baseName`](http://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Locale/baseName)                 |                          |
| `calendar`              | `Intl.Locale['calendar'] \| undefined`               | `undefined` | Yes        | [Learn more about `Intl.Locale.prototype.calendar`](http://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Locale/calendar)                 |                          |
| `calendars`             | `Intl.Locale['calendars'] \| undefined`              | `undefined` | Yes        | [Learn more about `Intl.Locale.prototype.calendars`](http://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Locale/calendars)               |                          |
| `caseFirst`             | `Intl.Locale['caseFirst'] \| undefined`              | `undefined` | Yes        | [Learn more about `Intl.Locale.prototype.caseFirst`](http://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Locale/caseFirst)               |                          |
| `collation`             | `Intl.Locale['collation'] \| undefined`              | `undefined` | Yes        | [Learn more about `Intl.Locale.prototype.collation`](http://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Locale/collation)               |                          |
| `hourCycle`             | `Intl.Locale['hourCycle'] \| undefined`              | `undefined` | Yes        | [Learn more about `Intl.Locale.prototype.hourCycle`](http://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Locale/hourCycle)               |                          |
| `hourCycles`            | `Intl.Locale['hourCycles'] \| undefined`             | `undefined` | Yes        | [Learn more about `Intl.Locale.prototype.hourCycles`](http://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Locale/hourCycles)             |                          |
| `language`              | `Intl.Locale['language'] \| undefined`               | `undefined` | Yes        | [Learn more about `Intl.Locale.prototype.language`](http://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Locale/language)                 |                          |
| `numberingSystem`       | `Intl.Locale['numberingSystem'] \| undefined`        | `undefined` | Yes        | [Learn more about `Intl.Locale.prototype.numberingSystem`](http://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Locale/numberingSystem)   |                          |
| `numberingSystems`      | `Intl.Locale['numberingSystems'] \| undefined`       | `undefined` | Yes        | [Learn more about `Intl.Locale.prototype.numberingSystems`](http://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Locale/numberingSystems) |                          |
| `numeric`               | `Intl.Locale['numeric'] \| undefined`                | `undefined` | Yes        | [Learn more about `Intl.Locale.prototype.numeric`](http://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Locale/numeric)                   |                          |
| `optionBaseName`        | `Intl.LocaleOptions['baseName'] \| undefined`        | `undefined` |            |                                                                                                                                                                           | `option-basename`        |
| `optionCalendar`        | `Intl.LocaleOptions['calendar'] \| undefined`        | `undefined` |            |                                                                                                                                                                           | `option-calendar`        |
| `optionCaseFirst`       | `Intl.LocaleOptions['caseFirst'] \| undefined`       | `undefined` |            |                                                                                                                                                                           | `option-casefirst`       |
| `optionCollation`       | `Intl.LocaleOptions['collation'] \| undefined`       | `undefined` |            |                                                                                                                                                                           | `option-collation`       |
| `optionHourCycle`       | `Intl.LocaleOptions['hourCycle'] \| undefined`       | `undefined` |            |                                                                                                                                                                           | `option-hourcycle`       |
| `optionLanguage`        | `Intl.LocaleOptions['language'] \| undefined`        | `undefined` |            |                                                                                                                                                                           | `option-language`        |
| `optionNumberingSystem` | `Intl.LocaleOptions['numberingSystem'] \| undefined` | `undefined` |            |                                                                                                                                                                           | `option-numberingsystem` |
| `optionNumeric`         | `Intl.LocaleOptions['numeric'] \| undefined`         | `undefined` |            |                                                                                                                                                                           | `option-numeric`         |
| `optionRegion`          | `Intl.LocaleOptions['region'] \| undefined`          | `undefined` |            |                                                                                                                                                                           | `option-region`          |
| `optionScript`          | `Intl.LocaleOptions['script'] \| undefined`          | `undefined` |            |                                                                                                                                                                           | `option-script`          |
| `region`                | `Intl.Locale['region'] \| undefined`                 | `undefined` | Yes        | [Learn more about `Intl.Locale.prototype.region`](http://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Locale/region)                     |                          |
| `script`                | `Intl.Locale['script'] \| undefined`                 | `undefined` | Yes        | [Learn more about `Intl.Locale.prototype.script`](http://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Locale/script)                     |                          |
| `tag`                   | `string`                                             | `undefined` |            |                                                                                                                                                                           | `tag`                    |
| `textInfo`              | `Intl.Locale['textInfo'] \| undefined`               | `undefined` | Yes        | [Learn more about `Intl.Locale.prototype.textInfo`](http://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Locale/textInfo)                 |                          |
| `timeZones`             | `Intl.Locale['timeZones'] \| undefined`              | `undefined` | Yes        | [Learn more about `Intl.Locale.prototype.timeZones`](http://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Locale/timeZones)               |                          |
| `value`                 | `Intl.Locale \| null`                                | `undefined` | Yes        |                                                                                                                                                                           |                          |
| `valueAsString`         | `Intl.BCP47LanguageTag \| ''`                        | `undefined` | Yes        |                                                                                                                                                                           |                          |
| `weekInfo`              | `Intl.Locale['weekInfo'] \| undefined`               | `undefined` | Yes        | [Learn more about `Intl.Locale.prototype.weekInfo`](http://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Locale/weekInfo)                 |                          |

### Methods

| Name         | Return                | Description                                                                                                                                                 |
| ------------ | --------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `maximize()` | `Intl.Locale \| null` | [Learn more about `Intl.Locale.prototype.maximize()`](http://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Locale/maximize) |
| `minimize()` | `Intl.Locale \| null` | [Learn more about `Intl.Locale.prototype.minimize()`](http://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Locale/minimize) |
