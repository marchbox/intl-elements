import {createTestPage} from '../../testing';
import HTMLIntlListFormatElement from './listformat';

describe('intl-listformat', () => {
  it.todo('updates result text when both props and attributes change');

  it.todo('has `value` property the same as its text content');

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

  it.todo('reacts to slotted `<data>` element changes');

  it.todo('returns correct formatted parts');

  it.todo('trims list item text');

  it.todo('ignores empty list items');
});
