import {createTestPage} from '../../testing';
import HTMLIntlListFormatElement from './listformat';

describe('intl-listformat', () => {
  it('returns correct resolved options', async () => {
    await createTestPage({
      elements: ['intl-listformat'],
      html: `
        <intl-listformat locales="de" option-style="narrow" option-type="unit">
        </intl-listformat>
      `,
    });
    const el = document.querySelector('intl-listformat') as HTMLIntlListFormatElement;

    // @ts-ignore
    const intlResult = new Intl.ListFormat('de', {
      type: 'unit',
      style: 'narrow',
    }).resolvedOptions();

    expect(el.resolvedOptions()).toEqual(intlResult);
  });
});
