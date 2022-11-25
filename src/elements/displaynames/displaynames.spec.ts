import {describe, it, expect} from '@jest/globals';

import {createTestPage} from '../../testing';
import HTMLIntlDisplayNamesElement from './displaynames';

describe('intl-displaynames', () => {
  it('updates result text when both props and attributes change', async () => {
    const page = await createTestPage<HTMLIntlDisplayNamesElement>({
      element: 'intl-displaynames',
      html: `
        <intl-displaynames locales="en" of-code="ja"></intl-displaynames>
      `,
    });
    const el = page.element!;

    expect(el.textContent.trim()).toBe('Japanese');

    el.setAttribute('of-code', 'zh-Hant');
    await el.updateComplete;
    expect(el.textContent.trim()).toBe('Traditional Chinese');

    el.ofCode = 'de';
    await el.updateComplete;
    expect(el.textContent.trim()).toBe('German');
  });

  it('produces consistent result as the Intl API', async () => {
    const page = await createTestPage<HTMLIntlDisplayNamesElement>({
      element: 'intl-displaynames',
      html: `
        <intl-displaynames locales="zh" of-code="ja"></intl-displaynames>
      `,
    });
    const el = page.element;

    let intlResult = new Intl.DisplayNames('zh', {
      type: 'language',
    }).of('ja');
    expect(el.textContent.trim()).toBe(intlResult);

    el.ofCode = 'zh-Hant';
    el.optionLanguageDisplay = 'standard';
    intlResult = new Intl.DisplayNames('zh', {
      type: 'language',
      languageDisplay: 'standard',
    }).of('zh-Hant')
    await el.updateComplete;
    expect(el.textContent.trim()).toBe(intlResult);
  });

  it('has `value` property the same as its text content', async () => {
    const page = await createTestPage<HTMLIntlDisplayNamesElement>({
      element: 'intl-displaynames',
      html: `
        <intl-displaynames locales="en" of="ja"></intl-displaynames>
      `,
    });

    expect(page.element!.value).toBe(page.element!.textContent.trim());
  });

  it('handles case-insensitive region subtags', async () => {
    const page = await createTestPage<HTMLIntlDisplayNamesElement>({
      element: 'intl-displaynames',
      html: `
        <intl-displaynames id="el1" locales="ar" option-type="region" of-code="jp"></intl-displaynames>
        <intl-displaynames id="el2" locales="ar" option-type="region" of-code="JP"></intl-displaynames>
        <intl-displaynames id="el3" locales="ar" option-type="region" of-code="jP"></intl-displaynames>
        <intl-displaynames id="el4" locales="ar" option-type="region" of-code="Jp"></intl-displaynames>
      `
    });

    const el1 = page.body.querySelector('#el1') as HTMLIntlDisplayNamesElement;
    const el2 = page.body.querySelector('#el2') as HTMLIntlDisplayNamesElement;
    const el3 = page.body.querySelector('#el3') as HTMLIntlDisplayNamesElement;
    const el4 = page.body.querySelector('#el4') as HTMLIntlDisplayNamesElement;

    const intlResult = new Intl.DisplayNames(['ar'], {
      type: 'region',
    }).of('JP');

    expect(el1.textContent).toBe(intlResult);
    expect(el2.textContent).toBe(intlResult);
    expect(el3.textContent).toBe(intlResult);
    expect(el4.textContent).toBe(intlResult);
  });

  it('returns correct resolved options', async () => {
    const page = await createTestPage<HTMLIntlDisplayNamesElement>({
      element: 'intl-displaynames',
      html: `
        <intl-displaynames
          locales="en"
          of-code="zh-Hants"
          option-type="region"
          option-style="narrow"
          option-fallback="code"
        ></intl-displaynames>
      `,
    });
    const el = page.element;

    const intlResult = new Intl.DisplayNames('en', {
      type: 'region',
      style: 'narrow',
      fallback: 'code',
    }).resolvedOptions();

    expect(el.resolvedOptions()).toEqual(intlResult);
  });
});
