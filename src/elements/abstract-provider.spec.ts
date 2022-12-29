import {
  FakeIntlApi,
  TestProvider,
  TestConsumer,
  createTestPage,
  defineTestIntlElements,
} from '../testing';
import AbstractProvider from './abstract-provider';
import HTMLIntlLocaleElement from './locale/locale';

defineTestIntlElements();

describe('AbstractProvider', () => {
  it('handles multiple locales', async () => {
    await createTestPage({
      elements: ['intl-foo'],
      html: `
        <intl-foo locales="he ja zh">
        </intl-foo>
      `,
    });
    const el = document.querySelector('intl-foo') as TestProvider;

    expect(el.localeList.value).toBe('he ja zh');
  });

  it('processes extra whitespaces properly', async () => {
    await createTestPage({
      elements: ['intl-foo'],
      html: `
        <intl-foo locales="   en      ja  ">
        </intl-foo>
      `,
    });
    const el = document.querySelector('intl-foo') as TestProvider;

    expect(Array.from(el.localeList.values())).toEqual(['en', 'ja']);
  });

  it('should add `none` role if role is missing', async () => {
    await createTestPage({
      elements: ['intl-foo'],
      html: `
        <intl-foo></intl-foo>
      `,
    });
    const el = document.querySelector('intl-foo') as TestProvider;

    expect(el).toHaveAttribute('role', 'none');
  });

  it('should not override author defined role', async () => {
    await createTestPage({
      elements: ['intl-foo'],
      html: `
        <intl-foo role="option"></intl-foo>
      `,
    });
    const el = document.querySelector('intl-foo') as TestProvider;

    expect(el).toHaveAttribute('role', 'option');
  });

  // TODO: Add test for `option-timezone`.
  it('handles option values as case-insensitive', async () => {
    await createTestPage({
      elements: ['intl-foo'],
      html: `
        <intl-foo option-unit="DaY" option-currency="usd"></intl-foo>
      `,
    });
    const el = document.querySelector('intl-foo') as TestProvider;

    expect(el.optionUnit).toBe('day');
    expect(el.optionCurrency).toBe('USD');
  });

  describe('locale list determination prioritization', () => {
    test('1. `locales` attribute', async () => {
      await createTestPage({
        elements: ['intl-foo', 'intl-locale'],
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
      const el = document.querySelector('intl-foo') as TestProvider;

      expect(el.localeList.value).toBe('en');
    });

    it('keeps locale list based on `locales` attribute when ancestor changed', async () => {
      await createTestPage({
        elements: ['intl-foo'],
        html: `
          <div lang="es">
            <intl-foo locales="en">
            </intl-foo>
          </div>
        `,
      });
      const el = document.querySelector('intl-foo') as TestProvider;
      const divEl = document.querySelector('div[lang="es"]')!;

      divEl.setAttribute('lang', 'zh');
      await el.updateComplete;
      expect(el.localeList.value).toBe('en');
    });

    test('2. `lang` attribute', async () => {
      await createTestPage({
        elements: ['intl-foo', 'intl-locale'],
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
      const el = document.querySelector('intl-foo') as TestProvider;

      expect(el.localeList.value).toBe('ar');
    });

    test('3. `locales-from` attribute', async () => {
      await createTestPage({
        elements: ['intl-foo', 'intl-locale'],
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
      const el = document.querySelector('intl-foo') as TestProvider;

      expect(el.localeList.value).toBe('ja fr');
    });

    test('4.1. closest ancestor’s `lang`', async () => {
      await createTestPage({
        elements: ['intl-foo', 'intl-locale'],
        html: `
          <intl-locale tag="zh">
            <div lang="es">
              <intl-foo></intl-foo>
              <intl-foo></intl-foo>
            </div>
          </intl-locale>
        `,
      });
      const els = document.querySelectorAll('intl-foo') as NodeListOf<TestProvider>;

      expect(els[0]!.localeList.value).toBe('es');
      expect(els[1]!.localeList.value).toBe('es');
    });

    test('4.2. closest ancestor `intl-locale` element', async () => {
      await createTestPage({
        elements: ['intl-foo', 'intl-locale'],
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
      const els = document.querySelectorAll('intl-foo') as NodeListOf<TestProvider>;

      expect(els[0]!.localeList.value).toBe('zh');
      expect(els[1]!.localeList.value).toBe('zh');
    });
  });

  it('observes `locales` attribute changes', async () => {
    await createTestPage({
      elements: ['intl-foo'],
      html: `
        <intl-foo locales="en"></intl-foo>
      `,
    });
    const el = document.querySelector('intl-foo') as TestProvider;

    expect(el.localeList.value).toBe('en');

    el.setAttribute('locales', 'en ja');
    await el.updateComplete;
    expect(el.localeList.value).toBe('en ja');
  });

  it('only updates `locales` if it has been defined by user', async () => {
    await createTestPage({
      elements: ['intl-foo'],
      html: `
        <intl-foo lang="en"></intl-foo>
      `,
    });
    const el = document.querySelector('intl-foo') as TestProvider;

    expect(el.localeList.value).toBe('en');
    expect(el).not.toHaveAttribute('locales');

    el.setAttribute('locales', '');
    await el.updateComplete;
    expect(el.localeList.value).toBe('');

    el.lang = 'ja';
    // TODO: Find out why this triggered 3 updates
    await el.updateComplete;
    await el.updateComplete;
    await el.updateComplete;
    expect(el).toHaveAttribute('lang', 'ja');
    expect(el).toHaveAttribute('locales', 'ja');
    expect(el.localeList.value).toBe('ja');
  });

  describe('observes `locales` attribute removal and fallback', () => {
    test('1.1. added `lang` attribute', async () => {
      await createTestPage({
        elements: ['intl-foo'],
        html: `
          <intl-foo locales="ar"></intl-foo>
        `,
      });
      const el = document.querySelector('intl-foo') as TestProvider;

      expect(el.localeList.value).toBe('ar');

      el.setAttribute('lang', 'en');
      el.removeAttribute('locales');
      await el.updateComplete;
      expect(el.localeList.value).toBe('en');
    });

    test('1.2. existing `lang` attribute', async () => {
      await createTestPage({
        elements: ['intl-foo'],
        html: `
          <intl-foo locales="ar" lang="zh"></intl-foo>
        `,
      });
      const el = document.querySelector('intl-foo') as TestProvider;

      expect(el.localeList.value).toBe('ar');

      el.removeAttribute('locales');
      await el.updateComplete;
      expect(el.localeList.value).toBe('zh');
    });

    test('2. `locales-from` attribute', async () => {
      await createTestPage({
        elements: ['intl-foo', 'intl-locale'],
        html: `
          <intl-locale tag="zh">
            <intl-locale id="my-ja" tag="ja"></intl-locale>
            <intl-locale id="my-fr" tag="fr"></intl-locale>
            <intl-foo locales="en zh" locales-from="my-ja my-fr"></intl-foo>
          </intl-locale>
        `,
      });
      const el = document.querySelector('intl-foo') as TestProvider;

      expect(el.localeList.value).toBe('en zh');

      el.removeAttribute('locales');
      await el.updateComplete;
      expect(el.localeList.value).toBe('ja fr');
    });

    test('3.1. closest ancestor’s `lang`', async () => {
      await createTestPage({
        elements: ['intl-foo'],
        html: `
          <div lang="es">
            <intl-foo locales="en zh"></intl-foo>
          </div>
        `,
      });
      const el = document.querySelector('intl-foo') as TestProvider;

      expect(el.localeList.value).toBe('en zh');

      el.removeAttribute('locales');
      await el.updateComplete;
      expect(el.localeList.value).toBe('es');
    });

    test('3.2. closest ancestor `intl-locale` element', async () => {
      await createTestPage({
        elements: ['intl-foo', 'intl-locale'],
        html: `
          <intl-locale tag="zh">
            <intl-foo locales="en ja"></intl-foo>
          </intl-locale>
        `,
      });
      const el = document.querySelector('intl-foo') as TestProvider;

      expect(el.localeList.value).toBe('en ja');

      el.removeAttribute('locales');
      await el.updateComplete;
      expect(el.localeList.value).toBe('zh');
    });
  });

  it('observes `lang` attribute changes', async () => {
    await createTestPage({
      elements: ['intl-foo'],
      html: `
        <intl-foo lang="en"></intl-foo>
      `,
    });
    const el = document.querySelector('intl-foo') as TestProvider;

    expect(el.localeList.value).toBe('en');

    el.setAttribute('lang', 'ja');
    await el.updateComplete;
    expect(el.localeList.value).toBe('ja');
  });

  describe('observes `lang` attribute removal and fallback', () => {
    test('1. `locales-from` attribute', async () => {
      await createTestPage({
        elements: ['intl-foo', 'intl-locale'],
        html: `
          <intl-locale tag="zh">
            <intl-locale id="my-ja" tag="ja"></intl-locale>
            <intl-locale id="my-fr" tag="fr"></intl-locale>
            <intl-foo lang="en" locales-from="my-ja my-fr"></intl-foo>
          </intl-locale>
        `,
      });
      const el = document.querySelector('intl-foo') as TestProvider;

      expect(el.localeList.value).toBe('en');

      el.removeAttribute('lang');
      await el.updateComplete;
      expect(el.localeList.value).toBe('ja fr');
    });

    test('2.1. closest ancestor’s `lang`', async () => {
      await createTestPage({
        elements: ['intl-foo'],
        html: `
          <div lang="es">
            <intl-foo lang="en"></intl-foo>
          </div>
        `,
      });
      const el = document.querySelector('intl-foo') as TestProvider;

      expect(el.localeList.value).toBe('en');

      el.removeAttribute('lang');
      await el.updateComplete;
      expect(el.localeList.value).toBe('es');
    });

    test('2.2. closest ancestor `intl-locale` element', async () => {
      await createTestPage({
        elements: ['intl-foo', 'intl-locale'],
        html: `
          <intl-locale tag="zh">
            <intl-foo lang="en"></intl-foo>
          </intl-locale>
        `,
      });
      const el = document.querySelector('intl-foo') as TestProvider;

      expect(el.localeList.value).toBe('en');

      el.removeAttribute('lang');
      await el.updateComplete;
      expect(el.localeList.value).toBe('zh');
    });
  });

  it('uses locales from `intl-locale` elements associated by `locales-from`', async () => {
    await createTestPage({
      elements: ['intl-foo', 'intl-locale'],
      html: `
        <intl-locale id="my-ja" tag="ja"></intl-locale>
        <intl-locale id="my-fr" tag="fr"></intl-locale>
        <intl-locale id="my-invalid" tag="veryveryinvalid"></intl-locale>
        <intl-foo locales-from="my-ja my-fr my-invalid"></intl-foo>
      `,
    });
    const el = document.querySelector('intl-foo') as TestProvider;

    expect(el.localesFromElements).toEqual([
      document.getElementById('my-ja'),
      document.getElementById('my-fr'),
    ]);
    expect(el.localeList.value).toBe('ja fr');
  });

  it('observes the `locales-from` attribute and updates the locale list', async () => {
    await createTestPage({
      elements: ['intl-foo', 'intl-locale'],
      html: `
        <intl-locale id="my-ja" tag="ja"></intl-locale>
        <intl-locale id="my-fr" tag="fr"></intl-locale>
        <intl-foo locales-from="my-ja my-fr"></intl-foo>
      `,
    });
    const el = document.querySelector('intl-foo') as TestProvider;

    expect(el.localeList.value).toBe('ja fr');

    el.setAttribute('locales-from', 'my-ja');
    await el.updateComplete;
    expect(el.localeList.value).toBe('ja');
  });

  it('observes the `locales-from` attribute removal and updates the locale list', async () => {
    await createTestPage({
      elements: ['intl-foo', 'intl-locale'],
      html: `
        <div lang="es">
          <intl-locale id="my-ja" tag="ja"></intl-locale>
          <intl-locale id="my-fr" tag="fr"></intl-locale>
          <intl-foo locales-from="my-ja my-fr"></intl-foo>
        </div>
      `,
    });
    const el = document.querySelector('intl-foo') as TestProvider;

    expect(el.localeList.value).toBe('ja fr');

    el.removeAttribute('locales-from');
    await el.updateComplete;
    expect(el.localeList.value).toBe('es');
  });

  describe('observes `intl-locale` elements associated by `locales-from` and updates the locale list', () => {
    it('observes `intl-locale`’s locale changes', async () => {
      await createTestPage({
        elements: ['intl-foo', 'intl-locale'],
        html: `
          <intl-locale id="my-ja" tag="ja"></intl-locale>
          <intl-locale id="my-fr" tag="fr"></intl-locale>
          <intl-foo locales-from="my-ja my-fr"></intl-foo>
        `,
      });
      const el = document.querySelector('intl-foo') as TestProvider;

      expect(el.localeList.value).toBe('ja fr');

      const myJaEl = document.getElementById('my-ja')! as HTMLIntlLocaleElement;
      myJaEl.tag = 'zh';
      await myJaEl.updateComplete;
      await el.updateComplete;

      expect(myJaEl.valueAsString).toBe('zh');
      expect(el.localeList.value).toBe('zh fr');
    });

    it('observes `intl-locale` removal', async () => {
      await createTestPage({
        elements: ['intl-foo', 'intl-locale'],
        html: `
          <intl-locale id="my-ja" tag="ja"></intl-locale>
          <intl-locale id="my-fr" tag="fr"></intl-locale>
          <intl-foo locales-from="my-ja my-fr"></intl-foo>
        `,
      });
      const el = document.querySelector('intl-foo') as TestProvider;
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
      await createTestPage({
        elements: ['intl-foo', 'intl-locale'],
        html: `
          <div lang="es">
            <intl-locale id="my-ja" tag="ja"></intl-locale>
            <intl-locale id="my-fr" tag="fr"></intl-locale>
            <intl-foo locales-from="my-ja my-fr"></intl-foo>
          </div>
        `,
      });
      const el = document.querySelector('intl-foo') as TestProvider;
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
    let el1: TestProvider;
    let el2: TestProvider;

    beforeEach(async () => {
      await createTestPage({
        elements: ['intl-foo', 'intl-locale'],
        html: `
          <intl-locale tag="zh">
            <div lang="es">
              <intl-foo id="el1"></intl-foo>
            </div>
            <intl-foo id="el2"></intl-foo>
          </intl-locale>
        `,
      });
      el1 = document.getElementById('el1')! as TestProvider;
      el2 = document.getElementById('el2')! as TestProvider;

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

  describe('`html[lang]` as ultimate fallback for locale list determination', () => {
    it('uses `html[lang]` if no other locale list is available', async () => {
      await createTestPage({
        elements: ['intl-foo'],
        html: `
          <intl-foo></intl-foo>
        `,
        lang: 'ja',
      });
      const el = document.querySelector('intl-foo')! as TestProvider;

      expect(el.localeList.value).toBe('ja');
    });

    it('uses html[lang] if the `locales` attribute is removed', async () => {
      await createTestPage({
        elements: ['intl-foo'],
        html: `
          <intl-foo locales="en"></intl-foo>
        `,
        lang: 'es',
      });
      const el = document.querySelector('intl-foo')! as TestProvider;

      expect(el.localeList.value).toBe('en');

      el.removeAttribute('locales');
      await el.updateComplete;

      expect(el.localeList.value).toBe('es');
    });

    it('uses `html[lang]` if the original locale list ancestor is removed', async () => {
      await createTestPage({
        elements: ['intl-foo'],
        html: `
          <div lang="es">
            <intl-foo></intl-foo>
          </div>
        `,
        lang: 'ar',
      });
      const el = document.querySelector('intl-foo')! as TestProvider;

      expect(el.localeList.value).toBe('es');

      document.querySelector('div')!.removeAttribute('lang');
      await el.updateComplete;
      await el.updateComplete;

      expect(el.localeList.value).toBe('ar');
    });

    it('uses `html[lang]` if its DOM position moved', async () => {
      await createTestPage({
        elements: ['intl-foo'],
        html: `
          <div lang="es">
            <intl-foo></intl-foo>
          </div>
        `,
        lang: 'ar',
      });
      const el = document.querySelector('intl-foo')! as TestProvider;
      const div = document.querySelector('div')!;

      expect(el.localeList.value).toBe('es');

      div.before(el);
      await el.updateComplete;
      await el.updateComplete;

      expect(el.localeList.value).toBe('ar');
    });

    it('observes `html[lang]` changes', async () => {
      await createTestPage({
        elements: ['intl-foo'],
        html: `
          <intl-foo></intl-foo>
        `,
        lang: 'ja',
      });
      const el = document.querySelector('intl-foo')! as TestProvider;

      expect(el.localeList.value).toBe('ja');

      document.documentElement.lang = 'fr';
      await el.updateComplete;
      await el.updateComplete;

      expect(el.localeList.value).toBe('fr');
    });
  });

  it('gets an empty array as locale list if the `consumerElementNames` static property isn’t defined', async () => {
    class BadProvider extends AbstractProvider {
      static override intlApi = FakeIntlApi;

      // @ts-ignore
      intlObject = new FakeIntlApi();

      // @ts-ignore
      resolvedOptions() {
        return {};
      }
    }
    customElements.define('bad-provider', BadProvider);

    await createTestPage({
      elements: ['bad-provider'],
      html: `
        <bad-provider></bad-provider>
      `,
    });
    // @ts-ignore
    const el = document.querySelector('bad-provider')! as BadProvider;

    expect(el.consumerElements).toEqual([]);
  });

  it('gets consumer elements from both the descendants and referenced', async () => {
    await createTestPage({
      elements: ['intl-foo', 'intl-foo-bar'],
      html: `
        <intl-foo id="foo">
          <intl-foo-bar></intl-foo-bar>
        </intl-foo>
        <intl-foo-bar provider="foo"></intl-foo-bar>
      `,
    });
    const el = document.querySelector('intl-foo')! as TestProvider;
    const bars = Array.from(document.querySelectorAll('intl-foo-bar')) as TestConsumer[];

    expect(el.consumerElements).toEqual(bars);
  });

  it('updates consumer elements when itself is updated', async () => {
    await createTestPage({
      elements: ['intl-foo', 'intl-foo-bar'],
      html: `
        <intl-foo id="foo" locales="en">
          <intl-foo-bar></intl-foo-bar>
        </intl-foo>
        <intl-foo-bar provider="foo"></intl-foo-bar>
      `,
    });
    const el = document.querySelector('intl-foo')! as TestProvider;
    const bars = Array.from(document.querySelectorAll('intl-foo-bar')) as TestConsumer[];
    const spy1 = jest.spyOn(bars[0]!, 'requestUpdate');
    const spy2 = jest.spyOn(bars[1]!, 'requestUpdate');

    el.setAttribute('locales', 'fr');
    await el.updateComplete;

    expect(spy1).toHaveBeenCalled();
    expect(spy2).toHaveBeenCalled();

    spy1.mockRestore();
    spy2.mockRestore();
  });

  it('ignores unrecognized descendants from its consumer list', async () => {
    await createTestPage({
      elements: ['intl-foo'],
      html: `
        <intl-foo>
          <intl-baz></intl-baz>
          <intl-foo-bar></intl-foo-bar>
        </intl-foo>
      `,
    });
    const el = document.querySelector('intl-foo')! as TestProvider;

    expect(el.consumerElements).toHaveLength(1);
  });
});
