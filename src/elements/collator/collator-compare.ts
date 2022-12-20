import {html, nothing} from 'lit';

import AbstractConsumer from '../abstract-consumer';
import HTMLIntlCollator from './collator';

export default class extends AbstractConsumer<HTMLIntlCollator, string[]> {
  protected static override providerElementName = 'intl-collator';

  #value: string[] = [];

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
    return el.textContent?.trim() || '';
  }

  override render() {
    let result: typeof nothing | Element = nothing;
    const listEl = (this.querySelector('[slot="list"]') as HTMLSlotElement);

    if (this.providerElement && listEl) {
      const {usage} = this.providerElement.intlObject.resolvedOptions();
      const {compare} = this.providerElement.intlObject;
      const target = this.getDataValue('target')[0];

      let sorted: Element[] = [];

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

      this.#value = sorted.map(el => this.#getTarget(el));
      result = listEl.cloneNode() as Element;
      for (const el of sorted) {
        result.append(el.cloneNode(true));
      }
    }

    return html`
      <div role="none">${result}</div>
      <span aria-hidden="true" hidden>
        <slot name="target"></slot>
        <slot name="list"></slot>
      </span>
    `;
  }
}
