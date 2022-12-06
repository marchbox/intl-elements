import {createTestPage} from '../../testing';
import HTMLIntlListFormatFormatToPartsElement from './listformat-formattoparts';

describe('intl-listformat-formattoparts', () => {
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

    expect(span).toHaveTextContent(el.value.map(part => part.value).join(''));
  });

  it('hides slotted contents', async () => {
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
    const span = el.shadowRoot?.querySelector('span[hidden]') as HTMLSlotElement;

    expect(span!).not.toBeVisible();
  });

  it('renders Shadow Parts', async () => {
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

    expect(el).toHaveShadowPartsCount('value', 1);
    expect(el).toHaveShadowPartsCount('literal', 1);
    expect(el).toHaveShadowPartsCount('element', 2);
  });
});
