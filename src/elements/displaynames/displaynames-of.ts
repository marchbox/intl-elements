import {html} from 'lit';

import AbstractIntlConsumerElement from '../abstract-intl-consumer-element';
import HTMLIntlDisplayNamesElement from './displaynames';

export default class extends AbstractIntlConsumerElement<HTMLIntlDisplayNamesElement, string> {
  protected static override providerElementName = 'intl-displaynames';

  get #data(): string {
    return this.getData()[0] ?? '';
  }

  #value: string = '';

  override get value() {
    return this.#value;
  }

  override connectedCallback() {
    super.connectedCallback();
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
      <span role="none" part="value">${this.#value}</span>
      <slot></slot>
    `;
  }
}
