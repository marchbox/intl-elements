import {describe, it, expect} from '@jest/globals';
import {property} from 'lit/decorators.js';

import {createTestPage} from '../testing';
import AbstractIntlElement from './abstract-intl-element';

class FakeIntlObj {
  static supportedLocalesOf(list: string[]) {
    const supportedLocales = ['ar', 'en', 'ja', 'zh-Hant'];
    if (list.includes('invalid')) {
      throw new RangeError();
    }
    return list.filter(locale => supportedLocales.includes(locale));
  }

  format(unit: string): string {
    switch (unit) {
      case 'day':
        return 'day';
      case 'year':
        return 'year';
      default:
        return '';
    }
  }
}

class TestIntlElement extends AbstractIntlElement {
  // @ts-ignore
  intlObj = FakeIntlObj;

  @property({attribute: 'format-unit', reflect: true})
  // @ts-ignore
  formatUnit = 'day';

  resolvedOptions(): any {
    return {};
  }

  override render() {
    return new FakeIntlObj().format(this.formatUnit);
  }
}

customElements.define('intl-foo', TestIntlElement);

describe('AbstractIntlElement', () => {
  it('handles multiple locales and ignores unsupported ones', async () => {
    const page = await createTestPage<TestIntlElement>({
      element: 'intl-foo',
      html: `
        <intl-foo locales="he ja">
        </intl-foo>
      `,
    });
    const el = page.element;

    expect(el.localeList).toEqual(['ja']);
  });

  it('empties the locale list if it contains any invalid locale', async () => {
    const page = await createTestPage<TestIntlElement>({
      element: 'intl-foo',
      html: `
        <intl-foo locales="invalid ja">
        </intl-foo>
      `,
    });
    const el = page.element;

    expect(el.localeList).toEqual([]);
  });

  it('has `localeList` property as read only.', async () => {
    const page = await createTestPage<TestIntlElement>({
      element: 'intl-foo',
      html: `
        <intl-foo locales="en"></intl-foo>
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
    const page = await createTestPage<TestIntlElement>({
      element: 'intl-foo',
      html: `
        <intl-foo lang="ja"></intl-foo>
      `,
    });
    const el = page.element;

    expect(el.getAttribute('locales')).toBe('ja');
    expect(el.locales).toBe('ja');
  });

  it('prioritize `locales` over `lang` when both are present', async () => {
    const page = await createTestPage<TestIntlElement>({
      element: 'intl-foo',
      html: `
        <intl-foo lang="en" locales="zh">
        </intl-foo>
      `,
    });
    const el = page.element;

    expect(el.getAttribute('locales')).toBe('zh');
    expect(el.locales).toBe('zh');

    el.setAttribute('lang', 'de');
    await el.updateComplete;
    expect(el.getAttribute('locales')).toBe('zh');
    expect(el.locales).toBe('zh');

    el.lang = 'es';
    await el.updateComplete;
    expect(el.getAttribute('locales')).toBe('zh');
    expect(el.locales).toBe('zh');
  });

  it('adopts `lang` value if `locales` is removed', async () => {
    const page = await createTestPage<TestIntlElement>({
      element: 'intl-foo',
      html: `
        <intl-foo locales="ja"></intl-foo>
      `,
    });
    const el = page.element;

    el.removeAttribute('locales');
    el.setAttribute('lang', 'zh');
    await el.updateComplete;
    expect(el.getAttribute('locales')).toBe('zh');
    expect(el.locales).toBe('zh');

    el.removeAttribute('locales');
    el.lang = 'es';
    await el.updateComplete;
    expect(el.getAttribute('locales')).toBe('es');
    expect(el.locales).toBe('es');
  });

  it('adopts `locales` value to `lang` and `dir`', async () => {
    const page = await createTestPage<TestIntlElement>({
      element: 'intl-displaynames',
      html: `
        <intl-displaynames locales="he" of-code="en"></intl-displaynames>
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
    const page = await createTestPage<TestIntlElement>({
      element: 'intl-foo',
      html: `
        <intl-foo></intl-foo>
      `,
    });
    const el = page.element;

    expect(el.getAttribute('role')).toBe('none');
  });

  it('should not override author defined role', async () => {
    const page = await createTestPage<TestIntlElement>({
      element: 'intl-foo',
      html: `
        <intl-foo role="option"></intl-foo>
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

    const page = await createTestPage<TestIntlElement>({
      element: 'intl-foo',
      html: `
        <intl-foo locales="ar"></intl-foo>
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
    const page = await createTestPage<TestIntlElement>({
      element: 'intl-foo',
      html: `
        <intl-foo locales="ar"></intl-foo>
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

  it('rejects invalid atttibute values', async () => {
    // @ts-ignore
    global.Intl.supportedValuesOf = jest.fn((key: string) => {
      switch (key) {
        case 'unit':
          return ['day', 'year'];
      }
    });

    const page = await createTestPage<TestIntlElement>({
      element: 'intl-foo',
      html: `
        <intl-foo locales="en" format-unit="year"></intl-foo>
      `,
    });
    const el = page.element!;

    expect(el.textContent.trim()).toBe('year');

    el.setAttribute('format-unit', 'invalid');
    await el.updateComplete;
    expect(el.textContent.trim()).toBe('year');

    // @ts-ignore
    global.Intl.supportedValuesOf.mockRestore();
  });
});
