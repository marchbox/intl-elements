import {nothing} from 'lit';
import {property} from 'lit/decorators.js';

import AbstractIntlProviderElement from '../abstract-intl-provider-element';

export default class extends AbstractIntlProviderElement {
  protected static override consumerElementNames = new Set([
    'intl-listformat-format',
    'intl-listformat-formattoparts',
  ]);

  protected static override intlApi = Intl.ListFormat;

  #resolvedOptions!: Intl.ResolvedListFormatOptions;

  #formattedParts: Intl.ListFormatPart[] = [];

  #listObserver!: MutationObserver;

  #intlObject!: Intl.ListFormat;

  get #listItems(): HTMLElement[] {
    return Array.from(this.querySelectorAll('intl-listitem'));
  }

  get intlObject(): Intl.ListFormat {
    return this.#intlObject;
  }

  @property({attribute: 'option-style'})
  optionStyle: Intl.ListFormatStyle = 'long';
  
  @property({attribute: 'option-type'})
  optionType: Intl.ListFormatType = 'conjunction';

  get list(): string[] {
    return this.#listItems
        .map(el => (el.textContent!.trim() || ''))
        .filter(el => el !== '');
  }

  override connectedCallback() {
    super.connectedCallback();

    this.#hideListItems();
    this.#observeListItems();
  }

  override disconnectedCallback() {
    super.disconnectedCallback();

    this.#listObserver?.disconnect();
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
    try {
      this.#intlObject = new Intl.ListFormat(this.localeList.value, {
        type: this.optionType,
        style: this.optionStyle,
        localeMatcher: this.optionLocaleMatcher,
      });
      this.#resolvedOptions = this.#intlObject.resolvedOptions();
      this.#formattedParts = this.#intlObject.formatToParts(this.list);
    } catch {}

    return nothing;
  }
}
