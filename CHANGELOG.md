# Changelog

## [Unreleased]

### BREAKING CHANGES

- All default values of provider elements’ `option-*` attributes are now
  `undefined`, if you relied on `<intl-displaynames>`’s `option-type` attribute
  being `language` by default, you need to set it to `language` explicitly now

---

## [0.0.1-alpha.17] - 2022-12-31

### BREAKING CHANGES

- Removed `consumerElements` property from provider elements

### Added

- More documentations

### Changed

- `localeList` property is now a `DOMTokenList` (#45)

---

## [0.0.1-alpha.16] - 2022-12-28

### BREAKING CHANGES

- Removed `display-*` attributes from `<intl-locale>` element

### Added

- `localeList` property can access members via indexes now, e.g.
  `myIntlElement.localeList[0]`.
- Documentations
- Added Custom Elements Manifest file: `custom-elements.json`

### Fixed

- Providers now observe `<html>`’s `lang` attribute changes

---

## [0.0.1-alpha.15] - 2022-12-21

### Fixed

- `intl-elements` resolves properly now
- Custom elements are added to `JSX.IntrinsicElements` now

---

## [0.0.1-alpha.14] - 2022-12-19

### Added

- [`intl-collator`] Added the custom element
- [`intl-collator-compare`] Added the custom element

### Fixed

- [`intl-segmenter-segment`] Screen readers read the full text input now,
  instead of every the segmented text in span elements

---

## [0.0.1-alpha.13] - 2022-12-10

### Added

- [`intl-pluralrules`] Added the custom element
- [`intl-pluralrules-select`] Added the custom element

### Fixed

- [`intl-numberformat-format`, `intl-numberformat-formattoparts`] Renders when
  the number is 0

---

## [0.0.1-alpha.12] - 2022-12-09

### Added

- [`intl-datetimeformat`] Added the custom element
- [`intl-datetimeformat-format`] Added the custom element
- [`intl-datetimeformat-formattoparts`] Added the custom element
- [`intl-datetimeformat-formatrange`] Added the custom element
- [`intl-datetimeformat-formatrangetoparts`] Added the custom element

### Changed

- All `part` names are in kebab case instead of camel case now

---

## [0.0.1-alpha.11] - 2022-12-07

### Fixed

- When the `locales` attrbute contains multiple locales separated by
  whitespaces, its `Intl` object throws errors. This is due to the `locales`
  argument passed into an `Intl` is incorrectly typed as a string instead of
  an array

### Added

- [`intl-numberformat`] Added the custom element.
- [`intl-numberformat-format`] Added the custom element.
- [`intl-numberformat-formattoparts`] Added the custom element.
- All consumer element’s `value` part element now has `lang` and `dir`
  attributes set based on the first locale in their provider element’s
  `localeList` property

### Changed

- All attribute values are case-insensitive now.

---

## [0.0.1-alpha.10] - 2022-12-04

### Added

- All consumer elements now can specify their provider element via the
  `provider` attribute, hence, they no long need to be descendants of their
  provider elements
- [`intl-segmenter`] Added the custom element
- [`intl-segmenter-segment`] Added the custom element

---

## [0.0.1-alpha.9] - 2022-12-03

### BREAKING CHANGES

- Redesigned all the custom element APIs, details will be added to README.md
  with the `1.0.0` release

---

## [0.0.1-alpha.8] - 2022-11-27

### BREAKING CHANGES

- Renamed all attributes and properties to one of the following format:
  * `option-<option key>` / `option<Option Key>: For options of an constructor
    function, e.g. `option-type` / `optionType`, `option-localematcher` /
    `optionLocaleMatcher`, as a result, `intl-style` is now `option-style`
  * `<method name>-<argument name>` / `<method name><Argument Name>`: For
    arguments of a method, e.g. `format-unit` / `formatUnit`, `of-code` /
    `ofCode`, etc.
  * `locales`: This attribute remains unchanged
- All `option-*` attributes are not reflected from their corresponding
  properties anymore.

### Added

- [`intl-displaynames`]: Added `value` read only property, its value is the same
  as its trimmed text content
- [`intl-listformat`]: Added `formattedParts` read only property to return the
  same value as `Intl.ListFormat`’s `formatToParts()` method.
- [`intl-listformat`]: Added `value` read only property, its value is the same
  as its trimmed text content
- [`intl-relativetimeformat`] Added the custom element
- [`intl-locale`] Added the custom element
- Specifiying locales with the new `locales-from`, an ancestor element with the
  `lang` attribute or an ancestor `intl-locale` element

### Changed

- [`intl-listformat`] Ignores `intl-listitem` elements with empty text content
- `localeList` property is now a `LocaleList`, which implements the
  `DOMTokenList` interface, and can be used similarly to the `classList`
  property, but accessing members with the bracket notation, e.g.
  `localeList[0]`, `localeList[1]`, etc., is not supported
- Locales are now normalized to BCP 47 language tags before being passed to the
  `Intl` constructors, and invalid locales are now removed
- `localeList` changes will only result in `locales` changes if `locales`
  has been defined by the user

### Removed

- `lang` and `dir` no longer reflect the first locale in `localeList`

---

## [0.0.1-alpha.7] - 2022-11-19

### Fixed

- Include updated files in the package

### Changed

- Export custom element definition functions without automatic registering them

### Added

- Include LICENSE in the package

---

## [0.0.1-alpha.6] - 2022-11-17

### Added

- `intl-displaynames` element
- `intl-listformat` element
- `intl-listitem` element