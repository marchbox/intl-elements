import {createTestPage} from '../../testing';
import HTMLIntlSegmenterElement from './segmenter';

describe('intl-segmenter', () => {
  it('returns correct resolved options', async () => {
    await createTestPage({
      elements: ['intl-segmenter'],
      html: `
        <intl-segmenter locales="de"></intl-segmenter>
      `,
    });
    const el = document.querySelector('intl-segmenter') as HTMLIntlSegmenterElement;
    // @ts-ignore
    const intlResult = new Intl.Segmenter('de').resolvedOptions();

    expect(el.resolvedOptions()).toEqual(intlResult);
  });

  it('normalizes locales', async () => {
    await createTestPage({
      elements: ['intl-segmenter'],
      html: `
        <intl-segmenter locales="zh_cn"></intl-segmenter>
      `,
    });
    const el = document.querySelector('intl-segmenter') as HTMLIntlSegmenterElement;
    const intlLocale = new Intl.Segmenter('zh-CN').resolvedOptions().locale;

    expect(el.resolvedOptions().locale).toBe(intlLocale);
  });

  it('picks the runtime default locale if no valid locale specified', async () => {
    await createTestPage({
      elements: ['intl-segmenter'],
      html: `
        <intl-segmenter locales="$$invalid"></intl-segmenter>
      `,
    });
    const el = document.querySelector('intl-segmenter') as HTMLIntlSegmenterElement;
    const defaultLocale = new Intl.Segmenter().resolvedOptions().locale;

    expect(el.resolvedOptions().locale).toBe(defaultLocale);
  });
});
