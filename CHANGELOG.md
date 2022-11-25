# Changelog

## [Unreleased]

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
  `lang` attribute or an ancestor `intl-locale` element.

### Changed

- [`intl-listformat`] Ignores `intl-listitem` elements with empty text content

## [0.0.1-alpha.7] - 2022-11-19

### Fixed

- Include updated files in the package

### Changed

- Export custom element definition functions without automatic registering them

### Added

- Include LICENSE in the package
## [0.0.1-alpha.6] - 2022-11-17

### Added

- `intl-displaynames` element
- `intl-listformat` element
- `intl-listitem` element