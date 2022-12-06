import {createTestPage} from '../../testing';
import HTMLIntlDisplayNamesOfElement from './displaynames-of';

describe('intl-displaynames-of', () => {
  it('renders `<span>` elements with `role="none"`', async () => {
    await createTestPage({
      elements: ['intl-displaynames', 'intl-displaynames-of'],
      html: `
        <intl-displaynames locales="en">
          <intl-displaynames-of>
            <data value="zh"></data>
          </intl-displaynames-of>
        </intl-displaynames>
      `,
    });
    const el = document.querySelector('intl-displaynames-of') as HTMLIntlDisplayNamesOfElement;
    const shadow = el.shadowRoot as ShadowRoot;
    const span = shadow.querySelector('span');

    expect(span).toHaveAttribute('role', 'none');
  });

  it('has `value` property the same as its text content', async () => {
    await createTestPage({
      elements: ['intl-displaynames', 'intl-displaynames-of'],
      html: `
        <intl-displaynames locales="en">
          <intl-displaynames-of>
            <data value="ja"></data>
          </intl-displaynames-of>
        </intl-displaynames>
      `,
    });
    const el = document.querySelector('intl-displaynames-of') as HTMLIntlDisplayNamesOfElement;
    const span = el.shadowRoot!.querySelector('span');

    expect(span).toHaveTextContent(el.value);
  });

  it('handles case-insensitive region subtags', async () => {
    await createTestPage({
      elements: ['intl-displaynames', 'intl-displaynames-of'],
      html: `
        <intl-displaynames locales="ar" option-type="region">
          <intl-displaynames-of><data value="jp"></data></intl-displaynames-of>
          <intl-displaynames-of><data value="JP"></data></intl-displaynames-of>
          <intl-displaynames-of><data value="jP"></data></intl-displaynames-of>
          <intl-displaynames-of><data value="Jp"></data></intl-displaynames-of>
        </intl-displaynames>
      `
    });

    const els = document.querySelectorAll('intl-displaynames-of') as NodeListOf<HTMLIntlDisplayNamesOfElement>;
    const intlResult = new Intl.DisplayNames(['ar'], {
      type: 'region',
    }).of('JP');

    expect(els[0]!.value).toBe(intlResult);
    expect(els[1]!.value).toBe(intlResult);
    expect(els[2]!.value).toBe(intlResult);
    expect(els[3]!.value).toBe(intlResult);
  });

  it('hides slotted contents', async () => {
    await createTestPage({
      elements: ['intl-displaynames', 'intl-displaynames-of'],
      html: `
        <intl-displaynames locales="en">
          <intl-displaynames-of>
            <data value="ja"></data>
          </intl-displaynames-of>
        </intl-displaynames>
      `,
    });
    const el = document.querySelector('intl-displaynames-of') as HTMLIntlDisplayNamesOfElement;
    const span = el.shadowRoot?.querySelector('span[hidden]') as HTMLSlotElement;

    expect(span!).not.toBeVisible();
  });

  it('renders an empty string if no data provided', async () => {
    await createTestPage({
      elements: ['intl-displaynames', 'intl-displaynames-of'],
      html: `
        <intl-displaynames locales="en">
          <intl-displaynames-of></intl-displaynames-of>
        </intl-displaynames>
      `,
    });
    const el = document.querySelector('intl-displaynames-of') as HTMLIntlDisplayNamesOfElement;
    const span = el.shadowRoot!.querySelector('span');

    expect(span).toHaveTextContent('');
  });

  it('renders an empty string if the data is invalid', async () => {
    await createTestPage({
      elements: ['intl-displaynames', 'intl-displaynames-of'],
      html: `
        <intl-displaynames locales="en">
          <intl-displaynames-of><data value="$invalid"></data></intl-displaynames-of>
        </intl-displaynames>
      `,
    });
    const el = document.querySelector('intl-displaynames-of') as HTMLIntlDisplayNamesOfElement;
    const span = el.shadowRoot!.querySelector('span');

    expect(span).toHaveTextContent('');
  });

  it('renders an empty string if the data is not supported', async () => {
    await createTestPage({
      elements: ['intl-displaynames', 'intl-displaynames-of'],
      html: `
        <intl-displaynames locales="en" option-fallback="none">
          <intl-displaynames-of><data value="zz"></data></intl-displaynames-of>
        </intl-displaynames>
      `,
    });
    const el = document.querySelector('intl-displaynames-of') as HTMLIntlDisplayNamesOfElement;
    const span = el.shadowRoot!.querySelector('span');

    expect(span).toHaveTextContent('');
  });

  it('renders Shadow Parts', async () => {
    await createTestPage({
      elements: ['intl-displaynames', 'intl-displaynames-of'],
      html: `
        <intl-displaynames locales="en">
          <intl-displaynames-of>
            <data value="zh"></data>
          </intl-displaynames-of>
        </intl-displaynames>
      `,
    });
    const el = document.querySelector('intl-displaynames-of') as HTMLIntlDisplayNamesOfElement;

    expect(el).toHaveShadowPart('value');
  });
});
