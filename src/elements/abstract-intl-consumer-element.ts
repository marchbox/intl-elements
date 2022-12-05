import {LitElement, css} from 'lit';
import {property} from 'lit/decorators.js';

const CHILDREN_QUERY_SELECTOR = 'data[value],template';

export default abstract class AbstractIntlConsumerElement<P, V> extends LitElement {
  static override styles = css`
    :host([hidden]),
    ::slotted(data) {
      display: none;
    }
  `;

  #slottedElementObserver!: MutationObserver;

  protected static allowTextContent = false;

  protected static providerElementName: string;

  @property({reflect: true})
  provider ?:string;

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

  override connectedCallback() {
    super.connectedCallback();

    if (!this.hasAttribute('role')) {
      this.setAttribute('role', 'none');
    }

    if (Array.from(this.children)
        .find(el => !el.matches(CHILDREN_QUERY_SELECTOR))) {
      throw new Error('This element must only contain <data value> and/or ' +
        '<template> elements.');
    }

    const text = Array.from(this.childNodes)
        .find(el => el.nodeType === Node.TEXT_NODE)?.nodeValue?.trim() ?? '';
    // @ts-ignore
    if (!this.constructor.allowTextContent && text) {
      throw new Error('This element must not contain any direct text content.' +
          ` Text found: ${text}.`);
    }
  }

  override disconnectedCallback() {
    super.disconnectedCallback();

    this.#slottedElementObserver?.disconnect();
  }

  protected override firstUpdated() {
    const slotEls = this.renderRoot.querySelectorAll('slot');
    const assignedNodes = Array.from(slotEls)
        .map(slot => slot.assignedNodes({flatten: true}))
        .flat()
        .filter(node =>
            // @ts-ignore
            (this.constructor.allowTextContent && node.nodeType === Node.TEXT_NODE) ||
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

  protected getData(key?: string): string[] {
    const query = `data${key ? `[slot="${key}"]` : ''}[value]`;
    return (Array.from(this.querySelectorAll(query)) as HTMLDataElement[])
        .map(el => el.value.trim())
        .filter(value => value !== '');
  }
}
