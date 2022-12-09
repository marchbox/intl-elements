import {LitElement, css} from 'lit';
import {property} from 'lit/decorators.js';

import AbstractProvider from './abstract-provider';
import {isLocaleRtl} from '../utils/locales';

export default abstract class AbstractConsumer<P, V> extends LitElement {
  static override styles = css`
    :host([hidden]),
    ::slotted(data) {
      display: none;
    }
  `;

  #slottedElementObserver!: MutationObserver;

  protected static observesText = false;

  protected static providerElementName: string;

  @property({reflect: true})
  provider?:string;

  // TODO: Cache this.
  get providerElement(): P | undefined {
    // @ts-ignore
    if (!this.constructor.providerElementName) {
      throw new Error('providerElementName is not defined');
    }
    // @ts-ignore
    const providerAncestor = this.closest(this.constructor.providerElementName);
    if (providerAncestor) {
      return providerAncestor as P;
    }

    if (this.provider !== undefined && this.provider !== '') {
      // @ts-ignore
      const query = `${this.constructor.providerElementName}#${this.provider}`;
      const providerEl = document.querySelector(query);
      if (providerEl) {
        return providerEl as P;
      }
    }

    return undefined;
  }

  abstract get value(): V;

  protected get currentLang(): string | undefined {
    return (this.providerElement as AbstractProvider)?.localeList.item(0)
        ?? undefined;
  }

  protected get currentDir(): string | undefined {
    return this.currentLang && isLocaleRtl(this.currentLang) ?
        'rtl' : undefined;
  }

  override connectedCallback() {
    super.connectedCallback();

    if (!this.hasAttribute('role')) {
      this.setAttribute('role', 'none');
    }
  }

  override disconnectedCallback() {
    super.disconnectedCallback();

    this.#slottedElementObserver.disconnect();
  }

  protected override firstUpdated() {
    const slotEls = this.renderRoot.querySelectorAll('slot');
    const assignedNodes = Array.from(slotEls)
        .map(slot => slot.assignedNodes({flatten: true}))
        .flat()
        .filter(node =>
            // @ts-ignore
            (this.constructor.observesText && node.nodeType === Node.TEXT_NODE) ||
            node.nodeName === 'DATA');

    // Observe slotted element changes.
    this.#slottedElementObserver = new MutationObserver(() => {
      this.requestUpdate();
    });
    for (const node of assignedNodes) {
      const options = node.nodeType === Node.TEXT_NODE ? {
        characterData: true,
      } : {
        attributes: true,
        attributeFilter: ['value'],
      };
      this.#slottedElementObserver.observe(node, options);
    }

    // Listen to slot changes.
    slotEls.forEach(slot => {
      slot.addEventListener('slotchange', () => {
        this.requestUpdate();
      })
    });
  }

  protected getDataValue(slot?: string): string[] {
    const query = `data${slot ? `[slot="${slot}"]` : ':not([slot])'}[value]`;
    return (Array.from(this.querySelectorAll(query)) as HTMLDataElement[])
        .map(el => el.value.trim())
        .filter(value => value !== '');
  }
}
