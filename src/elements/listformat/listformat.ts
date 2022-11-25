import {property} from 'lit/decorators.js';

import AbstractIntlElement from '../abstract-intl-element';
export default class extends AbstractIntlElement {
  #resolvedOptions!: Intl.ResolvedListFormatOptions;

  #formattedParts: Intl.ListFormatPart[] = [];

  #listObserver!: MutationObserver;

  #value = '';

  get #listItems(): HTMLElement[] {
    return Array.from(this.querySelectorAll('intl-listitem'));
  }

  protected intlObj = Intl.ListFormat;

  @property({attribute: 'option-style', reflect: true})
  optionStyle: Intl.ListFormatStyle = 'long';
  
  @property({attribute: 'option-type', reflect: true})
  optionType: Intl.ListFormatType = 'conjunction';

  get list(): string[] {
    return this.#listItems
        .map(el => (el.textContent!.trim() || ''))
        .filter(el => el !== '');
  }

  get value(): string {
    return this.#value;
  }

  override connectedCallback() {
    super.connectedCallback();

    this.#hideListItems();
    this.#observeListItems();
  }

  override disconnectedCallback() {
    super.disconnectedCallback();

    if (this.#listObserver) {
      this.#listObserver.disconnect();
    }
  }

  #hideListItems() {
    this.#listItems.forEach(el => {
      el.setAttribute('hidden', '');
      el.setAttribute('aria-hidden', 'true');
    });
  }

  #observeListItems() {
    this.#listObserver = new MutationObserver(entries => {
      const hasUpdate = entries.some(entry => {
        if (entry.type === 'characterData') {
          return entry.target.parentElement!.tagName === 'INTL-LISTITEM';
        }
        return true;
      });

      if (!hasUpdate) {
        return;
      }

      this.#hideListItems();
      this.requestUpdate();
    });

    this.#listObserver.observe(this, {
      childList: true,
      subtree: true,
      characterData: true,
    });
  }

  resolvedOptions(): Intl.ResolvedListFormatOptions {
    return this.#resolvedOptions;
  }

  formatToParts(): Intl.ListFormatPart[] {
    return this.#formattedParts;
  }

  override render() {
    if (this.locales) {
      try {
        const lf = new Intl.ListFormat(this.localeList, {
          type: this.optionType,
          style: this.optionStyle,
          localeMatcher: this.optionLocaleMatcher,
        });
        this.#resolvedOptions = lf.resolvedOptions();
        this.#formattedParts = lf.formatToParts(this.list);
        this.#value = lf.format(this.list) as string;
      } catch {}
    }

    return this.#value;
  }
}
