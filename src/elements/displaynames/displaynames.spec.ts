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
});
