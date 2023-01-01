import {createTestPage} from '../../testing';
import HTMLIntlNumberFormatElement from './numberformat';

describe('intl-numberformat', () => {
  it('returns correct resolved options', async () => {
    await createTestPage({
      elements: ['intl-numberformat'],
      html: `
        <intl-numberformat locales="de"
            option-style="currency"
            option-currency="usd">
        </intl-numberformat>
      `,
    });
    const el = document.querySelector('intl-numberformat') as HTMLIntlNumberFormatElement;

    // @ts-ignore
    const intlResult = new Intl.NumberFormat('de', {
      style: 'currency',
      currency: 'usd',
    }).resolvedOptions();

    expect(el.resolvedOptions()).toEqual(intlResult);
  });

  it('normalizes locales', async () => {
    await createTestPage({
      elements: ['intl-numberformat'],
      html: `
        <intl-numberformat locales="zh_cn"></intl-numberformat>
      `,
    });
    const el = document.querySelector('intl-numberformat') as HTMLIntlNumberFormatElement;
    const intlLocale = new Intl.NumberFormat('zh-CN').resolvedOptions().locale;

    expect(el.resolvedOptions().locale).toBe(intlLocale);
  });

  it('picks the runtime default locale if no valid locale specified', async () => {
    await createTestPage({
      elements: ['intl-numberformat'],
      html: `
        <intl-numberformat locales="$$invalid"></intl-numberformat>
      `,
    });
    const el = document.querySelector('intl-numberformat') as HTMLIntlNumberFormatElement;
    const defaultLocale = new Intl.NumberFormat().resolvedOptions().locale;

    expect(el.resolvedOptions().locale).toBe(defaultLocale);
  });
});
