import {describe, it, expect} from '@jest/globals';

import {createTestPage} from '../../testing';
import HTMLIntlListItemElement from '../listitem/listitem';
import HTMLIntlListFormatElement from './listformat';

function getTextContent(el: HTMLIntlListFormatElement) {
  const clonedEl = el.cloneNode(true) as HTMLIntlListFormatElement;
  clonedEl.querySelectorAll('intl-listitem')
      .forEach((el: HTMLIntlListItemElement) => el.remove());
  return clonedEl.textContent?.trim() || '';
}

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

    // @ts-ignore
    let intlResult = new Intl.ListFormat('en').format([
      'foo', 'bar', 'baz', 'qux']);
    expect(getTextContent(page.element)).toBe(intlResult);

    page.element.setAttribute('locales', 'zh');
    await page.element.updateComplete;
    // @ts-ignore
    intlResult = new Intl.ListFormat('zh').format([
      'foo', 'bar', 'baz', 'qux']);
    expect(getTextContent(page.element)).toBe(intlResult);
  });
});