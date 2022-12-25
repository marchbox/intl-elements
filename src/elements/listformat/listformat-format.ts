import {html, nothing} from 'lit';

import AbstractListFormatConsumer from './abstract-listformat-consumer.js';

export default class HTMLIntlListFormatFormatElement
    extends AbstractListFormatConsumer {
  #value: string = '';

  override get value(): string {
    return this.#value;
  }

  override render() {
    if (this.list && this.providerElement) {
      try {
        this.#value = this.providerElement.intlObject.format(this.list);
      } catch {}
    }

    return html`
      <span role="none" part="value"
        lang=${this.currentLang ?? nothing}
        dir=${this.currentDir ?? nothing}
      >${this.#value}</span>
      <span aria-hidden="true" hidden>
        <slot></slot>
      </span>
    `;
  }
}
