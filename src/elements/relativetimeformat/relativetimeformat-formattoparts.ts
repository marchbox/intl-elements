import {html} from 'lit';

import HTMLIntlRelativeTimeFormatDisplayElement from './abstract-intl-relativetimeformat-display-element';

export default class extends HTMLIntlRelativeTimeFormatDisplayElement {
  #value: Intl.RelativeTimeFormatPart[] = [];

  get value(): Intl.RelativeTimeFormatPart[] {
    return this.#value;
  }

  override render() {
    if (this.rtime && this.unit && this.parent) {
      this.#value = this.parent.intlObject.formatToParts(
        this.rtime,
        this.unit as Intl.RelativeTimeFormatUnit
      );
    }

    return html`
      <span role="none" part="value">
        ${this.#value.map(part =>
            html`<span part="${part.type}" role="none">${part.value}</span>`)}
      </span>
      <slot name="rtime"></slot>
      <slot name="unit"></slot>
      <slot></slot>
    `;
  }
}
