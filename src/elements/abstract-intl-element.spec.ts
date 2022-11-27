import {describe, it, expect} from '@jest/globals';
import {property} from 'lit/decorators.js';

import {createTestPage} from '../testing';
import AbstractIntlElement from './abstract-intl-element';
import HTMLIntlLocaleElement from './locale/locale';

class FakeIntlObj {
  static supportedLocalesOf(list: string | string[]) {
    const supportedLocales = ['ar', 'en', 'es', 'ja', 'fr', 'zh', 'zh-Hant'];
    if (list.includes('veryveryinvalid')) {
      throw new RangeError();
    }
    if (Array.isArray(list)) {
      return list.filter(locale => supportedLocales.includes(locale));
    } else if (typeof list === 'string') {
      return supportedLocales.includes(list) ? [list] : [];
    }
    return [];
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
  @property({attribute: 'format-unit'})
  // @ts-ignore
  formatUnit = 'day';

  resolvedOptions(): any {
    return {};
  }

  // @ts-ignore
  getIntlObj() {
    return FakeIntlObj;
  }

  override render() {
    return new FakeIntlObj().format(this.formatUnit);
  }
}

customElements.define('intl-foo', TestIntlElement);

describe('AbstractIntlElement', () => {
  it('handles multiple locales and ignores unsupported and invalid ones', async () => {
    const page = await createTestPage<TestIntlElement>({
      element: 'intl-foo',
      html: `
        <intl-foo locales="he ja veryveryveryinvalid">
        </intl-foo>
      `,
    });
    const el = page.element;

    expect(el.localeList.value).toBe('ja');
  });

  it('trims `locales` attribute before parsing', async () => {
    const page = await createTestPage<TestIntlElement>({
      element: 'intl-foo',
      html: `
        <intl-foo locales="   en      ja  ">
        </intl-foo>
      `,
    });
    const el = page.element;

    expect(el.localeList.value).toBe('en ja');
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

      expect(el.localeList.value).toBe('en');
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

      expect(el.localeList.value).toBe('ar');
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

      expect(el.localeList.value).toBe('ja fr');
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

      expect(els[0]!.localeList.value).toBe('es');
      expect(els[1]!.localeList.value).toBe('es');
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

      expect(els[0]!.localeList.value).toBe('zh');
      expect(els[1]!.localeList.value).toBe('zh');
    });
  });

  it('observes `locales` attribute changes', async () => {
    const page = await createTestPage<TestIntlElement>({
      element: 'intl-foo',
      html: `
        <intl-foo locales="en"></intl-foo>
      `,
    });
    const el = page.element!;

    expect(el.localeList.value).toEqual('en');

    el.setAttribute('locales', 'en ja');
    await el.updateComplete;
    expect(el.localeList.value).toEqual('en ja');
  });

  it('only updates `locales` if it has been defined by user', async () => {
    const page = await createTestPage<TestIntlElement>({
      element: 'intl-foo',
      html: `
        <intl-foo lang="en"></intl-foo>
      `,
    });
    const el = page.element!;

    expect(el.localeList.value).toBe('en');
    expect(el.getAttribute('locales')).toBeNull();

    el.setAttribute('locales', 'invalid');
    await el.updateComplete;
    expect(el.localeList.value).toBe('');

    el.lang = 'ja';
    // TODO: Find out why this triggered 2 updates
    await el.updateComplete;
    await el.updateComplete;
    expect(el.getAttribute('lang')).toBe('ja');
    expect(el.localeList.value).toBe('ja');
    expect(el.getAttribute('locales')).toBe('ja');
  });

  describe('observes `locales` attribute removal and fallback', () => {
    it('1. `lang` attribute', async () => {
      const page = await createTestPage<TestIntlElement>({
        element: 'intl-foo',
        html: `
          <intl-foo locales="ar"></intl-foo>
        `,
      });
      const el = page.element!;

      expect(el.localeList.value).toBe('ar');

      el.setAttribute('lang', 'en');
      el.removeAttribute('locales');
      await el.updateComplete;
      expect(el.localeList.value).toBe('en');
    });
    it.todo('2. `locales-from` attribute');
    it.todo('3.1. closest ancestor’s `lang`');
    it.todo('3.2. closest ancestor `intl-locale` element');
  });

  it('observes `lang` attribute changes', async () => {
    const page = await createTestPage<TestIntlElement>({
      element: 'intl-foo',
      html: `
        <intl-foo lang="en"></intl-foo>
      `,
    });
    const el = page.element!;

    expect(el.localeList.value).toBe('en');

    el.setAttribute('lang', 'ja');
    await el.updateComplete;
    expect(el.localeList.value).toBe('ja');
  });

  describe('observes `lang` attribute removal and fallback', () => {
    it.todo('1. `locales-from` attribute');
    it.todo('2.1. closest ancestor’s `lang`');
    it.todo('2.2. closest ancestor `intl-locale` element');
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

    expect(el.localeList.value).toBe('ja fr');

    el.setAttribute('locales-from', 'my-ja');
    await el.updateComplete;
    expect(el.localeList.value).toBe('ja');
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

    expect(el.localesFromElements).toEqual([
      document.getElementById('my-ja'),
      document.getElementById('my-fr'),
    ]);
    expect(el.localeList.value).toBe('ja fr');
  });

  it('observes the `intl-locale` elements associated by `locales-from` ' +
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

    expect(el.localeList.value).toBe('ja fr');

    const myJaEl = document.getElementById('my-ja')! as HTMLIntlLocaleElement;
    myJaEl.tag = 'zh';
    await myJaEl.updateComplete;
    await el.updateComplete;

    expect(myJaEl.valueAsString).toBe('zh');
    expect(el.localeList.value).toBe('zh fr');
  });

  describe('observes ancestors for `lang` attribute and `intl-locale` element changes', () => {
    let el1: TestIntlElement;
    let el2: TestIntlElement;

    beforeEach(async () => {
      await createTestPage<TestIntlElement>({
        element: ['intl-foo', 'intl-locale'],
        html: `
          <intl-locale tag="zh">
            <div lang="es">
              <intl-foo id="el1"></intl-foo>
            </div>
            <intl-foo id="el2"></intl-foo>
          </intl-locale>
        `,
      });
      el1 = document.getElementById('el1')! as TestIntlElement;
      el2 = document.getElementById('el2')! as TestIntlElement;

      expect(el1.localeList.value).toBe('es');
      expect(el2.localeList.value).toBe('zh');
    });

    it('observes ancestor’s `lang` attribute changes', async () => {
      const div = document.querySelector('div')!;
      div.setAttribute('lang', 'fr');

      await el1.updateComplete;
      await el2.updateComplete;

      expect(el1.localeList.value).toBe('fr');
      expect(el2.localeList.value).toBe('zh');
    });

    it('observes ancestor `intl-locale` element changes', async () => {
      const intlLocale = document.querySelector('intl-locale')!;
      intlLocale.setAttribute('tag', 'ja');

      await intlLocale.updateComplete;
      await el1.updateComplete;
      await el2.updateComplete;

      expect(el1.localeList.value).toBe('es');
      expect(el2.localeList.value).toBe('ja');
    });

    it('observes closest relevant ancestor changes', async () => {
      const intlLocale = document.querySelector('intl-locale')!;
      intlLocale.append(el1);

      await el1.updateComplete;
      await el2.updateComplete;

      expect(el1.localeList.value).toBe('zh');
      expect(el2.localeList.value).toBe('zh');
    });
  });
});
