import {customElement, property} from 'lit/decorators.js';

import AbstractIntlElement from '../abstract-intl-element';

@customElement('intl-listformat')
export default class ListFormat extends AbstractIntlElement {
  #resolvedOptions!: Intl.ResolvedListFormatOptions;

  #listObserver!: MutationObserver;

  protected intlObj = Intl.ListFormat;

  @property({reflect: true, attribute: 'intl-style'})
  intlStyle: Intl.ListFormatStyle = 'long';
  
  @property({reflect: true})
  type: Intl.ListFormatType = 'conjunction';

  @property({attribute: false})
  get list(): string[] {
    return Array.from(this.querySelectorAll('intl-listitem'))
        .map(el => el.textContent || '');
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
    this.querySelectorAll('intl-listitem').forEach(el => {
      el.setAttribute('hidden', '');
      el.setAttribute('aria-hidden', 'true');
    });
  }

  #observeListItems() {
    this.#listObserver = new MutationObserver(entries => {
      const hasUpdate = entries.some(entry => {
        if (entry.type === 'characterData') {
          return entry.target.parentElement?.tagName === 'INTL-LISTITEM';
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

  override render() {
    let result = '';

    if (this.locales) {
      try {
        const lf = new Intl.ListFormat(this.localeList, {
          type: this.type,
          style: this.intlStyle,
          localeMatcher: this.localeMatcher,
        });
        this.#resolvedOptions = lf.resolvedOptions();
        result = lf.format(this.list) as string;
      } catch {}
    }

    return result;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'intl-listformat': ListFormat,
  }
}
