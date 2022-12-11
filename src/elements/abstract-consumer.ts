import {LitElement, css} from 'lit';
import {property} from 'lit/decorators.js';

import AbstractProvider from './abstract-provider';
import {isLocaleRtl} from '../utils/locales';

export default abstract class AbstractConsumer<P, V> extends LitElement {
  static override styles = css`
    :host([hidden]),
    ::slotted(data, time) {
      display: none;
    }
  `;

  #slottedElementObserver?: MutationObserver;

  protected static observesText = false;

  protected static providerElementName: string;

  protected isValid = true;

  @property({reflect: true})
  provider?:string;

  // TODO: Cache this.
  get providerElement(): P | undefined {
    // @ts-ignore
    const name = this.constructor.providerElementName;
    if (name) {
      const providerAncestor = this.closest(name);
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

    if (!this.providerElement) {
      this.isValid = false;
    }
  }

  override disconnectedCallback() {
    super.disconnectedCallback();

    this.#slottedElementObserver?.disconnect();
  }

  protected override shouldUpdate(): boolean {
    return this.isValid;
  }

  protected override firstUpdated() {
    const slotEls = this.renderRoot.querySelectorAll('slot');
    const assignedNodes = Array.from(slotEls)
        .map(slot => slot.assignedNodes({flatten: true}))
        .flat()
        .filter(node =>
            // @ts-ignore
            (this.constructor.observesText &&
                node.nodeType === Node.TEXT_NODE) ||
            node.nodeName === 'DATA' ||
            node.nodeName === 'TIME' ||
            node.nodeName === 'TEMPLATE');

    // Observe slotted element changes.
    this.#slottedElementObserver = new MutationObserver(() => {
      this.requestUpdate();
    });
    for (const node of assignedNodes) {
      const options = node.nodeType === Node.TEXT_NODE ? {
        characterData: true,
      } : node.nodeName === 'TEMPLATE' ? {
        childList: true,
        charaterData: true,
        subtree: true,
      } : {
        attributes: true,
        attributeFilter: ['value', 'datetime'],
      };
      const target = node.nodeName === 'TEMPLATE' ?
          (node as HTMLTemplateElement).content : node;
      this.#slottedElementObserver.observe(target, options);
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

  protected getDateTime(slot?: string): Date[] {
    const query = `time${slot ? `[slot="${slot}"]` : ':not([slot])'}[datetime]`;
    return (Array.from(this.querySelectorAll(query)) as HTMLTimeElement[])
        .map(el => el.dateTime.trim())
        .map(value => new Date(value))
        .filter(value => value.toString() !== 'Invalid Date');
  }

  protected getTemplateContent(slot?: string): DocumentFragment[] {
    const query = `template${slot ? `[slot="${slot}"]` : ':not([slot])'}`;
    return (Array.from(this.querySelectorAll(query)) as HTMLTemplateElement[])
        .map(el => el.content.cloneNode(true) as DocumentFragment);
  }
}
