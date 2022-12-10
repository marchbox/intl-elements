import {createTestPage} from '../../testing';
import HTMLIntlNumberFormatFormatElement from './numberformat-format';

describe('intl-numberformat-format', () => {
  it('has `value` property the same as Intl API result', async () => {
    await createTestPage({
      elements: ['intl-numberformat', 'intl-numberformat-format'],
      html: `
        <intl-numberformat locales="zh" option-style="currency"
            option-currency="cny">
          <intl-numberformat-format>
            Amount: <data value="10"></data>
          </intl-numberformat-format>
        </intl-numberformat>
      `,
    });
    const el = document.querySelector('intl-numberformat-format') as HTMLIntlNumberFormatFormatElement;
    const intlResult = new Intl.NumberFormat('zh', {
      style: 'currency',
      currency: 'cny',
    }).format(10);

    expect(el!.value).toBe(intlResult);
  });

  it('has `value` property the same as its text content', async () => {
    await createTestPage({
      elements: ['intl-numberformat', 'intl-numberformat-format'],
      html: `
        <intl-numberformat locales="en">
          <intl-numberformat-format>
            <data value="10"></data>
          </intl-numberformat-format>
        </intl-numberformat>
      `,
    });
    const el = document.querySelector('intl-numberformat-format') as HTMLIntlNumberFormatFormatElement;
    const shadow = el.shadowRoot! as ShadowRoot;
    const span = shadow.querySelector('span') as HTMLSpanElement;

    expect(span).toHaveTextContent(el.value);
  });

  it.todo('renders when number is 0');

  it('hides slotted contents', async () => {
    await createTestPage({
      elements: ['intl-numberformat', 'intl-numberformat-format'],
      html: `
        <intl-numberformat locales="en">
          <intl-numberformat-format>
            <data value="10"></data>
          </intl-numberformat-format>
        </intl-numberformat>
      `,
    });
    const el = document.querySelector('intl-numberformat-format') as HTMLIntlNumberFormatFormatElement;
    const span = el.shadowRoot?.querySelector('span[hidden]') as HTMLSlotElement;

    expect(span!).not.toBeVisible();
  });

  it('renders an empty string without a valid number', async () => {
    await createTestPage({
      elements: ['intl-numberformat', 'intl-numberformat-format'],
      html: `
        <intl-numberformat locales="en">
          <intl-numberformat-format>
            <data value="invalid"></data>
          </intl-numberformat-format>
          <intl-numberformat-format>
            <data></data>
          </intl-numberformat-format>
        </intl-numberformat>
      `,
    });
    const els = document.querySelectorAll('intl-numberformat-format') as NodeListOf<HTMLIntlNumberFormatFormatElement>;

    expect(els[0]!.value).toBe('');
    expect(els[0]!.shadowRoot!.querySelector('span')).toHaveTextContent('');
    expect(els[1]!.value).toBe('');
    expect(els[1]!.shadowRoot!.querySelector('span')).toHaveTextContent('');
  });

  it('renders Shadow Parts', async () => {
    await createTestPage({
      elements: ['intl-numberformat', 'intl-numberformat-format'],
      html: `
        <intl-numberformat locales="zh" option-style="currency"
            option-currency="CNY">
          <intl-numberformat-format>
            <data value="-10.34"></data>
          </intl-numberformat-format>
        </intl-numberformat>
      `,
    });
    const el = document.querySelector('intl-numberformat-format') as HTMLIntlNumberFormatFormatElement;

    expect(el).toHaveShadowPartsCount('value', 1);
    expect(el).not.toHaveShadowPart('literal');
    expect(el).not.toHaveShadowPart('integer');
    expect(el).not.toHaveShadowPart('decimal');
    expect(el).not.toHaveShadowPart('fraction');
  });
  
  it('adds `lang` and `dir` on the value part element', async () => {
    await createTestPage({
      elements: ['intl-numberformat', 'intl-numberformat-format'],
      html: `
        <intl-numberformat locales="ar" option-style="currency"
            option-currency="CNY">
          <intl-numberformat-format>
            <data value="-10.34"></data>
          </intl-numberformat-format>
        </intl-numberformat>
      `,
    });
    const el = document.querySelector('intl-numberformat-format') as HTMLIntlNumberFormatFormatElement;
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
