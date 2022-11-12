import {LitElement} from 'lit';

export default abstract class AbstractIntlElement extends LitElement {
  protected override createRenderRoot() {
    // No shadow DOM.
    return this;
  }
}
