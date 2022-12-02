import {html} from 'lit';

import AbstractIntlDisplayElement from '../abstract-intl-display-element';
import HTMLIntlDisplayNamesElement from './displaynames';

export default class extends AbstractIntlDisplayElement<HTMLIntlDisplayNamesElement> {
  protected static override providerElementName = 'intl-displaynames';

  get #data(): string {
    return this.getData()[0] ?? '';
  }

  #value: string = '';

  get value() {
    return this.#value;
  }

  override connectedCallback() {
    super.connectedCallback();
  }

  override render() {
    if (this.#data && this.provider) {
      // Chrome doesn’t recoganize lowercase region subtags.
      const of = this.provider.resolvedOptions().type === 'region' ?
          this.#data.toUpperCase() : this.#data;

      this.#value = this.provider.intlObject.of(of) ?? '';
    }

    return html`
      <span role="none" part="value">${this.#value}</span>
      <slot></slot>
    `;
  }
}
