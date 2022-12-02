import {expect, describe, it, jest} from '@jest/globals';

import {
  FakeIntlApi,
  TestIntlProviderElement,
  createTestPage,
  defineTestIntlElements,
} from '../testing';
import AbstractIntlProviderElement from './abstract-intl-provider-element';
import HTMLIntlLocaleElement from './locale/locale';

defineTestIntlElements();

describe('AbstractIntlProviderElement', () => {
  it('handles multiple locales and ignores unsupported and invalid ones', async () => {
    const page = await createTestPage<TestIntlProviderElement>({
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
    const page = await createTestPage<TestIntlProviderElement>({
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
    const page = await createTestPage<TestIntlProviderElement>({
      element: 'intl-foo',
      html: `
        <intl-foo></intl-foo>
      `,
    });
    const el = page.element;

    expect(el.getAttribute('role')).toBe('none');
  });

  it('should not override author defined role', async () => {
    const page = await createTestPage<TestIntlProviderElement>({
      element: 'intl-foo',
      html: `
        <intl-foo role="option"></intl-foo>
      `,
    });
    const el = page.element;

    expect(el.getAttribute('role')).toBe('option');
  });

  it('rejects invalid atttibute values', async () => {
    const page = await createTestPage<TestIntlProviderElement>({
      element: 'intl-foo',
      html: `
        <intl-foo locales="en" format-unit="year"></intl-foo>
      `,
    });
    const el = page.element!;

    const spy = jest.spyOn(el, 'update');
    el.setAttribute('format-unit', 'invalid');
    await el.updateComplete;
    expect(spy).not.toHaveBeenCalled();
    spy.mockRestore();
  });

  describe('locale list determination prioritization', () => {
    test('1. `locales` attribute', async () => {
      const page = await createTestPage<TestIntlProviderElement>({
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

    it('keeps locale list based on `locales` attribute when ancestor changed', async () => {
      const page = await createTestPage<TestIntlProviderElement>({
        element: ['intl-foo', 'intl-locale'],
        html: `
          <div lang="es">
            <intl-foo locales="en">
            </intl-foo>
          </div>
        `,
      });
      const el = page.element;
      const divEl = document.querySelector('div[lang="es"]')!;

      divEl.setAttribute('lang', 'zh');
      await el.updateComplete;
      expect(el.localeList.value).toBe('en');
    });

    test('2. `lang` attribute', async () => {
      const page = await createTestPage<TestIntlProviderElement>({
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

    test('3. `locales-from` attribute', async () => {
      const page = await createTestPage<TestIntlProviderElement>({
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

    test('4.1. closest ancestor’s `lang`', async () => {
      await createTestPage<TestIntlProviderElement>({
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
      const els = document.querySelectorAll('intl-foo') as NodeListOf<TestIntlProviderElement>;

      expect(els[0]!.localeList.value).toBe('es');
      expect(els[1]!.localeList.value).toBe('es');
    });

    test('4.2. closest ancestor `intl-locale` element', async () => {
      await createTestPage<TestIntlProviderElement>({
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
      const els = document.querySelectorAll('intl-foo') as NodeListOf<TestIntlProviderElement>;

      expect(els[0]!.localeList.value).toBe('zh');
      expect(els[1]!.localeList.value).toBe('zh');
    });
  });

  it('observes `locales` attribute changes', async () => {
    const page = await createTestPage<TestIntlProviderElement>({
      element: 'intl-foo',
      html: `
        <intl-foo locales="en"></intl-foo>
      `,
    });
    const el = page.element!;

    expect(el.localeList.value).toBe('en');

    el.setAttribute('locales', 'en ja');
    await el.updateComplete;
    expect(el.localeList.value).toBe('en ja');
  });

  it('only updates `locales` if it has been defined by user', async () => {
    const page = await createTestPage<TestIntlProviderElement>({
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
    test('1.1. added `lang` attribute', async () => {
      const page = await createTestPage<TestIntlProviderElement>({
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

    test('1.2. existing `lang` attribute', async () => {
      const page = await createTestPage<TestIntlProviderElement>({
        element: 'intl-foo',
        html: `
          <intl-foo locales="ar" lang="zh"></intl-foo>
        `,
      });
      const el = page.element!;

      expect(el.localeList.value).toBe('ar');

      el.removeAttribute('locales');
      await el.updateComplete;
      expect(el.localeList.value).toBe('zh');
    });

    test('2. `locales-from` attribute', async () => {
      const page = await createTestPage<TestIntlProviderElement>({
        element: ['intl-foo', 'intl-locale'],
        html: `
          <intl-locale tag="zh">
            <intl-locale id="my-ja" tag="ja"></intl-locale>
            <intl-locale id="my-fr" tag="fr"></intl-locale>
            <intl-foo locales="en zh" locales-from="my-ja my-fr"></intl-foo>
          </intl-locale>
        `,
      });
      const el = page.element!;

      expect(el.localeList.value).toBe('en zh');

      el.removeAttribute('locales');
      await el.updateComplete;
      expect(el.localeList.value).toBe('ja fr');
    });

    test('3.1. closest ancestor’s `lang`', async () => {
      const page = await createTestPage<TestIntlProviderElement>({
        element: 'intl-foo',
        html: `
          <div lang="es">
            <intl-foo locales="en zh"></intl-foo>
          </div>
        `,
      });
      const el = page.element!;

      expect(el.localeList.value).toBe('en zh');

      el.removeAttribute('locales');
      await el.updateComplete;
      expect(el.localeList.value).toBe('es');
    });

    test('3.2. closest ancestor `intl-locale` element', async () => {
      const page = await createTestPage<TestIntlProviderElement>({
        element: ['intl-foo', 'intl-locale'],
        html: `
          <intl-locale tag="zh">
            <intl-foo locales="en ja"></intl-foo>
          </intl-locale>
        `,
      });
      const el = page.element!;

      expect(el.localeList.value).toBe('en ja');

      el.removeAttribute('locales');
      await el.updateComplete;
      expect(el.localeList.value).toBe('zh');
    });
  });

  it('observes `lang` attribute changes', async () => {
    const page = await createTestPage<TestIntlProviderElement>({
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
    test('1. `locales-from` attribute', async () => {
      const page = await createTestPage<TestIntlProviderElement>({
        element: ['intl-foo', 'intl-locale'],
        html: `
          <intl-locale tag="zh">
            <intl-locale id="my-ja" tag="ja"></intl-locale>
            <intl-locale id="my-fr" tag="fr"></intl-locale>
            <intl-foo lang="en" locales-from="my-ja my-fr"></intl-foo>
          </intl-locale>
        `,
      });
      const el = page.element!;

      expect(el.localeList.value).toBe('en');

      el.removeAttribute('lang');
      await el.updateComplete;
      expect(el.localeList.value).toBe('ja fr');
    });

    test('2.1. closest ancestor’s `lang`', async () => {
      const page = await createTestPage<TestIntlProviderElement>({
        element: 'intl-foo',
        html: `
          <div lang="es">
            <intl-foo lang="en"></intl-foo>
          </div>
        `,
      });
      const el = page.element!;

      expect(el.localeList.value).toBe('en');

      el.removeAttribute('lang');
      await el.updateComplete;
      expect(el.localeList.value).toBe('es');
    });

    test('2.2. closest ancestor `intl-locale` element', async () => {
      const page = await createTestPage<TestIntlProviderElement>({
        element: ['intl-foo', 'intl-locale'],
        html: `
          <intl-locale tag="zh">
            <intl-foo lang="en"></intl-foo>
          </intl-locale>
        `,
      });
      const el = page.element!;

      expect(el.localeList.value).toBe('en');

      el.removeAttribute('lang');
      await el.updateComplete;
      expect(el.localeList.value).toBe('zh');
    });
  });

  it('uses locales from `intl-locale` elements associated by `locales-from`', async () => {
    const page = await createTestPage<TestIntlProviderElement>({
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

  it('observes the `locales-from` attribute and updates the locale list', async () => {
    const page = await createTestPage<TestIntlProviderElement>({
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

  it('observes the `locales-from` attribute removal and updates the locale list', async () => {
    const page = await createTestPage<TestIntlProviderElement>({
      element: ['intl-foo', 'intl-locale'],
      html: `
        <div lang="es">
          <intl-locale id="my-ja" tag="ja"></intl-locale>
          <intl-locale id="my-fr" tag="fr"></intl-locale>
          <intl-foo locales-from="my-ja my-fr"></intl-foo>
        </div>
      `,
    });
    const el = page.element!;

    expect(el.localeList.value).toBe('ja fr');

    el.removeAttribute('locales-from');
    await el.updateComplete;
    expect(el.localeList.value).toBe('es');
  });

  describe('observes `intl-locale` elements associated by `locales-from` and updates the locale list', () => {
    it('observes `intl-locale`’s locale changes', async () => {
      const page = await createTestPage<TestIntlProviderElement>({
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

    it('observes `intl-locale` removal', async () => {
      const page = await createTestPage<TestIntlProviderElement>({
        element: ['intl-foo', 'intl-locale'],
        html: `
          <intl-locale id="my-ja" tag="ja"></intl-locale>
          <intl-locale id="my-fr" tag="fr"></intl-locale>
          <intl-foo locales-from="my-ja my-fr"></intl-foo>
        `,
      });
      const el = page.element!;
      const myJaEl = document.getElementById('my-ja')! as HTMLIntlLocaleElement;
      const myFrEl = document.getElementById('my-fr')! as HTMLIntlLocaleElement;

      expect(el.localeList.value).toBe('ja fr');

      myJaEl.remove();
      await el.updateComplete;

      expect(el.localesFromElements).toEqual([myFrEl]);
      expect(el.localeList.value).toBe('fr');

      myFrEl.remove();
      await el.updateComplete;

      expect(el.localesFromElements).toEqual([]);
      expect(el.localeList.value).toBe('');
    });

    it('observes `intl-locale` removal and fallback to ancestor', async () => {
      const page = await createTestPage<TestIntlProviderElement>({
        element: ['intl-foo', 'intl-locale'],
        html: `
          <div lang="es">
            <intl-locale id="my-ja" tag="ja"></intl-locale>
            <intl-locale id="my-fr" tag="fr"></intl-locale>
            <intl-foo locales-from="my-ja my-fr"></intl-foo>
          </div>
        `,
      });
      const el = page.element!;
      const myJaEl = document.getElementById('my-ja')! as HTMLIntlLocaleElement;
      const myFrEl = document.getElementById('my-fr')! as HTMLIntlLocaleElement;

      expect(el.localeList.value).toBe('ja fr');

      myJaEl.remove();
      myFrEl.remove();
      await el.updateComplete;

      expect(el.localeList.value).toBe('es');
      expect(el.localesFromElements).toEqual([]);
    });
  });

  describe('observes ancestors for `lang` attribute and `intl-locale` element changes', () => {
    let el1: TestIntlProviderElement;
    let el2: TestIntlProviderElement;

    beforeEach(async () => {
      await createTestPage<TestIntlProviderElement>({
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
      el1 = document.getElementById('el1')! as TestIntlProviderElement;
      el2 = document.getElementById('el2')! as TestIntlProviderElement;

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

  // TODO: Test this.
  it.skip('throws if the `consumerElementNames` static property isn’t defined', async () => {
    class BadProviderElement extends AbstractIntlProviderElement {
      // @ts-ignore
      intlObject = new FakeIntlApi();

      // @ts-ignore
      resolvedOptions() {
        return {};
      }
    }
    customElements.define('bad-provider', BadProviderElement);
  });
});