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

  it.todo('renders Shadow Parts')
});
