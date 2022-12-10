import {createTestPage} from '../../testing';
import HTMLIntlDateTimeFormatFormatToPartsElement from './datetimeformat-formattoparts';

describe('intl-datetimeformat-formattoparts', () => {
  it('has `value` property the same as Intl API result', async () => {
    await createTestPage({
      elements: ['intl-datetimeformat', 'intl-datetimeformat-formattoparts'],
      html: `
        <intl-datetimeformat locales="de" option-datestyle="long"
            option-timestyle="long">
          <intl-datetimeformat-formattoparts>
            <time datetime="1923-10-16"></time>
          </intl-datetimeformat-formattoparts>
        </intl-datetimeformat>
      `,
    });
    const el = document.querySelector('intl-datetimeformat-formattoparts') as HTMLIntlDateTimeFormatFormatToPartsElement;
    const intlResult = new Intl.DateTimeFormat('de', {
      dateStyle: 'long',
      timeStyle: 'long',
    }).formatToParts(new Date('1923-10-16'));

    expect(el!.value).toEqual(intlResult);
  });

  it('hides slotted contents', async () => {
    await createTestPage({
      elements: ['intl-datetimeformat', 'intl-datetimeformat-formattoparts'],
      html: `
        <intl-datetimeformat locales="en">
          <intl-datetimeformat-formattoparts>
            <time datetime="1923-10-16"></time>
          </intl-datetimeformat-formattoparts>
        </intl-datetimeformat>
      `,
    });
    const el = document.querySelector('intl-datetimeformat-formattoparts') as HTMLIntlDateTimeFormatFormatToPartsElement;
    const span = el.shadowRoot?.querySelector('span[hidden]') as HTMLSlotElement;

    expect(span!).not.toBeVisible();
  });

  it('has `value` property the same as its text content', async () => {
    await createTestPage({
      elements: ['intl-datetimeformat', 'intl-datetimeformat-formattoparts'],
      html: `
        <intl-datetimeformat locales="en">
          <intl-datetimeformat-formattoparts>
            <time datetime="1923-10-16"></time>
          </intl-datetimeformat-formattoparts>
        </intl-datetimeformat>
      `,
    });
    const el = document.querySelector('intl-datetimeformat-formattoparts') as HTMLIntlDateTimeFormatFormatToPartsElement;
    const shadow = el.shadowRoot! as ShadowRoot;
    const span = shadow.querySelector('span') as HTMLSpanElement;

    expect(span).toHaveTextContent(el.value.map(part => part.value).join(''));
  });

  it('renders an empty string and has `value` as an empty array with invalid data', async () => {
    await createTestPage({
      elements: ['intl-datetimeformat', 'intl-datetimeformat-formattoparts'],
      html: `
        <intl-datetimeformat locales="en">
          <intl-datetimeformat-formattoparts>
            <time datetime="invalid"></time>
          </intl-datetimeformat-formattoparts>
          <intl-datetimeformat-formattoparts>
            <time></time>
          </intl-datetimeformat-formattoparts>
        </intl-datetimeformat>
      `,
    });
    const els = document.querySelectorAll('intl-datetimeformat-formattoparts') as NodeListOf<HTMLIntlDateTimeFormatFormatToPartsElement>;

    expect(els[0]!.value).toEqual([]);
    expect(els[0]!.shadowRoot!.querySelector('span')).toHaveTextContent('');
    expect(els[1]!.value).toEqual([]);
    expect(els[1]!.shadowRoot!.querySelector('span')).toHaveTextContent('');
  });

  it('renders Shadow Parts', async () => {
    await createTestPage({
      elements: ['intl-datetimeformat', 'intl-datetimeformat-formattoparts'],
      html: `
        <intl-datetimeformat locales="zh" option-datestyle="long"
            option-timestyle="long">
          <intl-datetimeformat-formattoparts>
            <time datetime="1923-10-16"></time>
          </intl-datetimeformat-formattoparts>
        </intl-datetimeformat>
      `,
    });
    const el = document.querySelector('intl-datetimeformat-formattoparts') as HTMLIntlDateTimeFormatFormatToPartsElement;

    expect(el).toHaveShadowPartsCount('value', 1);
    expect(el).toHaveShadowPartsCount('literal', 6);
    expect(el).toHaveShadowPartsCount('year', 1);
    expect(el).toHaveShadowPartsCount('month', 1);
    expect(el).toHaveShadowPartsCount('day', 1);
    expect(el).toHaveShadowPartsCount('hour', 1);
    expect(el).toHaveShadowPartsCount('minute', 1);
    expect(el).toHaveShadowPartsCount('second', 1);
    expect(el).toHaveShadowPartsCount('time-zone-name', 1);
  });
  
  it('adds `lang` and `dir` on the value part element', async () => {
    await createTestPage({
      elements: ['intl-datetimeformat', 'intl-datetimeformat-formattoparts'],
      html: `
        <intl-datetimeformat locales="ar" option-datestyle="long"
            option-unit="kilometer">
          <intl-datetimeformat-formattoparts>
            <time datetime="1923-10-16"></time>
          </intl-datetimeformat-formattoparts>
        </intl-datetimeformat>
      `,
    });
    const el = document.querySelector('intl-datetimeformat-formattoparts') as HTMLIntlDateTimeFormatFormatToPartsElement;
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
