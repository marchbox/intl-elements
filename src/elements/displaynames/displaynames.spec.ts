import DisplayNames from './displaynames';

describe('DisplayNames', () => {
  it('updates result text when both props and attributes change', async () => {
    const el = document.createElement('intl-displaynames') as DisplayNames;
    el.locales = 'en';
    el.of = 'ja';
    document.body.append(el);

    setTimeout(() => {
      expect(el.textContent).toBe('Japanese');
    }, 0);

    el.setAttribute('of', 'zh-Hant');
    setTimeout(() => {
      expect(el.textContent).toBe('Chinese (Traditional)');
    }, 0);

    el.of = 'de';
    setTimeout(() => {
      expect(el.textContent).toBe('German');
    }, 0);
  });

  it('produces consistent result as the Intl API', async () => {
    const el = document.createElement('intl-displaynames') as DisplayNames;
    el.locales = 'zh';
    el.of = 'ja';
    document.body.append(el);

    setTimeout(() => {
      const intlResult = new Intl.DisplayNames('zh', {
        type: 'language',
      }).of('ja');

      expect(el.textContent).toBe(intlResult);
    }, 0);

    el.of = 'zh-Hant';
    el.languageDisplay = 'standard';
    setTimeout(() => {
      const intlResult = new Intl.DisplayNames('en', {
        type: 'language',
        // @ts-ignore
        style: 'standard',
      }).of('zh-Hant')

      expect(el.textContent).toBe(intlResult);
    }, 0);
  });

  it('handles multiple locales and ignores invalid ones', async () => {
    const el = document.createElement('intl-displaynames') as DisplayNames;
    el.locales = 'invalid ja';
    el.of = 'zh-Hant';
    document.body.append(el);

    setTimeout(() => {
      const intlResult = new Intl.DisplayNames(['invalid', 'ja'], {
        type: 'language',
      }).of('zh-Hant');

      expect(el.textContent).toBe(intlResult);
    }, 0);
  });

  it('handles case-insensitive region subtags', async () => {
    const el1 = document.createElement('intl-displaynames') as DisplayNames;
    const el2 = document.createElement('intl-displaynames') as DisplayNames;
    const el3 = document.createElement('intl-displaynames') as DisplayNames;
    const el4 = document.createElement('intl-displaynames') as DisplayNames;

    el1.locales = 'ar';
    el2.locales = 'ar';
    el3.locales = 'ar';
    el4.locales = 'ar';

    el1.type = 'region';
    el2.type = 'region';
    el3.type = 'region';
    el4.type = 'region';

    el1.of = 'jp';
    el2.of = 'JP';
    el3.of = 'jP';
    el4.of = 'Jp';

    document.body.append(el1, el2, el3, el4);

    setTimeout(() => {
      const intlResult = new Intl.DisplayNames(['ar'], {
        type: 'region',
      }).of('jp');
      
      expect(el1.textContent).toBe(intlResult);
      expect(el2.textContent).toBe(intlResult);
      expect(el3.textContent).toBe(intlResult);
      expect(el4.textContent).toBe(intlResult);
    }, 0)
  });

  it('returns correct resolved options', async () => {
    const el = document.createElement('intl-displaynames') as DisplayNames;
    el.locales = 'en';
    el.of = 'zh-Hant';
    el.type = 'region';
    el.intlStyle = 'narrow';
    el.fallback = 'code';
    document.body.append(el);

    setTimeout(() => {
      const intlResult = new Intl.DisplayNames('en', {
        type: 'region',
        style: 'narrow',
        fallback: 'code',
      }).resolvedOptions();

      expect(el.resolvedOptions()).toEqual(intlResult);
    }, 0);
  });

  it('has `localeList` property as read only.', async () => {
    const el = document.createElement('intl-displaynames') as DisplayNames;
    el.locales = 'en';
    document.body.append(el);

    setTimeout(() => {
      expect(el.localeList).toEqual(['en']);
    }, 0);

    // @ts-ignore
    el.localeList = ['en', 'ja'];
    setTimeout(() => {
      expect(el.localeList).toEqual(['en']);
    }, 0);
  });
});
