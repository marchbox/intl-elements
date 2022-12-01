import {html} from 'lit';

import AbstractIntlDisplayElement from '../abstract-intl-display-element';
import HTMLIntlDisplayNamesElement from './displaynames';

export default class extends AbstractIntlDisplayElement {
  get #data(): string {
    return this.getData()[0] ?? '';
  }

  get #parent(): HTMLIntlDisplayNamesElement | undefined {
    return this.closest('intl-displaynames') ?? undefined;
  }

  #value: string = '';

  get value() {
    return this.#value;
  }

  override connectedCallback() {
    super.connectedCallback();
  }

  override render() {
    if (this.#data && this.#parent) {
      // Chrome doesn’t recoganize lowercase region subtags.
      const of = this.#parent.resolvedOptions().type === 'region' ?
          this.#data.toUpperCase() : this.#data;

      this.#value = this.#parent.intlObject.of(of) ?? '';
    }

    return html`
      <span role="none" part="value">${this.#value}</span>
      <slot></slot>
    `;
  }
}