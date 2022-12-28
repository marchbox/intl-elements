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

Or in browser:

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

`intl-element` translates these as such:

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
element’s is `intl-{constructor}-{method}`.

Consumer elements don’t have to be desendants of their corresponding provider
elements, you can use the `provider` attribute to link them together.

```html
<intl-relativetimeformat id="rtf" locales="th-u-nu-thai">
</intl-relativetimeformat>

<p>
  {{message('Last seen')}}:
  <intl-relativetimeformat-format provider="rtf">
    <data slot="rtime" value="-10">10</data>
    <data slot="unit" value="days">days</data>
    ago
  </intl-relativetimeformat-format>
</p>
<p>
  {{message('Next available')}}:
  <intl-relativetimeformat-format provider="rtf">
    In
    <data slot="rtime" value="5">5</data>
    <data slot="unit" value="days">days</data>
  </intl-relativetimeformat-format>
</p>
```

### Locale list

TODO

### Attributes

TODO

### Styling

Although the consumer elements have shadow DOM, the content is usually plain
text, so it’ll inherit CSS styles like colors and fonts. However, if you do want
to style some of the internal components, you can use CSS Parts. All consumer
elements have a part named `value` as the container element, usually it’s a
`<span>` element. Also when you use a consumer element to format to parts, e.g.
`<intl-datetimeformat-formattoparts>`, each formatted part is usually inside its
own container element and has its own CSS part, e.g `year`, `month`, `day`, etc.

```css
intl-datetimeformat-formattoparts::part(year) {
  font-weight: 700;
}

intl-segmenter-segment::part(segment) {
  background-color: lemonchiffon;
  padding-inline: .25rem;
}
```

Refer to the API reference documents below for all parts.

## Accessibility

The intl elements look a bit verbose in HTML code, but the existence of them
are invisible to the accessibility tree. Most elements has their content as
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
