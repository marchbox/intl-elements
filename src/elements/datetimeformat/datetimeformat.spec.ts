import {createTestPage} from '../../testing';
import HTMLIntlDateTimeFormatElement from './datetimeformat';

describe('intl-datetimeformat', () => {
  it('returns correct resolved options', async () => {
    await createTestPage({
      elements: ['intl-datetimeformat'],
      html: `
        <intl-datetimeformat locales="de"
            option-datestyle="full"
            option-timestyle="short"
            option-calendar="chinese">
        </intl-datetimeformat>
      `,
    });
    const el = document.querySelector('intl-datetimeformat') as HTMLIntlDateTimeFormatElement;

    // @ts-ignore
    const intlResult = new Intl.DateTimeFormat('de', {
      dateStyle: 'full',
      timeStyle: 'short',
      calendar: 'chinese',
    }).resolvedOptions();

    expect(el.resolvedOptions()).toEqual(intlResult);
  });
});
