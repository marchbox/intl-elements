import {describe, it, expect} from '@jest/globals';
import {property} from 'lit/decorators.js';

import {createTestPage} from '../testing';
import AbstractIntlElement from './abstract-intl-element';
import HTMLIntlLocaleElement from './locale/locale';

class FakeIntlObj {
  static supportedLocalesOf(list: string[]) {
    const supportedLocales = ['ar', 'en', 'es', 'ja', 'fr', 'zh', 'zh-Hant'];
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

  @property({attribute: 'format-unit'})
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

  // TODO: Unskip this.
  it.skip('trims `locales` attribute before parsing', async () => {
    const page = await createTestPage<TestIntlElement>({
      element: 'intl-foo',
      html: `
        <intl-foo locales="   en      ja  ">
        </intl-foo>
      `,
    });
    const el = page.element;

    expect(el.localeList).toEqual(['en', 'ja']);
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
    const mockTextInfo = jest.spyOn(Intl.Locale.prototype, 'textInfo', 'get');
    mockTextInfo.mockReturnValue(undefined);

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
    mockTextInfo.mockRestore();
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
    expect(el.getAttribute('dir')).toBe('rtl');

    el.setAttribute('locales', 'invalid');
    await el.updateComplete;
    expect(el.getAttribute('lang')).toBe('ar');
    expect(el.getAttribute('dir')).toBe('rtl');
  });

  it('rejects invalid atttibute values', async () => {
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
  });

  describe('locale list determination prioritization', () => {
    it('1. `locales` attribute', async () => {
      const page = await createTestPage<TestIntlElement>({
        element: ['intl-foo', 'intl-locale'],
        html: `
          <intl-locale tag="zh">
            <intl-locale id="my-ja" tag="ja"></intl-locale>
            <intl-locale id="my-fr" tag="fr"></intl-locale>
            <div lang="es">
              <intl-foo locales="en" lang="ar" locales-from="my-ja my-fr">
              </intl-foo>
            </div>
          </intl-locale>
        `,
      });
      const el = page.element;

      expect(el.localeList).toEqual(['en']);
    });

    it('2. `lang` attribute', async () => {
      const page = await createTestPage<TestIntlElement>({
        element: ['intl-foo', 'intl-locale'],
        html: `
          <intl-locale tag="zh">
            <intl-locale id="my-ja" tag="ja" display-string></intl-locale>
            <intl-locale id="my-fr" tag="fr"></intl-locale>
            <div lang="es">
              <intl-foo lang="ar" locales-from="my-ja my-fr">
              </intl-foo>
            </div>
          </intl-locale>
        `,
      });
      const el = page.element;

      expect(el.localeList).toEqual(['ar']);
    });

    it('3. `locales-from` attribute', async () => {
      const page = await createTestPage<TestIntlElement>({
        element: ['intl-foo', 'intl-locale'],
        html: `
          <intl-locale tag="zh">
            <intl-locale id="my-ja" tag="ja"></intl-locale>
            <intl-locale id="my-fr" tag="fr"></intl-locale>
            <div lang="es">
              <intl-foo locales-from="my-ja my-fr"></intl-foo>
            </div>
          </intl-locale>
        `,
      });
      const el = page.element;

      expect(el.localeList).toEqual(['ja', 'fr']);
    });

    it('4.1. closest ancestor’s `lang`', async () => {
      await createTestPage<TestIntlElement>({
        element: ['intl-foo', 'intl-locale'],
        html: `
          <intl-locale tag="zh">
            <div lang="es">
              <intl-foo></intl-foo>
              <intl-foo></intl-foo>
            </div>
          </intl-locale>
        `,
      });
      const els = document.querySelectorAll('intl-foo') as NodeListOf<TestIntlElement>;

      expect(els[0]!.localeList).toEqual(['es']);
      expect(els[1]!.localeList).toEqual(['es']);
    });

    it('4.2. closest ancestor `intl-locale` element', async () => {
      await createTestPage<TestIntlElement>({
        element: ['intl-foo', 'intl-locale'],
        html: `
          <div lang="es">
            <intl-locale tag="zh">
              <div>
                <intl-foo></intl-foo>
                <intl-foo></intl-foo>
              </div>
            </intl-locale>
          </div>
        `,
      });
      const els = document.querySelectorAll('intl-foo') as NodeListOf<TestIntlElement>;

      expect(els[0]!.localeList).toEqual(['zh']);
      expect(els[1]!.localeList).toEqual(['zh']);
    });
  });

  it('uses locales from `intl-locale` elements associated by `locales-from`', async () => {
    const page = await createTestPage<TestIntlElement>({
      element: ['intl-foo', 'intl-locale'],
      html: `
        <intl-locale id="my-ja" tag="ja"></intl-locale>
        <intl-locale id="my-fr" tag="fr"></intl-locale>
        <intl-locale id="my-invalid" tag="veryveryinvalid"></intl-locale>
        <intl-foo locales-from="my-ja my-fr my-invalid"></intl-foo>
      `,
    });
    const el = page.element;

    expect(el.localeList).toEqual(['ja', 'fr']);
  });

  it('observes `locales` attribute changes', async () => {
    const page = await createTestPage<TestIntlElement>({
      element: 'intl-foo',
      html: `
        <intl-foo locales="en"></intl-foo>
      `,
    });
    const el = page.element!;

    expect(el.localeList).toEqual(['en']);

    el.setAttribute('locales', 'en ja');
    await el.updateComplete;
    expect(el.localeList).toEqual(['en', 'ja']);
  });

  it('observes the `locales-from` attribute and updates the locale list', async () => {
    const page = await createTestPage<TestIntlElement>({
      element: ['intl-foo', 'intl-locale'],
      html: `
        <intl-locale id="my-ja" tag="ja"></intl-locale>
        <intl-locale id="my-fr" tag="fr"></intl-locale>
        <intl-foo locales-from="my-ja my-fr"></intl-foo>
      `,
    });
    const el = page.element!;

    expect(el.localeList).toEqual(['ja', 'fr']);

    el.setAttribute('locales-from', 'my-ja');
    await el.updateComplete;
    expect(el.localeList).toEqual(['ja']);
  });

  // TODO: Unskip this.
  it.skip('observes the `intl-locale` elements associated by `locales-from` ' +
      'and updates the locale list', async () => {
    const page = await createTestPage<TestIntlElement>({
      element: ['intl-foo', 'intl-locale'],
      html: `
        <intl-locale id="my-ja" tag="ja"></intl-locale>
        <intl-locale id="my-fr" tag="fr"></intl-locale>
        <intl-foo locales-from="my-ja my-fr"></intl-foo>
      `,
    });
    const el = page.element!;

    expect(el.localeList).toEqual(['ja', 'fr']);

    const myJaEl = document.getElementById('my-ja')! as HTMLIntlLocaleElement;
    myJaEl.tag = 'zh';
    await myJaEl.updateComplete;

    expect(myJaEl.valueAsString).toBe('zh');
    expect(el.localeList).toEqual(['zh', 'fr']);
  });

  // TODO: Unskip this.
  it.skip('observes ancestors for `lang` attribute and `intl-locale` element changes', async () => {
    const page = await createTestPage<TestIntlElement>({
      element: ['intl-foo', 'intl-locale'],
      html: `
        <intl-locale tag="zh">
          <div lang="es">
            <intl-foo></intl-foo>
          </div>
        </intl-locale>
      `,
    });
    const el = page.element!;

    expect(el.localeList).toEqual(['es']);

    const div = document.querySelector('div')!;
    div.setAttribute('lang', 'fr');
    await el.updateComplete;
    expect(el.localeList).toEqual(['fr']);

    const intlLocale = document.querySelector('intl-locale')!;
    intlLocale.append(el);
    await el.updateComplete;
    expect(el.localeList).toEqual(['zh']);

    intlLocale.setAttribute('tag', 'ja');
    await el.updateComplete;
    expect(el.localeList).toEqual(['ja']);
  });
});
