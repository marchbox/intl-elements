/// <reference types="jest" />
// @ts-nocheck

import {toContainHTML} from '@testing-library/jest-dom/matchers';

const createToHaveShadowPartsMatcher = (
  name: string,
  anyCount: boolean = false
) => function (el: Element, part: string, count: number) {
  if (!(el instanceof Element)) {
    throw new Error(`${name}() must be called on an Element`);
  }

  if (typeof part !== 'string' && part !== '') {
    throw new Error('`part` must be a non-empty string');
  }

  if (!anyCount && typeof count !== 'number') {
    throw new Error('`count` must be a number');
  }

  const parts = el.shadowRoot?.querySelectorAll(`[part~="${part}"]`);
  const to = this.isNot ? 'not to' : 'to';
  const not = this.isNot ? 'not ' : '';
  const plural = count === 1 ? '' : 's';
  const expectedAmount = anyCount ? '' : ` ${count}`;

  return {
    message: () => [
      `expected element ${to} have${expectedAmount} Shadow Part${plural} named '${part}'`,
      `Received: ${this.utils.printExpected(parts?.length ?? 0)}`,
      `Expected: ${not}${this.utils.printReceived(anyCount ? '>= 1' : count)}`,
    ].join('\n'),
    pass: parts !== undefined &&
        (anyCount ? parts?.length > 0 : parts?.length === count),
  };
};

function toContainTemplateHTML(node: Node, html: string) {
  switch (node.nodeType) {
    case Node.ELEMENT_NODE:
      return toContainHTML.call(this, node, html);
    case Node.DOCUMENT_FRAGMENT_NODE:
      const container = document.createElement('div');
      container.appendChild(node);
      return toContainHTML.call(this, container, html);
    default:
      return {
        pass: true,
      };
  }
}

export default {
  toHaveShadowPartsCount:
      createToHaveShadowPartsMatcher('toHaveShadowPartsCount'),
  toHaveShadowPart: createToHaveShadowPartsMatcher('toHaveShadowPart', true),
  toContainTemplateHTML,
};

declare global {
  namespace jest {
    interface Matchers<R> {
      toHaveShadowPart(part: string): R;
      toHaveShadowPartsCount(part: string, amount?: number): R;
      toContainTemplateHTML(html: string): R;
    }
  }
}
