import {createTestPage} from '../../testing';
import HTMLIntlRelativeTimeFormatElement from './relativetimeformat';
import HTMLIntlRelativeTimeFormatFormatElement from './relativetimeformat-format';

describe('intl-relativetimeformat', () => {
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

    expect(el!.value).toBe(span.textContent?.trim());
  });

  it('returns correct resolved options', async () => {
    await createTestPage({
      elements: ['intl-relativetimeformat'],
      html: `
        <intl-relativetimeformat locales="de">
        </intl-relativetimeformat>
      `,
    });
    const el = document.querySelector('intl-relativetimeformat') as HTMLIntlRelativeTimeFormatElement;

    const intlResult = new Intl.RelativeTimeFormat('de').resolvedOptions();

    expect(el.resolvedOptions()).toEqual(intlResult);
  });
});
