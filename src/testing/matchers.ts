/// <reference types="jest" />
// @ts-nocheck

export function toHaveShadowPartsCount(
  el: Element,
  part: string,
  count?: number,
) {
  if (!(el instanceof Element)) {
    throw new Error('toHaveShadowPart() must be called on an Element');
  }

  if (typeof part !== 'string' && part !== '') {
    throw new Error('`part` must have a non-empty string');
  }

  if (typeof count !== 'number' && count !== undefined) {
    throw new Error('`count` must have a number');
  }

  const parts = el.shadowRoot?.querySelectorAll(`[part="${part}"]`);
  const to = this.isNot ? 'not to' : 'to';
  const not = this.isNot ? 'not ' : '';
  const plural = count === 1 ? '' : 's';

  return {
    message: () => [
      `expected element ${to} have ${count} Shadow Part${plural} named '${part}'`,
      `Received: ${this.utils.printExpected(parts?.length ?? 0)}`,
      `Expected: ${not}${this.utils.printReceived(count)}`,
    ].join('\n'),
    pass: count === undefined ? parts?.length > 0 : parts?.length === count,
  };
};

export function toHaveShadowPart(
  el: Element,
  part: string
) {
  return toHaveShadowPartsCount.call(this, el, part);
}

declare global {
  namespace jest {
    interface Matchers<R> {
      toHaveShadowPart(part: string): R;
      toHaveShadowPartsCount(part: string, amount?: number): R;
    }
  }
}
