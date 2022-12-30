import {TemplateResult, html, nothing} from 'lit';

import {camelToKebab} from './strings.js';

export interface ContentPart {
  value: string;
  type?: string;
  source?: string;
  unwrap?: boolean;
}

export interface GenerateContentOption {
  slots: string[];
  stringContent?: string;
  partsContent?: ContentPart[];
  nodeContent?: Element | DocumentFragment | typeof nothing;
  lang?: string;
  dir?: string;
  block?: boolean;
}

function generateParts(part: ContentPart): string {
  return [
    camelToKebab(part.type),
    camelToKebab(part.source),
  ].filter(Boolean).join(' ');
}

export function generateContent(opt: GenerateContentOption): TemplateResult {
  const srContent = opt.stringContent && opt.partsContent ?
      opt.stringContent : null;
  const ariaHidden = srContent ? 'true' : nothing;
  const lang = opt.lang || nothing;
  const dir = opt.dir || nothing;
  let content: GenerateContentOption['stringContent'] | TemplateResult |
      GenerateContentOption['nodeContent'] = opt.stringContent;

  if (opt.partsContent) {
    content = html`${opt.partsContent.map(part => part.unwrap ?
        html`${part.value}` :
        html`<span part=${generateParts(part) || nothing}
            role="none">${part.value}</span>`
    )}`;
  } else if (opt.nodeContent) {
    content = opt.nodeContent;
  }

  return html`
    ${srContent ?
      // Use a `<span>` element to host text for screen readers instead of
      // `aria-label` attribute so the text reads better, especially for
      // multiingual text.
      html`<span class="sr" lang=${lang} dir=${dir}>${srContent}</span>` :
      nothing
    }

    ${opt.block ? html`
      <div role="none" part="value" lang=${lang} dir=${dir}
          aria-hidden=${ariaHidden}>${content}</div>
    ` : html`
      <span role="none" part="value" lang=${lang} dir=${dir}
          aria-hidden=${ariaHidden}>${content}</span>
    `}

    <span aria-hidden="true" hidden>
      ${opt.slots.map(slot => html`<slot name=${slot || nothing}></slot>`)}
    </span>
  `;
};
