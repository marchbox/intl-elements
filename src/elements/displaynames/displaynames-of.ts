import {html} from 'lit';
import {state} from 'lit/decorators.js';

import AbstractIntlDisplayElement from '../abstract-intl-display-element';
import HTMLIntlDisplayNamesElement from './displaynames';

export default class extends AbstractIntlDisplayElement {
  @state()
  data!: string;

  #value: string = '';

  get value() {
    return this.#value;
  }

  get #parent(): HTMLIntlDisplayNamesElement | undefined {
    return this.closest('intl-displaynames') ?? undefined;
  }

  override connectedCallback() {
    super.connectedCallback();

    this.data = this.getData()[0] ?? '';
  }

  override render() {
    if (this.data && this.#parent) {
      // Chrome doesn’t recoganize lowercase region subtags.
      const of = this.#parent.resolvedOptions().type === 'region' ?
          this.data.toUpperCase() : this.data;

      this.#value = this.#parent.intlObject.of(of) ?? '';
    }

    return html`
      <span role="none" part="value">${this.#value}</span>
      <slot></slot>
    `;
  }
}