import {createTestPage} from '../../testing';
import HTMLIntlDateTimeFormatFormatElement from './datetimeformat-format';

describe('intl-datetimeformat-format', () => {
  it('has `value` property the same as Intl API result', async () => {
    await createTestPage({
      elements: ['intl-datetimeformat', 'intl-datetimeformat-format'],
      html: `
        <intl-datetimeformat locales="zh" option-datestyle="long"
            option-timestyle="short">
          <intl-datetimeformat-format>
            <time datetime="1923-10-16"></time>
          </intl-datetimeformat-format>
        </intl-datetimeformat>
      `,
    });
    const el = document.querySelector('intl-datetimeformat-format') as HTMLIntlDateTimeFormatFormatElement;
    const intlResult = new Intl.DateTimeFormat('zh', {
      dateStyle: 'long',
      timeStyle: 'short',
    }).format(new Date('1923-10-16'));

    expect(el!.value).toBe(intlResult);
  });

  it('has `value` property the same as its text content', async () => {
    await createTestPage({
      elements: ['intl-datetimeformat', 'intl-datetimeformat-format'],
      html: `
        <intl-datetimeformat locales="en">
          <intl-datetimeformat-format>
            <time datetime="1923-10-16"></time>
          </intl-datetimeformat-format>
        </intl-datetimeformat>
      `,
    });
    const el = document.querySelector('intl-datetimeformat-format') as HTMLIntlDateTimeFormatFormatElement;
    const shadow = el.shadowRoot! as ShadowRoot;
    const span = shadow.querySelector('span') as HTMLSpanElement;

    expect(span).toHaveTextContent(el.value);
  });

  it('hides slotted contents', async () => {
    await createTestPage({
      elements: ['intl-datetimeformat', 'intl-datetimeformat-format'],
      html: `
        <intl-datetimeformat locales="en">
          <intl-datetimeformat-format>
            <time datetime="1923-10-16"></time>
          </intl-datetimeformat-format>
        </intl-datetimeformat>
      `,
    });
    const el = document.querySelector('intl-datetimeformat-format') as HTMLIntlDateTimeFormatFormatElement;
    const span = el.shadowRoot?.querySelector('span[hidden]') as HTMLSlotElement;

    expect(span!).not.toBeVisible();
  });

  it('renders an empty string without a valid date', async () => {
    await createTestPage({
      elements: ['intl-datetimeformat', 'intl-datetimeformat-format'],
      html: `
        <intl-datetimeformat locales="en">
          <intl-datetimeformat-format>
            <time datetime="invalid"></time>
          </intl-datetimeformat-format>
          <intl-datetimeformat-format>
            <time></time>
          </intl-datetimeformat-format>
        </intl-datetimeformat>
      `,
    });
    const els = document.querySelectorAll('intl-datetimeformat-format') as NodeListOf<HTMLIntlDateTimeFormatFormatElement>;

    expect(els[0]!.value).toBe('');
    expect(els[0]!.shadowRoot!.querySelector('span')).toHaveTextContent('');
    expect(els[1]!.value).toBe('');
    expect(els[1]!.shadowRoot!.querySelector('span')).toHaveTextContent('');
  });

  it('renders Shadow Parts', async () => {
    await createTestPage({
      elements: ['intl-datetimeformat', 'intl-datetimeformat-format'],
      html: `
        <intl-datetimeformat locales="zh" option-datestyle="long"
            option-timestyle="short">
          <intl-datetimeformat-format>
            <time datetime="1923-10-16"></time>
          </intl-datetimeformat-format>
        </intl-datetimeformat>
      `,
    });
    const el = document.querySelector('intl-datetimeformat-format') as HTMLIntlDateTimeFormatFormatElement;

    expect(el).toHaveShadowPartsCount('value', 1);
    expect(el).not.toHaveShadowPart('literal');
    expect(el).not.toHaveShadowPart('year');
    expect(el).not.toHaveShadowPart('month');
    expect(el).not.toHaveShadowPart('day');
    expect(el).not.toHaveShadowPart('hour');
    expect(el).not.toHaveShadowPart('minute');
    expect(el).not.toHaveShadowPart('second');
    expect(el).not.toHaveShadowPart('time-zone-name');
  });
  
  it('adds `lang` and `dir` on the value part element', async () => {
    await createTestPage({
      elements: ['intl-datetimeformat', 'intl-datetimeformat-format'],
      html: `
        <intl-datetimeformat locales="ar" option-style="currency"
            option-currency="CNY">
          <intl-datetimeformat-format>
            <time datetime="1923-10-16"></time>
          </intl-datetimeformat-format>
        </intl-datetimeformat>
      `,
    });
    const el = document.querySelector('intl-datetimeformat-format') as HTMLIntlDateTimeFormatFormatElement;
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
