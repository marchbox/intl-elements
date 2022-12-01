import {LitElement, css} from "lit";

const CHILDREN_QUERY_SELECTOR = 'data[value],template';

export default abstract class AbstractIntlDisplayElement extends LitElement {
  static override styles = css`
    :host([hidden]),
    ::slotted(data) {
      display: none;
    }
  `;

  #slottedElementObserver!: MutationObserver;

  protected static allowTextContent = false;

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
    const assignedEls = Array.from(this.renderRoot.querySelectorAll('slot'))
        .map(slot => slot.assignedElements())
        .flat()
        .filter(el => el.nodeName === 'DATA');

    this.#slottedElementObserver = new MutationObserver(() => {
      this.requestUpdate();
    });
    for (const el of assignedEls) {
      this.#slottedElementObserver.observe(el, {
        attributes: true,
        attributeFilter: ['value'],
      });
    }
  }

  protected getData(key?: string): string[] {
    const query = `data${key ? `[slot="${key}"]` : ''}[value]`;
    return (Array.from(this.querySelectorAll(query)) as HTMLDataElement[])
        .map(el => el.value);
  }

  protected getTemplate(key?: string): HTMLTemplateElement | null {
    const query = `template${key ? `[slot="${key}"]` : ''}`;
    return this.querySelector(query) as HTMLTemplateElement | null;
  }
}
