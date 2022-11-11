import DisplayNames from './displaynames';

customElements.define('intl-displaynames', DisplayNames);

describe('DisplayNames', () => {
  it('produces consistent language names as the Intl API', async () => {
    const el = new DisplayNames();
    el.locales = 'en';
    el.of = 'ja';

    document.body.append(el);
    expect(el.textContent).toBe('Japanese');
  });
});
