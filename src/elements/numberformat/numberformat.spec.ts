import {createTestPage} from '../../testing';
import HTMLIntlNumberFormatElement from './numberformat';

describe('intl-numberformat', () => {
  it('returns correct resolved options', async () => {
    await createTestPage({
      elements: ['intl-numberformat'],
      html: `
        <intl-numberformat locales="de"
            option-style="currency"
            option-currency="usd">
        </intl-numberformat>
      `,
    });
    const el = document.querySelector('intl-numberformat') as HTMLIntlNumberFormatElement;

    // @ts-ignore
    const intlResult = new Intl.NumberFormat('de', {
      style: 'currency',
      currency: 'usd',
    }).resolvedOptions();

    expect(el.resolvedOptions()).toEqual(intlResult);
  });
});
