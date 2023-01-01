import {createTestPage} from '../../testing';
import HTMLIntlListFormatElement from './listformat';

describe('intl-listformat', () => {
  it('returns correct resolved options', async () => {
    await createTestPage({
      elements: ['intl-listformat'],
      html: `
        <intl-listformat locales="de" option-style="narrow" option-type="unit">
        </intl-listformat>
      `,
    });
    const el = document.querySelector('intl-listformat') as HTMLIntlListFormatElement;

    // @ts-ignore
    const intlResult = new Intl.ListFormat('de', {
      type: 'unit',
      style: 'narrow',
    }).resolvedOptions();

    expect(el.resolvedOptions()).toEqual(intlResult);
  });

  it('normalizes locales', async () => {
    await createTestPage({
      elements: ['intl-listformat'],
      html: `
        <intl-listformat locales="zh_cn"></intl-listformat>
      `,
    });
    const el = document.querySelector('intl-listformat') as HTMLIntlListFormatElement;
    const intlLocale = new Intl.ListFormat('zh-CN').resolvedOptions().locale;

    expect(el.resolvedOptions().locale).toBe(intlLocale);
  });

  it('picks the runtime default locale if no valid locale specified', async () => {
    await createTestPage({
      elements: ['intl-listformat'],
      html: `
        <intl-listformat locales="$$invalid"></intl-listformat>
      `,
    });
    const el = document.querySelector('intl-listformat') as HTMLIntlListFormatElement;
    const defaultLocale = new Intl.ListFormat().resolvedOptions().locale;

    expect(el.resolvedOptions().locale).toBe(defaultLocale);
  });
});
