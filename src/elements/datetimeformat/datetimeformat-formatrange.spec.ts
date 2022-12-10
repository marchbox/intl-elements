import {createTestPage} from '../../testing';
import HTMLIntlDateTimeFormatFormatRangeElement from './datetimeformat-formatrange';

describe('intl-datetimeformat-formatrange', () => {
  it('has `value` property the same as Intl API result', async () => {
    await createTestPage({
      elements: ['intl-datetimeformat', 'intl-datetimeformat-formatrange'],
      html: `
        <intl-datetimeformat locales="zh" option-datestyle="long"
            option-timestyle="short">
          <intl-datetimeformat-formatrange>
            <time datetime="1964-08-27"></time>
            <time datetime="1989-11-17"></time>
          </intl-datetimeformat-formatrange>
        </intl-datetimeformat>
      `,
    });
    const el = document.querySelector('intl-datetimeformat-formatrange') as HTMLIntlDateTimeFormatFormatRangeElement;
    const intlResult = new Intl.DateTimeFormat('zh', {
      dateStyle: 'long',
      timeStyle: 'short',
    // @ts-ignore
    }).formatRange(new Date('1964-08-27'), new Date('1989-11-17'));

    expect(el!.value).toBe(intlResult);
  });

  it('has `value` property the same as its text content', async () => {
    await createTestPage({
      elements: ['intl-datetimeformat', 'intl-datetimeformat-formatrange'],
      html: `
        <intl-datetimeformat locales="en">
          <intl-datetimeformat-formatrange>
            <time datetime="1964-08-27"></time>
            <time datetime="1989-11-17"></time>
          </intl-datetimeformat-formatrange>
        </intl-datetimeformat>
      `,
    });
    const el = document.querySelector('intl-datetimeformat-formatrange') as HTMLIntlDateTimeFormatFormatRangeElement;
    const shadow = el.shadowRoot! as ShadowRoot;
    const span = shadow.querySelector('span') as HTMLSpanElement;

    expect(span).toHaveTextContent(el.value);
  });

  it('hides slotted contents', async () => {
    await createTestPage({
      elements: ['intl-datetimeformat', 'intl-datetimeformat-formatrange'],
      html: `
        <intl-datetimeformat locales="en">
          <intl-datetimeformat-formatrange>
            <time datetime="1964-08-27"></time>
            <time datetime="1989-11-17"></time>
          </intl-datetimeformat-formatrange>
        </intl-datetimeformat>
      `,
    });
    const el = document.querySelector('intl-datetimeformat-formatrange') as HTMLIntlDateTimeFormatFormatRangeElement;
    const span = el.shadowRoot?.querySelector('span[hidden]') as HTMLSlotElement;

    expect(span!).not.toBeVisible();
  });

  it('renders an empty string without both dates being valid', async () => {
    await createTestPage({
      elements: ['intl-datetimeformat', 'intl-datetimeformat-formatrange'],
      html: `
        <intl-datetimeformat locales="en">
          <intl-datetimeformat-formatrange>
            <time datetime="invalid"></time>
            <time datetime="invalid"></time>
          </intl-datetimeformat-formatrange>
          <intl-datetimeformat-formatrange>
            <time></time>
            <time></time>
          </intl-datetimeformat-formatrange>
          <intl-datetimeformat-formatrange>
            <time slot="start"></time>
            <time slot="end"></time>
          </intl-datetimeformat-formatrange>
          <intl-datetimeformat-formatrange>
            <time slot="start"></time>
            <time slot="end" datetime="1923-10-16"></time>
          </intl-datetimeformat-formatrange>
        </intl-datetimeformat>
      `,
    });
    const els = document.querySelectorAll('intl-datetimeformat-formatrange') as NodeListOf<HTMLIntlDateTimeFormatFormatRangeElement>;

    expect(els[0]!.value).toBe('');
    expect(els[0]!.shadowRoot!.querySelector('span')).toHaveTextContent('');
    expect(els[1]!.value).toBe('');
    expect(els[1]!.shadowRoot!.querySelector('span')).toHaveTextContent('');
    expect(els[2]!.value).toBe('');
    expect(els[2]!.shadowRoot!.querySelector('span')).toHaveTextContent('');
    expect(els[3]!.value).toBe('');
    expect(els[3]!.shadowRoot!.querySelector('span')).toHaveTextContent('');
  });

  it('renders Shadow Parts', async () => {
    await createTestPage({
      elements: ['intl-datetimeformat', 'intl-datetimeformat-formatrange'],
      html: `
        <intl-datetimeformat locales="zh" option-datestyle="long"
            option-timestyle="short">
          <intl-datetimeformat-formatrange>
            <time slot="start" datetime="1964-08-27"></time>
            <time slot="end" datetime="1989-11-17"></time>
          </intl-datetimeformat-formatrange>
        </intl-datetimeformat>
      `,
    });
    const el = document.querySelector('intl-datetimeformat-formatrange') as HTMLIntlDateTimeFormatFormatRangeElement;

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
      elements: ['intl-datetimeformat', 'intl-datetimeformat-formatrange'],
      html: `
        <intl-datetimeformat locales="ar" option-style="currency"
            option-currency="CNY">
          <intl-datetimeformat-formatrange>
            <time slot="start" datetime="1964-08-27"></time>
            <time slot="end" datetime="1989-11-17"></time>
          </intl-datetimeformat-formatrange>
        </intl-datetimeformat>
      `,
    });
    const el = document.querySelector('intl-datetimeformat-formatrange') as HTMLIntlDateTimeFormatFormatRangeElement;
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
