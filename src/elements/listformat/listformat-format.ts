import {html} from 'lit';

import AbstractIntlListFormatDisplayElement from './abstract-intl-listformat-display-element';

export default class extends AbstractIntlListFormatDisplayElement {
  #value: string = '';

  get value(): string {
    return this.#value;
  }

  override render() {
    if (this.list && this.provider) {
      this.#value = this.provider.intlObject.format(this.list);
    }

    return html`
      <span role="none" part="value">${this.#value}</span>
      <slot></slot>
    `;
  }
}
