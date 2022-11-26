import {describe, it, expect} from '@jest/globals';

import {
  normalizeLocale,
  normalizeLocales,
  normalizeLocaleList,
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
    expect(normalizeLocale('')).toBeNull();
    expect(normalizeLocale('veryveryinvalid')).toBeNull();
    // @ts-ignore
    expect(normalizeLocale(419)).toBeNull();
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
