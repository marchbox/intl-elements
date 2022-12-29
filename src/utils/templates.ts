import {html} from 'lit';

export function generateSlotContent(slots: string[]) {
  return html`
    <span aria-hidden="true" hidden>
      ${slots.map(slot => slot === '' ? html`<slot></slot>` :
          html`<slot name="${slot}"></slot>`)}
    </span>
  `;
}
