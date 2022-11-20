import {describe, it, expect} from '@jest/globals';

import {createTestPage} from '../../testing';
import HTMLIntlDisplayNamesElement from './displaynames';

describe('intl-displaynames', () => {
  it('updates result text when both props and attributes change', async () => {
    const page = await createTestPage<HTMLIntlDisplayNamesElement>({
      element: 'intl-displaynames',
      html: `
        <intl-displaynames locales="en" of="ja"></intl-displaynames>
      `,
    });
    const el = page.element!;

    expect(el.textContent).toBe('Japanese');

    el.setAttribute('of', 'zh-Hant');
    await el.updateComplete;
    expect(el.textContent).toBe('Traditional Chinese');

    el.of = 'de';
    await el.updateComplete;
    expect(el.textContent).toBe('German');
  });

  it('produces consistent result as the Intl API', async () => {
    const page = await createTestPage<HTMLIntlDisplayNamesElement>({
      element: 'intl-displaynames',
      html: `
        <intl-displaynames locales="zh" of="ja"></intl-displaynames>
      `,
    });
    const el = page.element;

    let intlResult = new Intl.DisplayNames('zh', {
      type: 'language',
    }).of('ja');
    expect(el.textContent).toBe(intlResult);

    el.of = 'zh-Hant';
    el.languageDisplay = 'standard';
    intlResult = new Intl.DisplayNames('zh', {
      type: 'language',
      languageDisplay: 'standard',
    }).of('zh-Hant')
    await el.updateComplete;
    expect(el.textContent).toBe(intlResult);
  });

  it('handles multiple locales and ignores invalid ones', async () => {
    const page = await createTestPage<HTMLIntlDisplayNamesElement>({
      element: 'intl-displaynames',
      html: `
        <intl-displaynames locales="invalid ja" of="zh-Hant"></intl-displaynames>
      `,
    });
    const el = page.element;

    const intlResult = new Intl.DisplayNames(['invalid', 'ja'], {
      type: 'language',
    }).of('zh-Hant');

    expect(el.textContent).toBe(intlResult);
  });

  it('handles case-insensitive region subtags', async () => {
    const page = await createTestPage<HTMLIntlDisplayNamesElement>({
      element: 'intl-displaynames',
      html: `
        <intl-displaynames id="el1" locales="ar" type="region" of="jp"></intl-displaynames>
        <intl-displaynames id="el2" locales="ar" type="region" of="JP"></intl-displaynames>
        <intl-displaynames id="el3" locales="ar" type="region" of="jP"></intl-displaynames>
        <intl-displaynames id="el4" locales="ar" type="region" of="Jp"></intl-displaynames>
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
          of="zh-Hants"
          type="region"
          intl-style="narrow"
          fallback="code"
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

  it('has `localeList` property as read only.', async () => {
    const page = await createTestPage<HTMLIntlDisplayNamesElement>({
      element: 'intl-displaynames',
      html: `
        <intl-displaynames locales="en"></intl-displaynames>
      `,
    });
    const el = page.element;

    expect(el.localeList).toEqual(['en']);

    // @ts-ignore
    expect(() => {
      el.localeList = ['en', 'ja'];
    }).toThrow();
    expect(el.localeList).toEqual(['en']);
  });

  it('takes `lang` value if `locales` is missing', async () => {
    const page = await createTestPage<HTMLIntlDisplayNamesElement>({
      element: 'intl-displaynames',
      html: `
        <intl-displaynames lang="ja" of="en"></intl-displaynames>
      `,
    });
    const el = page.element;

    expect(el.getAttribute('locales')).toBe('ja');
    expect(el.locales).toBe('ja');
    expect(el.textContent).toBe('英語');
  });

  it('prioritize `locales` over `lang` when both are present', async () => {
    const page = await createTestPage<HTMLIntlDisplayNamesElement>({
      element: 'intl-displaynames',
      html: `
        <intl-displaynames lang="en" locales="zh" of="ja"></intl-displaynames>
      `,
    });
    const el = page.element;

    expect(el.getAttribute('locales')).toBe('zh');
    expect(el.locales).toBe('zh');
    expect(el.textContent).toBe('日语');

    el.setAttribute('lang', 'de');
    await el.updateComplete;
    expect(el.getAttribute('locales')).toBe('zh');
    expect(el.locales).toBe('zh');
    expect(el.textContent).toBe('日语');

    el.lang = 'es';
    await el.updateComplete;
    expect(el.getAttribute('locales')).toBe('zh');
    expect(el.locales).toBe('zh');
    expect(el.textContent).toBe('日语');
  });

  it('adopts `lang` value if `locales` is removed', async () => {
    const page = await createTestPage<HTMLIntlDisplayNamesElement>({
      element: 'intl-displaynames',
      html: `
        <intl-displaynames locales="ja" of="en"></intl-displaynames>
      `,
    });
    const el = page.element;

    expect(el.textContent).toBe('英語');

    el.removeAttribute('locales');
    el.setAttribute('lang', 'zh');
    await el.updateComplete;
    expect(el.getAttribute('locales')).toBe('zh');
    expect(el.locales).toBe('zh');
    expect(el.textContent).toBe('英语');

    el.removeAttribute('locales');
    el.lang = 'es';
    await el.updateComplete;
    expect(el.getAttribute('locales')).toBe('es');
    expect(el.locales).toBe('es');
    expect(el.textContent).toBe('inglés');
  });

  it('adopts `locales` value to `lang` and `dir`', async () => {
    const page = await createTestPage<HTMLIntlDisplayNamesElement>({
      element: 'intl-displaynames',
      html: `
        <intl-displaynames locales="he" of="en"></intl-displaynames>
      `,
    });
    const el = page.element;

    expect(el.getAttribute('lang')).toBe('he');
    expect(el.getAttribute('dir')).toBe('rtl');

    el.setAttribute('locales', 'zh');
    await el.updateComplete;
    expect(el.getAttribute('lang')).toBe('zh');
    expect(el.hasAttribute('dir')).toBe(false);

    el.setAttribute('locales', 'ar');
    await el.updateComplete;
    expect(el.getAttribute('lang')).toBe('ar');
    expect(el.getAttribute('dir')).toBe('rtl');
  });

  it('should add `none` role if role is missing', async () => {
    const page = await createTestPage<HTMLIntlDisplayNamesElement>({
      element: 'intl-displaynames',
      html: `
        <intl-displaynames></intl-displaynames>
      `,
    });
    const el = page.element;

    expect(el.getAttribute('role')).toBe('none');
  });

  it('should not override author defined role', async () => {
    const page = await createTestPage<HTMLIntlDisplayNamesElement>({
      element: 'intl-displaynames',
      html: `
        <intl-displaynames role="option"></intl-displaynames>
      `,
    });
    const el = page.element;

    expect(el.getAttribute('role')).toBe('option');
  });

  it('should not modify `dir` if `textInfo` is not supported', async () => {
    // @ts-ignore
    global.Intl.Locale = jest.fn((locale: string) => ({
      textInfo: undefined,
    }));

    const page = await createTestPage<HTMLIntlDisplayNamesElement>({
      element: 'intl-displaynames',
      html: `
        <intl-displaynames locales="ar" of="en"></intl-displaynames>
      `,
    });
    const el = page.element;

    expect(el.getAttribute('lang')).toBe('ar');
    expect(el.hasAttribute('dir')).toBe(false);

    el.setAttribute('locales', 'ar');
    await el.updateComplete;
    expect(el.hasAttribute('dir')).toBe(false);

    // @ts-ignore
    global.Intl.Locale.mockRestore();
  });

  it('should not modify `lang` or `dir` if `locales` is invalid', async () => {
    const page = await createTestPage<HTMLIntlDisplayNamesElement>({
      element: 'intl-displaynames',
      html: `
        <intl-displaynames locales="ar" of="en"></intl-displaynames>
      `,
    });
    const el = page.element;

    expect(el.getAttribute('lang')).toBe('ar');
    expect(el.hasAttribute('dir')).toBe(false);

    el.setAttribute('locales', 'invalid');
    await el.updateComplete;
    expect(el.getAttribute('lang')).toBe('ar');
    expect(el.hasAttribute('dir')).toBe(false);
  });
});
