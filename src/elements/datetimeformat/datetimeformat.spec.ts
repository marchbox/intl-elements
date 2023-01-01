import {createTestPage} from '../../testing';
import HTMLIntlDateTimeFormatElement from './datetimeformat';

describe('intl-datetimeformat', () => {
  it('returns correct resolved options', async () => {
    await createTestPage({
      elements: ['intl-datetimeformat'],
      html: `
        <intl-datetimeformat locales="de"
            option-datestyle="full"
            option-timestyle="short"
            option-calendar="chinese">
        </intl-datetimeformat>
      `,
    });
    const el = document.querySelector('intl-datetimeformat') as HTMLIntlDateTimeFormatElement;

    // @ts-ignore
    const intlResult = new Intl.DateTimeFormat('de', {
      dateStyle: 'full',
      timeStyle: 'short',
      calendar: 'chinese',
    }).resolvedOptions();

    expect(el.resolvedOptions()).toEqual(intlResult);
  });

  it('normalizes locales', async () => {
    await createTestPage({
      elements: ['intl-datetimeformat'],
      html: `
        <intl-datetimeformat locales="zh_cn"></intl-datetimeformat>
      `,
    });
    const el = document.querySelector('intl-datetimeformat') as HTMLIntlDateTimeFormatElement;
    const intlLocale = new Intl.DateTimeFormat('zh-CN').resolvedOptions().locale;

    expect(el.resolvedOptions().locale).toBe(intlLocale);
  });

  it('picks the runtime default locale if no valid locale specified', async () => {
    await createTestPage({
      elements: ['intl-datetimeformat'],
      html: `
        <intl-datetimeformat locales="$$invalid"></intl-datetimeformat>
      `,
    });
    const el = document.querySelector('intl-datetimeformat') as HTMLIntlDateTimeFormatElement;
    const defaultLocale = new Intl.DateTimeFormat().resolvedOptions().locale;

    expect(el.resolvedOptions().locale).toBe(defaultLocale);
  });
});
