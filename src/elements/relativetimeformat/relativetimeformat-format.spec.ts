import {createTestPage} from '../../testing';
import HTMLIntlRelativeTimeFormatFormatElement from './relativetimeformat-format';

describe('intl-relativetimeformat-format', () => {
  it('has `value` property the same as Intl API result', async () => {
    await createTestPage({
      elements: ['intl-relativetimeformat', 'intl-relativetimeformat-format'],
      html: `
        <intl-relativetimeformat locales="en">
          <intl-relativetimeformat-format>
            <data value="10"></data>
            <data value="year"></data>
          </intl-relativetimeformat-format>
        </intl-relativetimeformat>
      `,
    });
    const el = document.querySelector('intl-relativetimeformat-format') as HTMLIntlRelativeTimeFormatFormatElement;
    const intlResult = new Intl.RelativeTimeFormat('en').format(10, 'year');

    expect(el!.value).toBe(intlResult);
  });

  it('has `value` property the same as its text content', async () => {
    await createTestPage({
      elements: ['intl-relativetimeformat', 'intl-relativetimeformat-format'],
      html: `
        <intl-relativetimeformat locales="en">
          <intl-relativetimeformat-format>
            <data value="10"></data>
            <data value="year"></data>
          </intl-relativetimeformat-format>
        </intl-relativetimeformat>
      `,
    });
    const el = document.querySelector('intl-relativetimeformat-format') as HTMLIntlRelativeTimeFormatFormatElement;
    const shadow = el.shadowRoot! as ShadowRoot;
    const span = shadow.querySelector('span') as HTMLSpanElement;

    expect(span).toHaveTextContent(el.value);
  });

  it('hides slotted contents', async () => {
    await createTestPage({
      elements: ['intl-relativetimeformat', 'intl-relativetimeformat-format'],
      html: `
        <intl-relativetimeformat locales="en">
          <intl-relativetimeformat-format>
            <data value="10"></data>
            <data value="year"></data>
          </intl-relativetimeformat-format>
        </intl-relativetimeformat>
      `,
    });
    const el = document.querySelector('intl-relativetimeformat-format') as HTMLIntlRelativeTimeFormatFormatElement;
    const span = el.shadowRoot?.querySelector('span[hidden]') as HTMLSlotElement;

    expect(span!).not.toBeVisible();
  });

  it('renders an empty string', async () => {
    await createTestPage({
      elements: ['intl-relativetimeformat', 'intl-relativetimeformat-format'],
      html: `
        <intl-relativetimeformat locales="en">
          <intl-relativetimeformat-format>
            <data value="invalid"></data>
            <data value="invalid"></data>
          </intl-relativetimeformat-format>
        </intl-relativetimeformat>
      `,
    });
    const el = document.querySelector('intl-relativetimeformat-format') as HTMLIntlRelativeTimeFormatFormatElement;
    const shadow = el.shadowRoot! as ShadowRoot;
    const span = shadow.querySelector('span') as HTMLSpanElement;

    expect(el.value).toBe('');
    expect(span).toHaveTextContent('');
  });

  it('renders Shadow Parts', async () => {
    await createTestPage({
      elements: ['intl-relativetimeformat', 'intl-relativetimeformat-format'],
      html: `
        <intl-relativetimeformat locales="en">
          <intl-relativetimeformat-format>
            <data value="10"></data>
            <data value="year"></data>
          </intl-relativetimeformat-format>
        </intl-relativetimeformat>
      `,
    });
    const el = document.querySelector('intl-relativetimeformat-format') as HTMLIntlRelativeTimeFormatFormatElement;

    expect(el).toHaveShadowPartsCount('value', 1);
    expect(el).not.toHaveShadowPart('literal');
    expect(el).not.toHaveShadowPart('integer');
    expect(el).not.toHaveShadowPart('decimal');
    expect(el).not.toHaveShadowPart('fraction');
  });
});
