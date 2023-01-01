import {createTestPage} from '../../testing';
import HTMLIntlCollatorElement from './collator';

describe('intl-collator', () => {
  it('returns correct resolved options', async () => {
    await createTestPage({
      elements: ['intl-collator'],
      html: `
        <intl-collator
          locales="zh-u-co-pinyin"
          option-sensitivity="case"
          option-numeric
          option-collation="stroke"
        ></intl-collator>
      `,
    });
    const el = document.querySelector('intl-collator') as HTMLIntlCollatorElement;

    const intlResult = new Intl.Collator('zh-u-co-pinyin', {
      sensitivity: 'case',
      numeric: true,
      // @ts-ignore
      collation: 'stroke',
    }).resolvedOptions();

    expect(el.resolvedOptions()).toEqual(intlResult);
  });

  it('normalizes locales', async () => {
    await createTestPage({
      elements: ['intl-collator'],
      html: `
        <intl-collator locales="zh_cn"></intl-collator>
      `,
    });
    const el = document.querySelector('intl-collator') as HTMLIntlCollatorElement;
    const intlLocale = new Intl.Collator('zh-CN').resolvedOptions().locale;

    expect(el.resolvedOptions().locale).toBe(intlLocale);
  });

  it('picks the runtime default locale if no valid locale specified', async () => {
    await createTestPage({
      elements: ['intl-collator'],
      html: `
        <intl-collator locales="$$invalid"></intl-collator>
      `,
    });
    const el = document.querySelector('intl-collator') as HTMLIntlCollatorElement;
    const defaultLocale = new Intl.Collator().resolvedOptions().locale;

    expect(el.resolvedOptions().locale).toBe(defaultLocale);
  });
});
