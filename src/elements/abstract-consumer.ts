import {CSSResultGroup, LitElement, css} from 'lit';
import {property} from 'lit/decorators.js';

import AbstractProvider from './abstract-provider.js';
import {isLocaleRtl} from '../utils/locales.js';

/** @internal */
export default abstract class AbstractConsumer<P, V> extends LitElement {
  static override styles = css`
    :host([hidden]),
    [hidden] {
      display: none;
    }
    .sr {
      height: 1px;
      overflow: hidden;
      position: absolute;
      width: 1px;
    }
    /* Fix the issue in Safari that wordlike <span>’s don’t get line breaks. */
    span[part="value"] {
      display: inline-block;
    }
  ` as CSSResultGroup;

  protected slottedElementObserver?: MutationObserver;

  protected static observesText = false;

  protected static providerElementName: string;

  protected isValid = true;

  @property({reflect: true})
  provider?:string;

  // TODO: Cache this.
  /** @readonly */
  get providerElement(): P | undefined {
    const name = (this.constructor as typeof AbstractConsumer)
        .providerElementName;
    if (name) {
      const providerAncestor = this.closest(name);
      if (providerAncestor) {
        return providerAncestor as P;
      }

      if (this.provider !== undefined && this.provider !== '') {
        const query = `${name}#${this.provider}`;
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
    const localeList = (this.providerElement as AbstractProvider)?.localeList;
    const primaryLocale = localeList?.[0] || '';
    return localeList?.supports(primaryLocale) ? primaryLocale : undefined;
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

    this.slottedElementObserver?.disconnect();
  }

  protected override shouldUpdate(): boolean {
    return this.isValid;
  }

  protected override firstUpdated() {
    this.observeSlottedElements();
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

  protected observeSlottedElements() {
    const slotEls = this.renderRoot.querySelectorAll('slot');
    const assignedNodes = Array.from(slotEls)
        .map(slot => slot.assignedNodes({flatten: true}))
        .flat()
        .filter(node =>
            ((this.constructor as typeof AbstractConsumer).observesText &&
                node.nodeType === Node.TEXT_NODE) ||
            node.nodeName === 'DATA' ||
            node.nodeName === 'TIME' ||
            node.nodeName === 'TEMPLATE');

    // Observe slotted element changes.
    this.slottedElementObserver = new MutationObserver(() => {
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
      this.slottedElementObserver.observe(target, options);
    }

    // Listen to slot changes.
    slotEls.forEach(slot => {
      slot.addEventListener('slotchange', () => {
        this.requestUpdate();
      })
    });
  }
}
