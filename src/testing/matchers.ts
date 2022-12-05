/// <reference types="jest" />
// @ts-nocheck

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

export default {
  toHaveShadowPartsCount:
      createToHaveShadowPartsMatcher('toHaveShadowPartsCount'),
  toHaveShadowPart: createToHaveShadowPartsMatcher('toHaveShadowPart', true),
};

declare global {
  namespace jest {
    interface Matchers<R> {
      toHaveShadowPart(part: string): R;
      toHaveShadowPartsCount(part: string, amount?: number): R;
    }
  }
}
