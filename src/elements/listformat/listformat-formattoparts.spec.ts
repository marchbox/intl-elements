import {createTestPage} from '../../testing';
import HTMLIntlListFormatFormatToPartsElement from './listformat-formattoparts';

describe('intl-listformat-format', () => {
  it('has `value` property the same as Intl API result', async () => {
    await createTestPage({
      elements: ['intl-listformat', 'intl-listformat-formattoparts'],
      html: `
        <intl-listformat locales="en">
          <intl-listformat-formattoparts>
            <data value="foo"></data>
            <data value="bar"></data>
          </intl-listformat-formattoparts>
        </intl-listformat>
      `,
    });
    const el = document.querySelector('intl-listformat-formattoparts') as HTMLIntlListFormatFormatToPartsElement;
    // @ts-ignore
    const intlResult = new Intl.ListFormat('en').formatToParts(['foo', 'bar']);

    expect(el.value).toEqual(intlResult);
  });

  it('has `value` property the same as its text content', async () => {
    await createTestPage({
      elements: ['intl-listformat', 'intl-listformat-formattoparts'],
      html: `
        <intl-listformat locales="en">
          <intl-listformat-formattoparts>
            <data value="foo"></data>
            <data value="bar"></data>
          </intl-listformat-formattoparts>
        </intl-listformat>
      `,
    });
    const el = document.querySelector('intl-listformat-formattoparts') as HTMLIntlListFormatFormatToPartsElement;
    const shadow = el.shadowRoot as ShadowRoot;
    const span = shadow.querySelector('span') as HTMLSpanElement;

    expect(el.value.map(part => part.value).join(''))
        .toEqual(span.textContent?.trim());
  });
});
