import {createTestPage} from '../../testing';
import HTMLIntlNumberFormatFormatToPartsElement from './numberformat-formattoparts';

describe('intl-numberformat-formattoparts', () => {
  it('has `value` property the same as Intl API result', async () => {
    await createTestPage({
      elements: ['intl-numberformat', 'intl-numberformat-formattoparts'],
      html: `
        <intl-numberformat locales="de" option-style="unit"
            option-unit="year">
          <intl-numberformat-formattoparts>
            Amount: <data value="10.15"></data>
          </intl-numberformat-formattoparts>
        </intl-numberformat>
      `,
    });
    const el = document.querySelector('intl-numberformat-formattoparts') as HTMLIntlNumberFormatFormatToPartsElement;
    const intlResult = new Intl.NumberFormat('de', {
      style: 'unit',
      unit: 'year',
    }).formatToParts(10.15);

    expect(el!.value).toEqual(intlResult);
  });

  it.todo('renders when number is 0');

  it('hides slotted contents', async () => {
    await createTestPage({
      elements: ['intl-numberformat', 'intl-numberformat-formattoparts'],
      html: `
        <intl-numberformat locales="en">
          <intl-numberformat-formattoparts>
            <data value="10"></data>
          </intl-numberformat-formattoparts>
        </intl-numberformat>
      `,
    });
    const el = document.querySelector('intl-numberformat-formattoparts') as HTMLIntlNumberFormatFormatToPartsElement;
    const span = el.shadowRoot?.querySelector('span[hidden]') as HTMLSlotElement;

    expect(span!).not.toBeVisible();
  });

  it('has `value` property the same as its text content', async () => {
    await createTestPage({
      elements: ['intl-numberformat', 'intl-numberformat-formattoparts'],
      html: `
        <intl-numberformat locales="en">
          <intl-numberformat-formattoparts>
            Amount: <data value="10"></data>
          </intl-numberformat-formattoparts>
        </intl-numberformat>
      `,
    });
    const el = document.querySelector('intl-numberformat-formattoparts') as HTMLIntlNumberFormatFormatToPartsElement;
    const shadow = el.shadowRoot! as ShadowRoot;
    const span = shadow.querySelector('span') as HTMLSpanElement;

    expect(span).toHaveTextContent(el.value.map(part => part.value).join(''));
  });

  it('renders an empty string and has `value` as an empty array with invalid data', async () => {
    await createTestPage({
      elements: ['intl-numberformat', 'intl-numberformat-formattoparts'],
      html: `
        <intl-numberformat locales="en">
          <intl-numberformat-formattoparts>
            <data value="invalid"></data>
          </intl-numberformat-formattoparts>
          <intl-numberformat-formattoparts>
            <data></data>
          </intl-numberformat-formattoparts>
        </intl-numberformat>
      `,
    });
    const els = document.querySelectorAll('intl-numberformat-formattoparts') as NodeListOf<HTMLIntlNumberFormatFormatToPartsElement>;

    expect(els[0]!.value).toEqual([]);
    expect(els[0]!.shadowRoot!.querySelector('span')).toHaveTextContent('');
    expect(els[1]!.value).toEqual([]);
    expect(els[1]!.shadowRoot!.querySelector('span')).toHaveTextContent('');
  });

  it('renders Shadow Parts', async () => {
    await createTestPage({
      elements: ['intl-numberformat', 'intl-numberformat-formattoparts'],
      html: `
        <intl-numberformat locales="zh" option-style="unit"
            option-unit="kilometer">
          <intl-numberformat-formattoparts>
            Amount: <data value="-100000.5"></data>
          </intl-numberformat-formattoparts>
        </intl-numberformat>
      `,
    });
    const el = document.querySelector('intl-numberformat-formattoparts') as HTMLIntlNumberFormatFormatToPartsElement;

    expect(el).toHaveShadowPartsCount('value', 1);
    expect(el).toHaveShadowPartsCount('integer', 2);
    expect(el).toHaveShadowPartsCount('decimal', 1);
    expect(el).toHaveShadowPartsCount('fraction', 1);
    expect(el).toHaveShadowPartsCount('unit', 1);
    expect(el).toHaveShadowPartsCount('minus-sign', 1);
    expect(el).toHaveShadowPartsCount('group', 1);
  });
  
  it('adds `lang` and `dir` on the value part element', async () => {
    await createTestPage({
      elements: ['intl-numberformat', 'intl-numberformat-formattoparts'],
      html: `
        <intl-numberformat locales="ar" option-style="unit"
            option-unit="kilometer">
          <intl-numberformat-formattoparts>
            Amount: <data value="-100000.5"></data>
          </intl-numberformat-formattoparts>
        </intl-numberformat>
      `,
    });
    const el = document.querySelector('intl-numberformat-formattoparts') as HTMLIntlNumberFormatFormatToPartsElement;
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
});
