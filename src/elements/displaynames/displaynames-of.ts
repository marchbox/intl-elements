import {html, nothing} from 'lit';

import AbstractConsumer from '../abstract-consumer.js';
import HTMLIntlDisplayNamesElement from './displaynames.js';

export default class HTMLIntlDisplayNamesOfElement
    extends AbstractConsumer<HTMLIntlDisplayNamesElement, string> {
  protected static override providerElementName = 'intl-displaynames';

  get #data(): string {
    return this.getDataValue()[0] ?? '';
  }

  #value: string = '';

  override get value() {
    return this.#value;
  }

  override render() {
    if (this.#data && this.providerElement) {
      // Chrome doesn’t recoganize lowercase region subtags.
      const of = this.providerElement.resolvedOptions().type === 'region' ?
          this.#data.toUpperCase() : this.#data;

      try {
        this.#value = this.providerElement.intlObject.of(of) ?? '';
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
