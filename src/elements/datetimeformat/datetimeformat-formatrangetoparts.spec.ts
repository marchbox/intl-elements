import {createTestPage} from '../../testing';
import HTMLIntlDateTimeFormatFormatRnageToPartsElement from './datetimeformat-formatrangetoparts';

describe('intl-datetimeformat-formatrangetoparts', () => {
  it('has `value` property the same as Intl API result', async () => {
    await createTestPage({
      elements: ['intl-datetimeformat', 'intl-datetimeformat-formatrangetoparts'],
      html: `
        <intl-datetimeformat locales="de" option-datestyle="long"
            option-timestyle="long">
          <intl-datetimeformat-formatrangetoparts>
            <time datetime="1964-08-27"></time>
            <time datetime="1989-11-17"></time>
          </intl-datetimeformat-formatrangetoparts>
        </intl-datetimeformat>
      `,
    });
    const el = document.querySelector('intl-datetimeformat-formatrangetoparts') as HTMLIntlDateTimeFormatFormatRnageToPartsElement;
    const intlResult = new Intl.DateTimeFormat('de', {
      dateStyle: 'long',
      timeStyle: 'long',
    // @ts-ignore
    }).formatRangeToParts(new Date('1964-08-27'), new Date('1989-11-17'));

    expect(el!.value).toEqual(intlResult);
  });

  it('hides slotted contents', async () => {
    await createTestPage({
      elements: ['intl-datetimeformat', 'intl-datetimeformat-formatrangetoparts'],
      html: `
        <intl-datetimeformat locales="en">
          <intl-datetimeformat-formatrangetoparts>
            <time datetime="1964-08-27"></time>
            <time datetime="1989-11-17"></time>
          </intl-datetimeformat-formatrangetoparts>
        </intl-datetimeformat>
      `,
    });
    const el = document.querySelector('intl-datetimeformat-formatrangetoparts') as HTMLIntlDateTimeFormatFormatRnageToPartsElement;
    const span = el.shadowRoot?.querySelector('span[hidden]') as HTMLSlotElement;

    expect(span!).not.toBeVisible();
  });

  it('has `value` property the same as its text content', async () => {
    await createTestPage({
      elements: ['intl-datetimeformat', 'intl-datetimeformat-formatrangetoparts'],
      html: `
        <intl-datetimeformat locales="en">
          <intl-datetimeformat-formatrangetoparts>
            <time datetime="1964-08-27"></time>
            <time datetime="1989-11-17"></time>
          </intl-datetimeformat-formatrangetoparts>
        </intl-datetimeformat>
      `,
    });
    const el = document.querySelector('intl-datetimeformat-formatrangetoparts') as HTMLIntlDateTimeFormatFormatRnageToPartsElement;
    const shadow = el.shadowRoot! as ShadowRoot;
    const span = shadow.querySelector('span') as HTMLSpanElement;

    expect(span).toHaveTextContent(el.value.map(part => part.value).join(''));
  });

  it('renders an empty string and has `value` as an empty array with invalid data', async () => {
    await createTestPage({
      elements: ['intl-datetimeformat', 'intl-datetimeformat-formatrangetoparts'],
      html: `
        <intl-datetimeformat locales="en">
          <intl-datetimeformat-formatrangetoparts>
            <time datetime="invalid"></time>
            <time datetime="invalid"></time>
          </intl-datetimeformat-formatrangetoparts>
          <intl-datetimeformat-formatrangetoparts>
            <time></time>
            <time></time>
          </intl-datetimeformat-formatrangetoparts>
          <intl-datetimeformat-formatrangetoparts>
            <time slot="start"></time>
            <time slot="end"></time>
          </intl-datetimeformat-formatrangetoparts>
          <intl-datetimeformat-formatrangetoparts>
            <time slot="start"></time>
            <time slot="end" datetime="1923-10-16"></time>
          </intl-datetimeformat-formatrangetoparts>
        </intl-datetimeformat>
      `,
    });
    const els = document.querySelectorAll('intl-datetimeformat-formatrangetoparts') as NodeListOf<HTMLIntlDateTimeFormatFormatRnageToPartsElement>;

    expect(els[0]!.value).toEqual([]);
    expect(els[0]!.shadowRoot!.querySelector('span')).toHaveTextContent('');
    expect(els[1]!.value).toEqual([]);
    expect(els[1]!.shadowRoot!.querySelector('span')).toHaveTextContent('');
    expect(els[2]!.value).toEqual([]);
    expect(els[2]!.shadowRoot!.querySelector('span')).toHaveTextContent('');
    expect(els[3]!.value).toEqual([]);
    expect(els[3]!.shadowRoot!.querySelector('span')).toHaveTextContent('');
  });

  it('renders Shadow Parts', async () => {
    await createTestPage({
      elements: ['intl-datetimeformat', 'intl-datetimeformat-formatrangetoparts'],
      html: `
        <intl-datetimeformat locales="zh" option-datestyle="long"
            option-timestyle="long">
          <intl-datetimeformat-formatrangetoparts>
            <time slot="start" datetime="1964-08-27"></time>
            <time slot="end" datetime="1989-11-17"></time>
          </intl-datetimeformat-formatrangetoparts>
        </intl-datetimeformat>
      `,
    });
    const el = document.querySelector('intl-datetimeformat-formatrangetoparts') as HTMLIntlDateTimeFormatFormatRnageToPartsElement;

    expect(el).toHaveShadowPartsCount('value', 1);
    expect(el).toHaveShadowPartsCount('literal', 13);
    expect(el).toHaveShadowPartsCount('year', 2);
    expect(el).toHaveShadowPartsCount('month', 2);
    expect(el).toHaveShadowPartsCount('day', 2);
    expect(el).toHaveShadowPartsCount('hour', 2);
    expect(el).toHaveShadowPartsCount('minute', 2);
    expect(el).toHaveShadowPartsCount('second', 2);
    expect(el).toHaveShadowPartsCount('time-zone-name', 2);
    expect(el).toHaveShadowPartsCount('start-range', 13);
    expect(el).toHaveShadowPartsCount('end-range', 13);
    expect(el).toHaveShadowPartsCount('shared', 1);
  });
  
  it('adds `lang` and `dir` on the value part element', async () => {
    await createTestPage({
      elements: ['intl-datetimeformat', 'intl-datetimeformat-formatrangetoparts'],
      html: `
        <intl-datetimeformat locales="ar" option-datestyle="long"
            option-unit="kilometer">
          <intl-datetimeformat-formatrangetoparts>
            <time slot="start" datetime="1964-08-27"></time>
            <time slot="end" datetime="1989-11-17"></time>
          </intl-datetimeformat-formatrangetoparts>
        </intl-datetimeformat>
      `,
    });
    const el = document.querySelector('intl-datetimeformat-formatrangetoparts') as HTMLIntlDateTimeFormatFormatRnageToPartsElement;
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
