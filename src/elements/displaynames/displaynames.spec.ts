import {createTestPage} from '../../testing';
import HTMLIntlDisplayNamesElement from './displaynames';
import HTMLIntlDisplayNamesOfElement from './displaynames-of';

describe('intl-displaynames', () => {
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
    const spans = shadow.querySelectorAll('span');

    for (const span of spans) {
      expect(span.getAttribute('role')).toBe('none');
    }
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

    expect(span?.textContent?.trim()).toBe(el.value);
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

  it('returns correct resolved options', async () => {
    await createTestPage({
      elements: ['intl-displaynames'],
      html: `
        <intl-displaynames
          locales="en"
          option-type="region"
          option-style="narrow"
          option-fallback="code"
        ></intl-displaynames>
      `,
    });
    const el = document.querySelector('intl-displaynames') as HTMLIntlDisplayNamesElement;

    const intlResult = new Intl.DisplayNames('en', {
      type: 'region',
      style: 'narrow',
      fallback: 'code',
    }).resolvedOptions();

    expect(el.resolvedOptions()).toEqual(intlResult);
  });
});
