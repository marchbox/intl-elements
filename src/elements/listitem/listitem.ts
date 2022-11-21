import {LitElement} from "lit";

export default class extends LitElement {
  protected override createRenderRoot() {
    // No shadow DOM.
    return this;
  }
}
