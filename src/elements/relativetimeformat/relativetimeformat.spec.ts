import {createTestPage} from '../../testing';
import HTMLIntlRelativeTimeFormatElement from './relativetimeformat';

describe('intl-relativetimeformat', () => {
  it('returns correct resolved options', async () => {
    await createTestPage({
      elements: ['intl-relativetimeformat'],
      html: `
        <intl-relativetimeformat locales="de"></intl-relativetimeformat>
      `,
    });
    const el = document.querySelector('intl-relativetimeformat') as HTMLIntlRelativeTimeFormatElement;
    const intlResult = new Intl.RelativeTimeFormat('de').resolvedOptions();

    expect(el.resolvedOptions()).toEqual(intlResult);
  });

  it('normalizes locales', async () => {
    await createTestPage({
      elements: ['intl-relativetimeformat'],
      html: `
        <intl-relativetimeformat locales="zh_cn"></intl-relativetimeformat>
      `,
    });
    const el = document.querySelector('intl-relativetimeformat') as HTMLIntlRelativeTimeFormatElement;
    const intlLocale = new Intl.RelativeTimeFormat('zh-CN').resolvedOptions().locale;

    expect(el.resolvedOptions().locale).toBe(intlLocale);
  });

  it('picks the runtime default locale if no valid locale specified', async () => {
    await createTestPage({
      elements: ['intl-relativetimeformat'],
      html: `
        <intl-relativetimeformat locales="$$invalid"></intl-relativetimeformat>
      `,
    });
    const el = document.querySelector('intl-relativetimeformat') as HTMLIntlRelativeTimeFormatElement;
    const defaultLocale = new Intl.RelativeTimeFormat().resolvedOptions().locale;

    expect(el.resolvedOptions().locale).toBe(defaultLocale);
  });
});
