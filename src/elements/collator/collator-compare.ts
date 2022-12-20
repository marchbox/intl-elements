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
      <div role="none"
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
