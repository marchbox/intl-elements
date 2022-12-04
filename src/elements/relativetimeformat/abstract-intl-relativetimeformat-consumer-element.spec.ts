import { createTestPage } from "../../testing";
import AbstractIntlRelativetimeformatConsumerElement from "./abstract-intl-relativetimeformat-consumer-element";

class TestIntlRelativeTimeFormatConsumerElement extends AbstractIntlRelativetimeformatConsumerElement {
  #value = '';

  get value(): string {
    return this.#value;
  }
}

customElements.define('test-consumer', TestIntlRelativeTimeFormatConsumerElement);

describe('AbstractIntlRelativeTimeFormatConsumerElement', () => {
  it('gets correct data from named slots', async () => {
    await createTestPage({
      elements: ['intl-relativetimeformat', 'test-consumer'],
      html: `
        <intl-relativetimeformat locales="en">
          <test-consumer>
            <data slot="rtime" value="10"></data>
            <data slot="unit" value="year"></data>
          </test-consumer>
        </intl-relativetimeformat>
      `,
    });
    const el = document.querySelector('test-consumer') as TestIntlRelativeTimeFormatConsumerElement;

    // @ts-ignore
    expect(el.rtime).toBe(10);
    // @ts-ignore
    expect(el.unit).toBe('year');
  });

  it('gets correct data from named slots regardless of their positions in DOM', async () => {
    await createTestPage({
      elements: ['intl-relativetimeformat', 'test-consumer'],
      html: `
        <intl-relativetimeformat locales="en">
          <test-consumer>
            <data slot="unit" value="year"></data>
            <data slot="rtime" value="10"></data>
          </test-consumer>
        </intl-relativetimeformat>
      `,
    });
    const el = document.querySelector('test-consumer') as TestIntlRelativeTimeFormatConsumerElement;

    // @ts-ignore
    expect(el.rtime).toBe(10);
    // @ts-ignore
    expect(el.unit).toBe('year');
  });

  it('gets correct data from the first named slots', async () => {
    await createTestPage({
      elements: ['intl-relativetimeformat', 'test-consumer'],
      html: `
        <intl-relativetimeformat locales="en">
          <test-consumer>
            <data slot="rtime" value="10"></data>
            <data slot="rtime" value="100"></data>
            <data slot="unit" value="year"></data>
            <data slot="unit" value="day"></data>
          </test-consumer>
        </intl-relativetimeformat>
      `,
    });
    const el = document.querySelector('test-consumer') as TestIntlRelativeTimeFormatConsumerElement;

    // @ts-ignore
    expect(el.rtime).toBe(10);
    // @ts-ignore
    expect(el.unit).toBe('year');
  });

  it('gets correct data from default slots', async () => {
    await createTestPage({
      elements: ['intl-relativetimeformat', 'test-consumer'],
      html: `
        <intl-relativetimeformat locales="en">
          <test-consumer>
            <data slot="rtime" value="10"></data>
            <data slot="unit" value="year"></data>
          </test-consumer>
        </intl-relativetimeformat>
      `,
    });
    const el = document.querySelector('test-consumer') as TestIntlRelativeTimeFormatConsumerElement;

    // @ts-ignore
    expect(el.rtime).toBe(10);
    // @ts-ignore
    expect(el.unit).toBe('year');
  });

  it('gets undefined `rtime` if the data is not an number', async () => {
    await createTestPage({
      elements: ['intl-relativetimeformat', 'test-consumer'],
      html: `
        <intl-relativetimeformat locales="en">
          <test-consumer>
            <data value="invalid"></data>
            <data value="year"></data>
          </test-consumer>
        </intl-relativetimeformat>
      `,
    });
    const el = document.querySelector('test-consumer') as TestIntlRelativeTimeFormatConsumerElement;

    // @ts-ignore
    expect(el.rtime).toBe(undefined);
  });

  it('gets an empty string `unit` if no slotted element', async () => {
    await createTestPage({
      elements: ['intl-relativetimeformat', 'test-consumer'],
      html: `
        <intl-relativetimeformat locales="en">
          <test-consumer>
            <data value="10"></data>
          </test-consumer>
        </intl-relativetimeformat>
      `,
    });
    const el = document.querySelector('test-consumer') as TestIntlRelativeTimeFormatConsumerElement;

    // @ts-ignore
    expect(el.unit).toBe('');
  });
});
