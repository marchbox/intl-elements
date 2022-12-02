import {html} from 'lit';

import AbstractIntlListFormatDisplayElement from './abstract-intl-listformat-display-element';

export default class extends AbstractIntlListFormatDisplayElement {
  #value: Intl.ListFormatPart[] = [];

  get value(): Intl.ListFormatPart[] {
    return this.#value;
  }

  override render() {
    if (this.list) {
      this.#value = this.parent!.intlObject.formatToParts(this.list);
    }

    return html`
      <span role="none" part="value">
        ${this.#value.map(part =>
            html`<span part="${part.type}" role="none">${part.value}</span>`)}
      </span>
      <slot></slot>
    `;
  }
}
