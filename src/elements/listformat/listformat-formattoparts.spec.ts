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

  it('adds `lang` and `dir` on the value part element', async () => {
    await createTestPage({
      elements: ['intl-listformat', 'intl-listformat-formattoparts'],
      html: `
        <intl-listformat locales="ar">
          <intl-listformat-formattoparts>
            <data value="foo"></data>
            <data value="bar"></data>
          </intl-listformat-formattoparts>
        </intl-listformat>
      `,
    });
    const el = document.querySelector('intl-listformat-formattoparts') as HTMLIntlListFormatFormatToPartsElement;
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
      elements: ['intl-listformat', 'intl-listformat-formattoparts'],
      html: `
        <intl-listformat locales="ar">
          <intl-listformat-formattoparts>
            <data value="foo"></data>
            <data value="bar"></data>
          </intl-listformat-formattoparts>
        </intl-listformat>
      `,
    });
    const el = document.querySelector('intl-listformat-formattoparts') as HTMLIntlListFormatFormatToPartsElement;
    const srEl = el.shadowRoot!.querySelector('.sr');
    const valueEl = el.shadowRoot!.querySelector('span[part="value"]');

    const intlResult = new Intl.ListFormat('ar').format([
      'foo',
      'bar',
    ]);

    expect(srEl).toHaveTextContent(intlResult);
    expect(valueEl).toHaveAttribute('aria-hidden', 'true');
  });
});
