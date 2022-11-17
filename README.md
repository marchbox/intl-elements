# intl-elements

> **Warning**
> This project is under active development. Custom element APIs may change.

**intl-elements** is a set of custom elements that make it easy to use the `Intl`
APIs in a declarative way.

For example, instead of:

```js
const dn = new Intl.DisplayNames('ja', {type: 'language'});
dn.of('en-US'); // => '英語 (米国)'
```

You can write:

```html
<intl-displaynames locale="ja" type="language" of="en-US"></intl-displaynames>
```