
import {describe, it, expect} from '@jest/globals';

import {createTestPage} from '../../testing';
import HTMLIntlRelativeTimeFormatElement from './relativetimeformat';

describe('intl-relativetimeformat', () => {
  it('rejects invalid atttibute values', async () => {
    const page = await createTestPage<HTMLIntlRelativeTimeFormatElement>({
      element: 'intl-relativetimeformat',
      html: `
        <intl-relativetimeformat locales="en"
            format-unit="year" format-value="10">
        </intl-relativetimeformat>
      `,
    });
    const el = page.element!;
    const intlResult = new Intl.RelativeTimeFormat('en').format(10, 'year');

    expect(el.textContent.trim()).toBe(intlResult);

    el.setAttribute('format-unit', 'invalid');
    await el.updateComplete;
    expect(el.textContent.trim()).toBe(intlResult);
  });

  it('has `value` property the same as its text content', async () => {
    const page = await createTestPage<HTMLIntlRelativeTimeFormatElement>({
      element: 'intl-relativetimeformat',
      html: `
        <intl-relativetimeformat locales="en"
            format-unit="year" format-value="10">
        </intl-relativetimeformat>
      `,
    });

    expect(page.element!.value).toBe(page.element!.textContent.trim());
  });

  it('returns correct resolved options', async () => {
    const page = await createTestPage<HTMLIntlRelativeTimeFormatElement>({
      element: 'intl-relativetimeformat',
      html: `
        <intl-relativetimeformat locales="de"
            format-unit="year" format-value="10">
        </intl-relativetimeformat>
      `,
    });
    const el = page.element;

    const intlResult = new Intl.RelativeTimeFormat('de').resolvedOptions();

    expect(el.resolvedOptions()).toEqual(intlResult);
  });

  it('returns correct formated parts', async () => {
    const page = await createTestPage<HTMLIntlRelativeTimeFormatElement>({
      element: 'intl-relativetimeformat',
      html: `
        <intl-relativetimeformat locales="en"
            format-unit="year" format-value="10">
        </intl-relativetimeformat>
      `,
    });
    const el = page.element;

    const intlResult =
        new Intl.RelativeTimeFormat('en').formatToParts(10, 'year');

    expect(el.formattedParts).toEqual(intlResult);
  });
});
