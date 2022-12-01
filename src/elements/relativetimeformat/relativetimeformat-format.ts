import {html} from 'lit';

import AbstractIntlDisplayElement from '../abstract-intl-display-element';
import HTMLIntlRelativeTimeFormatElement from './relativetimeformat';

export default class extends AbstractIntlDisplayElement {
  get #rtime(): number {
    return Number(this.getData('rtime')[0] ?? this.getData()[0] ?? 0);
  }

  get #unit(): string {
    return this.getData('unit')[0] ?? this.getData()[1] ?? '';
  }

  get #parent(): HTMLIntlRelativeTimeFormatElement | undefined {
    return this.closest('intl-relativetimeformat') ?? undefined;
  }

  #value: string = '';

  get value() {
    return this.#value;
  }

  override render() {
    if (this.#rtime && this.#unit && this.#parent) {
      this.#value = this.#parent.intlObject.format(
          this.#rtime, this.#unit as Intl.RelativeTimeFormatUnit) ?? '';
    }

    return html`
      <span role="none" part="value">${this.#value}</span>
      <slot name="rtime"></slot>
      <slot name="unit"></slot>
      <slot></slot>
    `;
  }
}
