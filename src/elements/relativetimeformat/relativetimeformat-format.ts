import {html} from 'lit';

import AbstractIntlRelativeTimeFormatDisplayElement from './abstract-intl-relativetimeformat-display-element';

export default class extends AbstractIntlRelativeTimeFormatDisplayElement {
  #value: string = '';

  get value(): string {
    return this.#value;
  }

  override render() {
    if (this.rtime && this.unit && this.parent) {
      this.#value = this.parent.intlObject.format(
          this.rtime, this.unit as Intl.RelativeTimeFormatUnit) ?? '';
    }

    return html`
      <span role="none" part="value">${this.#value}</span>
      <slot name="rtime"></slot>
      <slot name="unit"></slot>
      <slot></slot>
    `;
  }
}
