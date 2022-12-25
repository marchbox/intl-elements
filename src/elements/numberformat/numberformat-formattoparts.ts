import {html, nothing} from 'lit';
import {map} from 'lit/directives/map.js';

import {camelToKebab} from '../../utils/strings.js';
import AbstractNumberFormatConsumer from './abstract-numberformat-consumer.js';

export default class HTMLIntlNumberFormatFormatToPartsElement
    extends AbstractNumberFormatConsumer {
  #value: Intl.NumberFormatPart[] = [];

  get value(): Intl.NumberFormatPart[] {
    return this.#value;
  }

  override render() {
    if (!isNaN(this.number) && this.providerElement) {
      try {
        this.#value =
            this.providerElement.intlObject.formatToParts(this.number);
      } catch {}
    }

    return html`
      <span role="none" part="value"
        lang=${this.currentLang ?? nothing}
        dir=${this.currentDir ?? nothing}
      >
        ${map(this.#value, part =>
            html`<span part="${camelToKebab(part.type)}"
                role="none">${part.value}</span>`)}
      </span>
      <span aria-hidden="true" hidden>
        <slot></slot>
      </span>
    `;
  }
}
