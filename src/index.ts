import IntlDisplayNames from './elements/displaynames/displaynames';

export {
  IntlDisplayNames,
};

export function defineCustomElementsIntlDisplayNames() {
  customElements.define('intl-displaynames', IntlDisplayNames);
}

export function defineCustomElements() {
  defineCustomElementsIntlDisplayNames();
}