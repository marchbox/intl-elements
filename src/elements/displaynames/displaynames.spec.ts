import {createTestPage} from '../../testing';
import HTMLIntlDisplayNamesElement from './displaynames';

describe('intl-displaynames', () => {
  it('returns correct resolved options', async () => {
    await createTestPage({
      elements: ['intl-displaynames'],
      html: `
        <intl-displaynames
          locales="en"
          option-type="region"
          option-style="narrow"
          option-fallback="code"
        ></intl-displaynames>
      `,
    });
    const el = document.querySelector('intl-displaynames') as HTMLIntlDisplayNamesElement;

    const intlResult = new Intl.DisplayNames('en', {
      type: 'region',
      style: 'narrow',
      fallback: 'code',
    }).resolvedOptions();

    expect(el.resolvedOptions()).toEqual(intlResult);
  });
});
