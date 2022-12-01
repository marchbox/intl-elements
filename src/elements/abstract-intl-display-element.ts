import {LitElement, css} from "lit";

export default abstract class AbstractIntlDisplayElement extends LitElement {
  static override styles = css`
    :host([hidden]),
    ::slotted(data) {
      display: none;
    }
  `;

  override connectedCallback() {
    super.connectedCallback();

    if (!this.hasAttribute('role')) {
      this.setAttribute('role', 'none');
    }
  }

  getData(key?: string): string[] {
    const query = `data${key ? `[slot="${key}"]` : ''}[value]`;
    return (Array.from(this.querySelectorAll(query)) as HTMLDataElement[])
        .map(el => el.value);
  }

  getTemplate(key?: string): HTMLTemplateElement | null {
    const query = `template${key ? `[slot="${key}"]` : ''}`;
    return this.querySelector(query) as HTMLTemplateElement | null;
  }
}
