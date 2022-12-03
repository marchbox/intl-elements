import {
  normalizeLocale,
  normalizeLocales,
  normalizeLocaleList,
  isLocaleRtl,
} from './locales';

describe('normalizeLocale()', () => {
  it('removes extra whitespaces', async () => {
    expect(normalizeLocale('  en  ')).toBe('en');
  })

  it('replaces _ with -', async () => {
    expect(normalizeLocale('en_US')).toBe('en-US');
  });

  it('fixes incorrect casing', async () => {
    expect(normalizeLocale('En')).toBe('en');
    expect(normalizeLocale('zh-hant')).toBe('zh-Hant');
  });

  it('returns null with invalid locale', async () => {
    expect(normalizeLocale('')).toBe('');
    expect(normalizeLocale('veryveryinvalid')).toBe('');
    // @ts-ignore
    expect(normalizeLocale(419)).toBe('');
  });
});

describe('normalizeLocales()', () => {
  it('removes extra whitespaces', async () => {
    expect(normalizeLocales('  en    zh  ja  ')).toEqual(['en', 'zh', 'ja']);
  })

  it('ignores invalid locale', async () => {
    expect(normalizeLocales('')).toEqual([]);
    expect(normalizeLocales('veryveryinvalid en zh')).toEqual(['en', 'zh']);
    // @ts-ignore
    expect(normalizeLocales(419)).toEqual([]);
  });
});

describe('normalizeLocaleList()', () => {
  it('removes invalid entries', async () => {
    expect(normalizeLocaleList([
      '',
      'en',
      // @ts-ignore
      1231231,
      'veryveryveryinvalid',
      'zh-Hant',
      '    ',
    ])).toEqual(['en', 'zh-Hant']);
  });
});

describe('isLocaleRtl()', () => {
  it('detects RTL locales', async () => {
    expect(isLocaleRtl('ar')).toBe(true);
    expect(isLocaleRtl('ar-EG')).toBe(true);
  });

  it('detects LTR locales', async () => {
    expect(isLocaleRtl('en')).toBe(false);
    expect(isLocaleRtl('en-US')).toBe(false);
  });

  it('returns false for invalid locales', async () => {
    expect(isLocaleRtl('')).toBe(false);
    expect(isLocaleRtl('veryveryveryinvalid')).toBe(false);
    // @ts-ignore
    expect(isLocaleRtl(123123)).toBe(false);
  });
});
