import {createTestPage} from '../../testing';
import AbstractNumberFormatConsumer from './abstract-numberformat-consumer';

class TestIntlNumberFormatConsumerElement extends AbstractNumberFormatConsumer {
  #value = '';

  get value(): string {
    return this.#value;
  }
}

customElements.define('test-consumer', TestIntlNumberFormatConsumerElement);

describe('AbstractNumberFormatConsumer', () => {
  it('gets correct data from a single slotted data element', async () => {
    await createTestPage({
      elements: ['intl-numberformat', 'test-consumer'],
      html: `
        <intl-numberformat locales="en">
          <test-consumer><data value="10"></data></test-consumer>
        </intl-numberformat>
      `,
    });
    const el = document.querySelector('test-consumer') as TestIntlNumberFormatConsumerElement;

    // @ts-ignore
    expect(el.number).toBe(10);
    // @ts-ignore
    expect(el.start).toBe(10);
    // @ts-ignore
    expect(el.end).toBeNaN();
  });

  it('gets correct data from a two slotted data elements', async () => {
    await createTestPage({
      elements: ['intl-numberformat', 'test-consumer'],
      html: `
        <intl-numberformat locales="en">
          <test-consumer>
            <data value="10"></data>
            <data value="20"></data>
          </test-consumer>
        </intl-numberformat>
      `,
    });
    const el = document.querySelector('test-consumer') as TestIntlNumberFormatConsumerElement;

    // @ts-ignore
    expect(el.number).toBe(10);
    // @ts-ignore
    expect(el.start).toBe(10);
    // @ts-ignore
    expect(el.end).toBe(20);
  });

  it('gets correct data from a multiple slotted data elements', async () => {
    await createTestPage({
      elements: ['intl-numberformat', 'test-consumer'],
      html: `
        <intl-numberformat locales="en">
          <test-consumer>
            <data value="10"></data>
            <data value="20"></data>
            <data value="30"></data>
          </test-consumer>
          <test-consumer>
            <data></data>
            <data value="20"></data>
            <data value="30"></data>
          </test-consumer>
        </intl-numberformat>
      `,
    });
    const els = document.querySelectorAll('test-consumer') as NodeListOf<TestIntlNumberFormatConsumerElement>;

    // @ts-ignore
    expect(els[0].number).toBe(10);
    // @ts-ignore
    expect(els[0].start).toBe(10);
    // @ts-ignore
    expect(els[0].end).toBe(20);
    // @ts-ignore
    expect(els[1].number).toBe(20);
    // @ts-ignore
    expect(els[1].start).toBe(20);
    // @ts-ignore
    expect(els[1].end).toBe(30);
  });

  it('gets correct data from named slots', async () => {
    await createTestPage({
      elements: ['intl-numberformat', 'test-consumer'],
      html: `
        <intl-numberformat locales="en">
          <test-consumer>
            <data slot="start" value="10"></data>
            <data slot="end" value="20"></data>
          </test-consumer>
          <test-consumer>
            <data value="10"></data>
            <data slot="start" value="20"></data>
            <data slot="end" value="30"></data>
          </test-consumer>
          <test-consumer>
            <data value="10"></data>
            <data slot="end" value="30"></data>
            <data slot="start" value="20"></data>
          </test-consumer>
          <test-consumer>
            <data value="10"></data>
            <data slot="end" value="20"></data>
          </test-consumer>
        </intl-numberformat>
      `,
    });
    const els = document.querySelectorAll('test-consumer') as NodeListOf<TestIntlNumberFormatConsumerElement>;

    // @ts-ignore
    expect(els[0].number).toBeNaN();
    // @ts-ignore
    expect(els[0].start).toBe(10);
    // @ts-ignore
    expect(els[0].end).toBe(20);
    // @ts-ignore
    expect(els[1].number).toBe(10);
    // @ts-ignore
    expect(els[1].start).toBe(20);
    // @ts-ignore
    expect(els[1].end).toBe(30);
    // @ts-ignore
    expect(els[2].number).toBe(10);
    // @ts-ignore
    expect(els[2].start).toBe(20);
    // @ts-ignore
    expect(els[2].end).toBe(30);
    // @ts-ignore
    expect(els[3].number).toBe(10);
    // @ts-ignore
    expect(els[3].start).toBe(10);
    // @ts-ignore
    expect(els[3].end).toBe(20);
  });

  it('gets `NaN` `start` and defined `end`', async () => {
    await createTestPage({
      elements: ['intl-numberformat', 'test-consumer'],
      html: `
        <intl-numberformat locales="en">
          <test-consumer>
            <data slot="end" value="20"></data>
          </test-consumer>
        </intl-numberformat>
      `,
    });
    const el = document.querySelector('test-consumer') as TestIntlNumberFormatConsumerElement;

    // @ts-ignore
    expect(el.number).toBeNaN();
    // @ts-ignore
    expect(el.start).toBeNaN();
    // @ts-ignore
    expect(el.end).toBe(20);
  });
});
