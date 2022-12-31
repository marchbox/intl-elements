# intl-elements

> **Warning**
> This project is under active development. Custom element APIs may change.

**intl-elements** is a set of custom elements that make it easy to use the
[`Intl` APIs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl),
a set of built-in browser APIs, in a declarative way.

For example, instead of:

```js
const dn = new Intl.DisplayNames('ja', {type: 'language'});
dn.of('en-US'); // => '英語 (米国)'
dn.of('zh'); // => '中国語'
```

You can write:

```html
<intl-displaynames locales="ja" option-type="language">
  <p>
    <intl-displaynames-of>
      <data value="en-US">English (US)</data>
    </intl-displaynames-of>
  </p>
  <p>
    <intl-displaynames-of>
      <data value="zh">Chinese</data>
    </intl-displaynames-of>
  </p>
</intl-displaynames>

<script type="module">
  import {
    defineIntlDisplayNamesElements,
  } from 'https://esm.sh/intl-elements?bundle';
  defineIntlDisplayNamesElements();
</script>
```

## Install

Install this package with NPM or Yarn:

```sh
npm install intl-elements
# yarn add intl-elements
```

Or in browsers:

```js
<script type="module">
  import {defineIntlElements} from 'https://esm.sh/intl-elements?bundle';
</script>
```

## Use

### Define custom elements

The package doesn’t automatically define all the custom elements, but it
provides multiple functions to do so.

You can import them like so:

```js
import {defineIntlElements} from 'intl-elements';

defineIntlElements();
```

```js
import {
  defineIntlCollatorElements,
  defineIntlDateTimeFormatElements,
  defineIntlDisplayNamesElements,
  defineIntlListFormatElements,
  defineIntlLocaleElements,
  defineIntlNumberFormatElements,
  defineIntlPluralRulesElements,
  defineIntlRelativeTimeFormatElements,
  defineIntlSegmenterElements,
} from 'intl-elements';

defineIntlCollatorElements();
defineIntlDateTimeFormatElements();
defineIntlDisplayNamesElements();
defineIntlListFormatElements();
defineIntlLocaleElements();
defineIntlNumberFormatElements();
defineIntlPluralRulesElements();
defineIntlRelativeTimeFormatElements();
defineIntlSegmenterElements();
```

### Provider elements and consumer elements

When using the `Intl` APIs in JavaScript, you always need to create an instance
of one of the constructors with a list of locales and options, then call a
method on that instance to do what you need. For example:

```js
// Creates an instance of `Intl.NumberFormat`…
const nf = new Intl.NumberFormat(
  // … with a list of locales…
  ['en-JP', 'en'],
  // … and options.
  {style: 'currency', currency: 'JPY'}
);
// Calls a method on the instance to format the number 100000.
nf.format(100000);
```

`intl-elements` translate these as such:

+ constructor → **provider element**, e.g. `<intl-numberformat>`
    - locale list → `locales` attribute of provider elements (there are other
      ways to specify locales, which we’ll talk about later)
    - options → `option-*` attributes of provider elements, e.g.
      `option-style="currency"`
+ methods → **consumer elements**, e.g. `<intl-numberformat-format>`
    - method arguments → it varies but in most cases, `<data>` or `<time>`
      elements as children of consumer elements

Take the above JavaScript example, we can achieve this with `intl-element`:

```html
<intl-numberformat locales="en-JP en" option-style="currency"
    option-currency="jpy">
  <intl-numbeformat-format>
    <data value="100000">Ten thousand Japanese yen</data>
  </intl-numberformat-format>
</intl-numberformat>
```

The naming convention of provider elements is `intl-{constructor}`, and consumer
elements’ is `intl-{constructor}-{method}`.

Consumer elements don’t have to be descendants of their corresponding provider
elements, you can use the `provider` attribute to link them together.

```html
<intl-relativetimeformat id="rtf" locales="th-u-nu-thai">
</intl-relativetimeformat>

<p>
  {{message('Last seen:')}}
  <intl-relativetimeformat-format provider="rtf">
    <data slot="rtime" value="-10">10</data>
    <data slot="unit" value="days">days</data>
    ago
  </intl-relativetimeformat-format>
</p>
<p>
  {{message('Next available:')}}
  <intl-relativetimeformat-format provider="rtf">
    In
    <data slot="rtime" value="5">5</data>
    <data slot="unit" value="days">days</data>
  </intl-relativetimeformat-format>
</p>
```

### Locale list

