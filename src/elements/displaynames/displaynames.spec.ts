import {createTestPage} from '../../testing';
import HTMLIntlDisplayNamesElement from './displaynames';

describe('intl-displaynames', () => {
  it('returns correct resolved options', async () => {
    await createTestPage({
      elements: ['intl-displaynames'],
      html: `
        <intl-displaynames
          locales="en"
          option-type="region"
          option-style="narrow"
          option-fallback="code"
        ></intl-displaynames>
      `,
    });
    const el = document.querySelector('intl-displaynames') as HTMLIntlDisplayNamesElement;

    const intlResult = new Intl.DisplayNames('en', {
      type: 'region',
      style: 'narrow',
      fallback: 'code',
    }).resolvedOptions();

    expect(el.resolvedOptions()).toEqual(intlResult);
  });

  it('normalizes locales', async () => {
    await createTestPage({
      elements: ['intl-displaynames'],
      html: `
        <intl-displaynames locales="zh_cn" option-type="language"></intl-displaynames>
      `,
    });
    const el = document.querySelector('intl-displaynames') as HTMLIntlDisplayNamesElement;
    const intlLocale = new Intl.DisplayNames('zh-CN', {type: 'language'}).resolvedOptions().locale;

    expect(el.resolvedOptions().locale).toBe(intlLocale);
  });

  it('picks the runtime default locale if no valid locale specified', async () => {
    await createTestPage({
      elements: ['intl-displaynames'],
      html: `
        <intl-displaynames locales="$$invalid" option-type="language"></intl-displaynames>
      `,
    });
    const el = document.querySelector('intl-displaynames') as HTMLIntlDisplayNamesElement;
    const defaultLocale = new Intl.DisplayNames([], {type: 'language'}).resolvedOptions().locale;

    expect(el.resolvedOptions().locale).toBe(defaultLocale);
  });
});
