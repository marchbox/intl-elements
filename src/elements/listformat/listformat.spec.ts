import {describe, it, expect} from '@jest/globals';

import {createTestPage} from '../../testing';
import HTMLIntlListItemElement from '../listitem/listitem';
import HTMLIntlListFormatElement from './listformat';

describe('ListForm', () => {
  it('produces consistent result as the Intl API', async () => {
    const page = await createTestPage<HTMLIntlListFormatElement>({
      element: ['intl-listformat', 'intl-listitem'],
      html: `
        <intl-listformat locales="en">
          <intl-listitem>foo</intl-listitem>
          <intl-listitem>bar</intl-listitem>
          <intl-listitem>baz</intl-listitem>
          <intl-listitem>qux</intl-listitem>
        </intl-listformat>
      `,
    });

    const clonedEl = page.element.cloneNode(true);
    clonedEl.querySelectorAll('intl-listitem')
        .forEach((el: HTMLIntlListItemElement) => el.remove());

    // @ts-ignore
    const intlResult = new Intl.ListFormat('en').format([
      'foo', 'bar', 'baz', 'qux']);

    expect(clonedEl.textContent.trim()).toBe(intlResult);
  });
});