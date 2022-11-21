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

### Added

- [`intl-listformat`]: Added `formattedParts` property to return the same value
  as `Intl.ListFormat`’s `formatToParts()` method.
- [`intl-relativetimeformat`] Added the custom element
- [`intl-locale`] Added the custom element

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