import DisplayNames from './displaynames';

describe('DisplayNames', () => {
  it('produces consistent language names as the Intl API', async () => {
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
});