All provider elements need a list of locales to create their `Intl` instances.
It’s perfectly fine to only specify one locale, that’s likely the most common
case. If multiple locales are specified, they will be passed into the `Intl`
constructor for
[locale identification and negotiation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/#locale_identification_and_negotiation). This could be useful if you support
non-common locales and some of them may not be supported by all browsers.

There are 4 ways to specify the locale list, and they are prioritized in the
following order:

1. `locales` attribute on the provider element.

    The `locales` attribute is a space-separated list of BCP 47 locale
    identifiers. This list is passed to the `Intl` constructor as-is, but any
    invalid locale is ignored.

2. `lang` attribute on the provider element.

    If the provider element doesn’t have `locales` attribute, it will use the
    `lang` attribute, if exists, as the locale list. Although you can only
    specify one locale.

3. The `<intl-locale>` elements that are referenced by the `locales-from`
    attribute on the provider element.

    If the provider element doesn’t have `locales` attribute or `lang`
    attribute, it will look for the `<intl-locale>` elements that are referenced
    by the `locales-from` attribute. The `locales-from` attribute is a
    space-separated list of IDs of `<intl-locale>` elements. The locale list is
    the concatenation of the `value` properties, which are `Intl.Locale`
    objects, of the referenced `<intl-locale>` elements.

    ```html
    <intl-locale id="locale1" tag="en"></intl-locale>
    <intl-locale id="locale2" tag="en" option-region="us"></intl-locale>

    <intl-displaynames locales-from="locale1 locale2"></intl-displaynames>
    ```

    The locale list of the `<intl-displaynames>` element is `['en', 'en-US']`.

4. An acenstor element of the provider element.

    If the provider element doesn’t have `locales` attribute, `lang` attribute,
    or `locales-from` attribute, it will look for the closest `<intl-locale>`
    element or the closest element with `lang` attribute.

    ```html
    <intl-locale tag="ja">
      <intl-numberformat></intl-numberformat>
    </intl-locale>
    ```

    The locale list of the `<intl-numberformat>` element is `['ja']`.

    ```html
    <div lang="zh-Hant">
      <div>
        <intl-numberformat></intl-numberformat>
      </div>
    </div>
    ```

    The locale list of the `<intl-numberformat>` element is `['zh-Hant']`.

    This allows you not to explicitly specify any locales for all the intl
    elements if all of their locales are the same as the document’s language,
    i.e. the `lang` attribute of the `<html>` element.

#### `localeList` property

All provider elements have a `localeList` property, which is a `DOMTokenList`.
It is an exact reflection of value of the `locales` attribute. The `localeList`
is read only, and works the same way as `classList`, `relList`, etc. You can
refere to
[`DOMTokenList`’s MDN documentation](https://developer.mozilla.org/en-US/docs/Web/API/DOMTokenList)
for more details.

### Attributes

All attribute names are in lowercase. For provider elements, they use`option-**`
attributes to specify options for their `Intl` instances. These attributes are
always in one word after “option-”, e.g. `option-style`,
`option-numberingsystem`.

All attribute values are case-insensitive. For example, the `type` option of
`Intl.DisplayNames` constructor has `dateTimeField` as one of its possible
values, but you can use `datetimefield` or `DATETIMEFIELD` as the value of
`option-type` attribute.

### Styling

Although the consumer elements have shadow DOM, the content is usually plain
text, so it’ll inherit CSS styles like colors and fonts. However, if you do want
to style some of the internal components, you can use CSS Parts. All consumer
elements have a part named `value` as the container element, usually, it’s a
`<span>` element. Also when you use a “format to parts’ consumer element, e.g.
`<intl-datetimeformat-formattoparts>`, each formatted part is usually inside its
own container element and has its own CSS part, e.g `year`, `month`, `day`, etc.

The `format**ToParts` methods of `Intl` APIs return an array of objects, each
object represents a formatted part, and has a `type` property and optionally
a `source` property. The values of these 2 properties are used as the CSS part
names. If a value is in camel case, it’ll be converted to kebab case when used
as a CSS part name. For example, `relatedYear` → `related-year`. In the case of
`<intl-segmenter-segment>`, each part has the name `segment`, and if a segment
has `isWordLike` as `true`, its corresponding part element also has `wordlike`
as one of its part names.

```css
intl-datetimeformat-formattoparts::part(related-year) {
  font-weight: 700;
}

intl-segmenter-segment::part(segment) {
  background-color: lemonchiffon;
  padding-inline: .25rem;
}
```

Refer to the API reference documents below for all parts.

## Accessibility

The intl elements look a bit verbose in HTML code, but their existence is
invisible to the accessibility tree. Most elements have their content as
plain text, so screen readers can read through it with no problems. For all the
`**toparts` elements and `intl-segmenter-segment` element, due to their purpose,
they wrap content into many `<span>` elements in the shadow DOM, this could make
screen readers read the content span by span. So these elements mark the
content container element with `aria-hidden="true"`, and use another visually
invisible element to provide content for screen readers.

## Additional features

Because the content locale of an intl element could be different from the
HTML document’s locale, the content container elements in all the consumer
elements’ shadow DOMs have their own `lang` and `dir` attributes. Their values
are determined by the provider’s current active locale, this locale itself
is `lang`’s value, and it uses `new Intl.Locale(locale).textInfo.direction`
to check if this locale’s language is RTL, if so add `dir="rtl"` attribute,
otherwise, remove the `dir` attribute.

## API references

+ [`intl-collator`](./src/elements/collator/README.md)
    - `intl-colaltor-compare`
+ [`intl-datetimeformat`](./src/elements/datetimeformat/README.md)
    - `intl-datetimeformat-format`
    - `intl-datetimeformat-formattoparts`
    - `intl-datetimeformat-formatrange`
    - `intl-datetimeformat-formatrangetoparts`
+ [`intl-displaynames`](./src/elements/displaynames/README.md)
    - `intl-displaynames-of`
+ [`intl-listformat`](./src/elements/listformat/README.md)
    - `intl-listformat-format`
    - `intl-listformat-formattoparts`
+ [`intl-locale`](./src/elements/locale/README.md)
+ [`intl-numberformat`](./src/elements/numberformat/README.md)
    - `intl-numberformat-format`
    - `intl-numberformat-formattoparts`
+ [`intl-pluralrules`](./src/elements/pluralrules/README.md)
    - `intl-pluralrules-select`
+ [`intl-relativetimeformat`](./src/elements/relativetimeformat/README.md)
    - `intl-relativetimeformat-format`
    - `intl-relativetimeformat-formattoparts`
+ [`intl-segmenter`](./src/elements/segmenter/README.md)
    - `intl-segmenter-segment`

## Further readings

+ [`Intl` in MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl)
+ [ECMA-402 specs](https://tc39.es/ecma402/)
+ [Active proposals](https://github.com/tc39/proposals/blob/main/ecma402/README.md)
+ [Stage 0 proposals](https://github.com/tc39/proposals/blob/main/ecma402/stage-0-proposals.md)
