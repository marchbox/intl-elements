import {createTestPage} from '../../testing';
import HTMLIntlRelativeTimeFormatElement from './relativetimeformat';

describe('intl-relativetimeformat', () => {
  it('returns correct resolved options', async () => {
    await createTestPage({
      elements: ['intl-relativetimeformat'],
      html: `
        <intl-relativetimeformat locales="de"></intl-relativetimeformat>
      `,
    });
    const el = document.querySelector('intl-relativetimeformat') as HTMLIntlRelativeTimeFormatElement;
    const intlResult = new Intl.RelativeTimeFormat('de').resolvedOptions();

    expect(el.resolvedOptions()).toEqual(intlResult);
  });
});
