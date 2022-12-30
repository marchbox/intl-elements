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

  it('hides slotted contents', async () => {
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
    const span = el.shadowRoot?.querySelector('span[hidden]') as HTMLSlotElement;

    expect(span!).not.toBeVisible();
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

  it('renders Shadow Parts', async () => {
    await createTestPage({
      elements: ['intl-relativetimeformat', 'intl-relativetimeformat-formattoparts'],
      html: `
        <intl-relativetimeformat locales="en">
          <intl-relativetimeformat-formattoparts>
            <data value="10.5"></data>
            <data value="year"></data>
          </intl-relativetimeformat-formattoparts>
        </intl-relativetimeformat>
      `,
    });
    const el = document.querySelector('intl-relativetimeformat-formattoparts') as HTMLIntlRelativeTimeFormatFormatToPartsElement;

    expect(el).toHaveShadowPartsCount('value', 1);
    expect(el).toHaveShadowPartsCount('literal', 2);
    expect(el).toHaveShadowPartsCount('integer', 1);
    expect(el).toHaveShadowPartsCount('decimal', 1);
    expect(el).toHaveShadowPartsCount('fraction', 1);
  });
  
  it('adds `lang` and `dir` on the value part element', async () => {
    await createTestPage({
      elements: ['intl-relativetimeformat', 'intl-relativetimeformat-formattoparts'],
      html: `
        <intl-relativetimeformat locales="ar">
          <intl-relativetimeformat-formattoparts>
            <data value="10.5"></data>
            <data value="year"></data>
          </intl-relativetimeformat-formattoparts>
        </intl-relativetimeformat>
      `,
    });
    const el = document.querySelector('intl-relativetimeformat-formattoparts') as HTMLIntlRelativeTimeFormatFormatToPartsElement;
    const span = el.shadowRoot!.querySelector('span');

    expect(span).toHaveAttribute('lang', 'ar');
    expect(span).toHaveAttribute('dir', 'rtl');

    el.providerElement!.locales = 'en';
    await el.updateComplete;
    await el.updateComplete;

    expect(span).toHaveAttribute('lang', 'en');
    expect(span).not.toHaveAttribute('dir');

    el.providerElement!.locales = '$invalid';
    await el.updateComplete;
    await el.updateComplete;

    expect(span).not.toHaveAttribute('lang');
    expect(span).not.toHaveAttribute('dir');
  });

  it('renders screen reader text', async () => {
    await createTestPage({
      elements: ['intl-relativetimeformat', 'intl-relativetimeformat-formattoparts'],
      html: `
        <intl-relativetimeformat locales="ar">
          <intl-relativetimeformat-formattoparts>
            <data value="10.5"></data>
            <data value="year"></data>
          </intl-relativetimeformat-formattoparts>
        </intl-relativetimeformat>
      `,
    });
    const el = document.querySelector('intl-relativetimeformat-formattoparts') as HTMLIntlRelativeTimeFormatFormatToPartsElement;
    const srEl = el.shadowRoot!.querySelector('.sr');
    const valueEl = el.shadowRoot!.querySelector('span[part="value"]');

    const intlResult = new Intl.RelativeTimeFormat('ar').format(10.5, 'year');

    expect(srEl).toHaveTextContent(intlResult);
    expect(valueEl).toHaveAttribute('aria-hidden', 'true');
  });
});
