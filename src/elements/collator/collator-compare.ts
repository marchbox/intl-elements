import {html, nothing} from 'lit';

import AbstractConsumer from '../abstract-consumer.js';
import HTMLIntlCollatorElement from './collator.js';

/**
 * @intl Intl.Collator.prototype.compare
 * @intlsee http://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Collator/compare
 *
 * @element intl-collator-compare
 *
 * @slot list - The list conotainer element. Depending on the value of
 *     the `option-usage` attribute, the list items are either sorted (default
 *     or `sort`) or filtered (`search`).
 * @slot target - The slotted element must be a `<data>` element with a `value`
 *     attribute. When `option-usage` is set to `search`, the list items are
 *     filtered based on the value of the `target` element.
 *
 * @csspart value - The container element that hosts the result of the
 *     comparison.
 */
export default class HTMLIntlCollatorCompareElement
    extends AbstractConsumer<HTMLIntlCollatorElement, string[]> {
  protected static override providerElementName = 'intl-collator';

  #value: string[] = [];

  /** @readonly */
  get value(): string[] {
    return this.#value;
  }

  protected override observeSlottedElements() {
    this.slottedElementObserver = new MutationObserver(() => {
      this.requestUpdate();
    });
    this.slottedElementObserver.observe(this, {
      attributes: true,
      childList: true,
      characterData: true,
      subtree: true,
    });
  }

  #getTarget(el: Element): string {
    return el.textContent!.trim();
  }

  override render() {
    let result: typeof nothing | Element = nothing;
    let sorted: Element[] = [];
    const listEl = this.querySelector('[slot="list"]');

    if (this.providerElement && listEl) {
      result = listEl.cloneNode() as Element;
      result.removeAttribute('slot');

      const {usage} = this.providerElement.intlObject.resolvedOptions();
      const {compare} = this.providerElement.intlObject;
      const target = this.getDataValue('target')[0];

      switch (usage) {
        case 'search':
          if (target) {
            sorted = Array.from(listEl.children).filter(el => {
              return compare(this.#getTarget(el), target) === 0;
            });
          }
          break;
        case 'sort':
          sorted = Array.from(listEl.children).sort((a, b) => {
            return compare(this.#getTarget(a), this.#getTarget(b));
          });
          break;
      }

      sorted = sorted.map(el => el.cloneNode(true) as Element);
      result.append(...sorted);
    }

    this.#value = sorted.map(el => this.#getTarget(el));

    return html`
      <div role="none" part="value"
        lang=${this.currentLang ?? nothing}
        dir=${this.currentDir ?? nothing}
      >${result}</div>
      <span aria-hidden="true" hidden>
        <slot name="target"></slot>
        <slot name="list"></slot>
      </span>
    `;
  }
}
