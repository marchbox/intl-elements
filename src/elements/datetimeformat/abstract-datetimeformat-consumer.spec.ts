import {createTestPage} from '../../testing';
import AbstractDateTimeFormatConsumer from './abstract-datetimeformat-consumer';

class TestIntlDateTimeFormatConsumerElement extends AbstractDateTimeFormatConsumer {
  #value = '';

  get value(): string {
    return this.#value;
  }
}

customElements.define('test-consumer', TestIntlDateTimeFormatConsumerElement);

describe('AbstractDateTimeFormatConsumer', () => {
  it('gets correct dateTime from a single slotted data element', async () => {
    await createTestPage({
      elements: ['intl-datetimeformat', 'test-consumer'],
      html: `
        <intl-datetimeFormat locales="en">
          <test-consumer><time datetime="1923-10-16">Oct 16, 1923</time></test-consumer>
        </intl-datetimeFormat>
      `,
    });
    const el = document.querySelector('test-consumer') as TestIntlDateTimeFormatConsumerElement;

    // @ts-ignore
    expect(el.dateTime).toEqual(new Date('1923-10-16'));
    // @ts-ignore
    expect(el.start).toEqual(new Date('1923-10-16'));
    // @ts-ignore
    expect(el.end).not.toBeValidDate();
  });

  it('gets correct dateTimes from a two slotted time elements', async () => {
    await createTestPage({
      elements: ['intl-datetimeformat', 'test-consumer'],
      html: `
        <intl-datetimeFormat locales="en">
          <test-consumer>
            <time datetime="1923-10-16">Oct 16, 1923</time>
            <time datetime="1964-08-27">Aug 27, 1964</time>
          </test-consumer>
        </intl-datetimeFormat>
      `,
    });
    const el = document.querySelector('test-consumer') as TestIntlDateTimeFormatConsumerElement;

    // @ts-ignore
    expect(el.dateTime).toEqual(new Date('1923-10-16'));
    // @ts-ignore
    expect(el.start).toEqual(new Date('1923-10-16'));
    // @ts-ignore
    expect(el.end).toEqual(new Date('1964-08-27'));
  });

  it('gets correct dateTime from a multiple slotted time elements', async () => {
    await createTestPage({
      elements: ['intl-datetimeformat', 'test-consumer'],
      html: `
        <intl-datetimeformat locales="en">
          <test-consumer>
            <time datetime="1923-10-16"></time>
            <time datetime="1964-08-27"></time>
            <time datetime="1989-11-17"></time>
          </test-consumer>
          <test-consumer>
            <time></time>
            <time datetime="1923-10-16"></time>
            <time datetime="1964-08-27"></time>
          </test-consumer>
        </intl-datetimeformat>
      `,
    });
    const els = document.querySelectorAll('test-consumer') as NodeListOf<TestIntlDateTimeFormatConsumerElement>;

    // @ts-ignore
    expect(els[0].dateTime).toEqual(new Date('1923-10-16'));
    // @ts-ignore
    expect(els[0].start).toEqual(new Date('1923-10-16'));
    // @ts-ignore
    expect(els[0].end).toEqual(new Date('1964-08-27'));
    // @ts-ignore
    expect(els[1].dateTime).toEqual(new Date('1923-10-16'));
    // @ts-ignore
    expect(els[1].start).toEqual(new Date('1923-10-16'));
    // @ts-ignore
    expect(els[1].end).toEqual(new Date('1964-08-27'));
  });

  it('gets correct dateTimes from named slots', async () => {
    await createTestPage({
      elements: ['intl-datetimeformat', 'test-consumer'],
      html: `
        <intl-datetimeformat locales="en">
          <test-consumer>
            <time slot="start" datetime="1923-10-16"></time>
            <time slot="end" datetime="1964-08-27"></time>
          </test-consumer>
          <test-consumer>
            <time datetime="1923-10-16"></time>
            <time slot="start" datetime="1964-08-27"></time>
            <time slot="end" datetime="1989-11-17"></time>
          </test-consumer>
          <test-consumer>
            <time datetime="1923-10-16"></time>
            <time slot="end" datetime="1989-11-17"></time>
            <time slot="start" datetime="1964-08-27"></time>
          </test-consumer>
          <test-consumer>
            <time datetime="1923-10-16"></time>
            <time slot="end" datetime="1989-11-17"></time>
          </test-consumer>
        </intl-datetimeformat>
      `,
    });
    const els = document.querySelectorAll('test-consumer') as NodeListOf<TestIntlDateTimeFormatConsumerElement>;

    // @ts-ignore
    expect(els[0].dateTime).not.toBeValidDate();
    // @ts-ignore
    expect(els[0].start).toEqual(new Date('1923-10-16'));
    // @ts-ignore
    expect(els[0].end).toEqual(new Date('1964-08-27'));
    // @ts-ignore
    expect(els[1].dateTime).toEqual(new Date('1923-10-16'));
    // @ts-ignore
    expect(els[1].start).toEqual(new Date('1964-08-27'));
    // @ts-ignore
    expect(els[1].end).toEqual(new Date('1989-11-17'));
    // @ts-ignore
    expect(els[2].dateTime).toEqual(new Date('1923-10-16'));
    // @ts-ignore
    expect(els[2].start).toEqual(new Date('1964-08-27'));
    // @ts-ignore
    expect(els[2].end).toEqual(new Date('1989-11-17'));
    // @ts-ignore
    expect(els[3].dateTime).toEqual(new Date('1923-10-16'));
    // @ts-ignore
    expect(els[3].start).toEqual(new Date('1923-10-16'));
    // @ts-ignore
    expect(els[3].end).toEqual(new Date('1989-11-17'));
  });

  it('gets invalid `start` date and valid `end` date', async () => {
    await createTestPage({
      elements: ['intl-datetimeformat', 'test-consumer'],
      html: `
        <intl-datetimeformat locales="en">
          <test-consumer>
            <time slot="end" datetime="1964-08-27"></time>
          </test-consumer>
        </intl-datetimeformat>
      `,
    });
    const el = document.querySelector('test-consumer') as TestIntlDateTimeFormatConsumerElement;

    // @ts-ignore
    expect(el.number).not.toBeValidDate();
    // @ts-ignore
    expect(el.start).not.toBeValidDate();
    // @ts-ignore
    expect(el.end).toEqual(new Date('1964-08-27'));
  });
});
