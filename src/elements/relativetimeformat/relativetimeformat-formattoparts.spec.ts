import {createTestPage} from '../../testing';
import HTMLIntlRelativeTimeFormatFormatToPartsElement from './relativetimeformat-formattoparts';

describe('intl-relativetimeformat-formattoparts', () => {
  it('has `value` property the same as Intl API result', async () => {
    await createTestPage({
      elements: ['intl-relativetimeformat', 'intl-relativetimeformat-formattoparts'],
      html: `
        <intl-relativetimeformat locales="en">
          <intl-relativetimeformat-formattoparts>
            <data value="10"></data>
            <data value="year"></data>
          </intl-relativetimeformat-formattoparts>
        </intl-relativetimeformat>
      `,
    });
    const el = document.querySelector('intl-relativetimeformat-formattoparts') as HTMLIntlRelativeTimeFormatFormatToPartsElement;
    const intlResult = new Intl.RelativeTimeFormat('en').formatToParts(10, 'year');

    expect(el!.value).toEqual(intlResult);
  });

  it('has `value` property the same as its text content', async () => {
    await createTestPage({
      elements: ['intl-relativetimeformat', 'intl-relativetimeformat-formattoparts'],
      html: `
        <intl-relativetimeformat locales="en">
          <intl-relativetimeformat-formattoparts>
            <data value="10"></data>
            <data value="year"></data>
          </intl-relativetimeformat-formattoparts>
        </intl-relativetimeformat>
      `,
    });
    const el = document.querySelector('intl-relativetimeformat-formattoparts') as HTMLIntlRelativeTimeFormatFormatToPartsElement;
    const shadow = el.shadowRoot! as ShadowRoot;
    const span = shadow.querySelector('span') as HTMLSpanElement;

    expect(span).toHaveTextContent(el.value.map(part => part.value).join(''));
  });

  it('renders an empty string and has `value` as an empty array with invalid data', async () => {
    await createTestPage({
      elements: ['intl-relativetimeformat', 'intl-relativetimeformat-formattoparts'],
      html: `
        <intl-relativetimeformat locales="en">
          <intl-relativetimeformat-formattoparts>
            <data value="invalid"></data>
            <data value="invalid"></data>
          </intl-relativetimeformat-formattoparts>
        </intl-relativetimeformat>
      `,
    });
    const el = document.querySelector('intl-relativetimeformat-formattoparts') as HTMLIntlRelativeTimeFormatFormatToPartsElement;
    const shadow = el.shadowRoot! as ShadowRoot;
    const span = shadow.querySelector('span') as HTMLSpanElement;

    expect(el.value).toEqual([]);
    expect(span).toHaveTextContent('');
  });

  it.todo('renders Shadow Parts')
});
