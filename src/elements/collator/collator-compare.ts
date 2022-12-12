import {html} from 'lit';

import AbstractConsumer from '../abstract-consumer';
import HTMLIntlCollator from './collator';

export default class extends AbstractConsumer<HTMLIntlCollator, string[]> {
  protected static override providerElementName = 'intl-collator';

  #slottedElementObserver?: MutationObserver;

  #map = new Map<Element, string>();

  #slottedParent?: Element;

  #value: string[] = [];

  get value(): string[] {
    return this.#value;
  }

  override async connectedCallback() {
    super.connectedCallback();

    await this.#buildMap();
  }

  override disconnectedCallback() {
    super.disconnectedCallback();

    this.#slottedElementObserver?.disconnect();
  }

  protected override firstUpdated() {
    super.firstUpdated();

    this.#observeSlottedElements();
  }

  async #buildMap() {
    const els = Array.from(this.children).filter(el => el.nodeName !== 'DATA');
    this.#slottedParent = undefined;

    if (els.length === 0) {
      return;
    } else if (els.length === 1) {
      // If only one element assigned to the slot, treat its children as the
      // data elements for the collator.
      Array.from(els[0]!.children).forEach(el => {
        this.#map.set(el, el.textContent!.trim());
      });
      this.#slottedParent = els[0];
    } else {
      // If multiple elements assigned to the slot, treat each element as a
      // data element for the collator.
      els.forEach(el => this.#map.set(el, el.textContent!.trim()));
    }
  }

  #observeSlottedElements() {
    const slotEls = this.renderRoot.querySelectorAll('slot');
    const assignedEls = Array.from(slotEls)
        .map(slot => slot.assignedElements())
        .flat();

    // Observe slotted element changes.
    this.#slottedElementObserver = new MutationObserver(entries => {
      this.#maybeRequestUpdate(entries[0]?.target as Element);
    });
    for (const el of assignedEls) {
      const option = el.nodeName === 'DATA' ? {
        attributes: true,
        attributeFilter: ['value'],
      } : {
        attributes: true,
        childList: true,
        characterData: true,
        subtree: true,
      };
      this.#slottedElementObserver.observe(el, option);
    }

    // Listen to slot changes.
    slotEls.forEach(slot => {
      slot.addEventListener('slotchange', evt => {
        this.#maybeRequestUpdate(evt.target as Element);
      })
    });
  }

  async #maybeRequestUpdate(target: Element) {
    if (!target) {
      return;
    }

    let shouldUpdate = false;

    if (target.nodeName === 'DATA') {
      shouldUpdate = true;
    } else if (this.#map.has(target)) {
      if (this.#map.get(target) !== target.textContent) {
        shouldUpdate = true;
      }
    } else {
      // TODO: Better cache this.
      this.#map.clear();
      await this.#buildMap();
      shouldUpdate = true;
    }

    if (shouldUpdate) {
      this.requestUpdate();
    }
  }

  override render() {
    const result = document.createDocumentFragment();

    if (this.providerElement) {
      let sorted: [Element, string][] = [];

      if (this.providerElement.intlObject.resolvedOptions().usage === 'search') {
        const target = this.getDataValue('target')[0];
        if (target) {
          sorted = [...this.#map.entries()].filter(v => {
            return this.providerElement!.intlObject.compare(v[1], target) === 0;
          });
        }
      } else {
        sorted = [...this.#map.entries()].sort((a, b) => {
          return this.providerElement!.intlObject.compare(a[1], b[1]);
        });
      }

      this.#value = sorted.map(([_, value]) => value);

      if (this.#slottedParent) {
        const parent = this.#slottedParent.cloneNode() as Element;
        for (const [el] of sorted) {
          parent.append(el.cloneNode(true));
        }
        result.append(parent);
      } else {
        for (const [el] of sorted) {
          result.append(el.cloneNode(true));
        }
      }
    }

    return html`
      <div>${result}</div>
      <div aria-hidden="true" hidden>
        <slot name="target"></slot>
        <slot></slot>
      </div>
    `;
  }
}
