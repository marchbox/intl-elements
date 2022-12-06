import {createTestPage} from '../../testing';
import HTMLIntlListFormatFormatElement from './listformat-format';

describe('intl-listformat-format', () => {
  it('has `value` property the same as Intl API result', async () => {
    await createTestPage({
      elements: ['intl-listformat', 'intl-listformat-format'],
      html: `
        <intl-listformat locales="en">
          <intl-listformat-format>
            <data value="foo"></data>
            <data value="bar"></data>
          </intl-listformat-format>
        </intl-listformat>
      `,
    });
    const el = document.querySelector('intl-listformat-format') as HTMLIntlListFormatFormatElement;
    // @ts-ignore
    const intlResult = new Intl.ListFormat('en').format(['foo', 'bar']);

    expect(el.value).toEqual(intlResult);
  });

  it('has `value` property the same as its text content', async () => {
    await createTestPage({
      elements: ['intl-listformat', 'intl-listformat-format'],
      html: `
        <intl-listformat locales="en">
          <intl-listformat-format>
            <data value="foo"></data>
            <data value="bar"></data>
          </intl-listformat-format>
        </intl-listformat>
      `,
    });
    const el = document.querySelector('intl-listformat-format') as HTMLIntlListFormatFormatElement;
    const shadow = el.shadowRoot as ShadowRoot;
    const span = shadow.querySelector('span') as HTMLSpanElement;

    expect(span).toHaveTextContent(el.value);
  });

  it('hides slotted contents', async () => {
    await createTestPage({
      elements: ['intl-listformat', 'intl-listformat-format'],
      html: `
        <intl-listformat locales="en">
          <intl-listformat-format>
            <data value="foo"></data>
            <data value="bar"></data>
          </intl-listformat-format>
        </intl-listformat>
      `,
    });
    const el = document.querySelector('intl-listformat-format') as HTMLIntlListFormatFormatElement;
    const span = el.shadowRoot?.querySelector('span[hidden]') as HTMLSlotElement;

    expect(span!).not.toBeVisible();
  });

  it('renders Shadow Parts', async () => {
    await createTestPage({
      elements: ['intl-listformat', 'intl-listformat-format'],
      html: `
        <intl-listformat locales="en">
          <intl-listformat-format>
            <data value="foo"></data>
            <data value="bar"></data>
          </intl-listformat-format>
        </intl-listformat>
      `,
    });
    const el = document.querySelector('intl-listformat-format') as HTMLIntlListFormatFormatElement;

    expect(el).toHaveShadowPartsCount('value', 1);
    expect(el).not.toHaveShadowPart('literal');
    expect(el).not.toHaveShadowPart('element');
  });
});
