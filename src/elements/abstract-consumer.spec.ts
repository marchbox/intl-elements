import {
  TestProvider,
  TestConsumer,
  createTestPage,
  defineTestIntlElements,
} from '../testing';
import AbstractConsumer from './abstract-consumer';

defineTestIntlElements();

describe('AbstractConsumer', () => {
  it('hides if it has `hidden` attribute', async () => {
    await createTestPage({
      elements: ['intl-foo', 'intl-foo-bar'],
      html: `
        <intl-foo locale="en">
          <intl-foo-bar hidden></intl-foo-bar>
        </intl-foo-bar>
      `,
    });
    const el = document.querySelector('intl-foo-bar') as TestConsumer;

    expect(el).not.toBeVisible();
  });

  it('gets the correct provider element from ancestor', async () => {
    await createTestPage({
      elements: ['intl-foo', 'intl-foo-bar'],
      html: `
        <intl-foo locale="en">
          <p>
            <intl-foo-bar></intl-foo-bar>
          </p>
        </intl-foo>
      `,
    });
    const el = document.querySelector('intl-foo-bar') as TestConsumer;
    const providerEl = document.querySelector('intl-foo') as TestProvider;

    expect(el.providerElement).toBe(providerEl);
  });

  it('gets the correct provider element from `provider` reference', async () => {
    await createTestPage({
      elements: ['intl-foo', 'intl-foo-bar'],
      html: `
        <intl-foo id="provider" locales="en"></intl-foo>
        <intl-foo-bar provider="provider"></intl-foo-bar>
      `,
    });
    const el = document.querySelector('intl-foo-bar') as TestConsumer;
    const providerEl = document.querySelector('intl-foo') as TestProvider;

    expect(el.providerElement).toBe(providerEl);
  });

  it('prioritize ancestor over reference', async () => {
    await createTestPage({
      elements: ['intl-foo', 'intl-foo-bar'],
      html: `
        <intl-foo id="provider" locales="ja"></intl-foo>
        <intl-foo locales="en">
          <intl-foo-bar provider="provider"></intl-foo-bar>
        </intl-foo>
      `,
    });
    const el = document.querySelector('intl-foo-bar') as TestConsumer;
    const providerEl = document.querySelector('intl-foo:nth-child(2)') as TestProvider;

    expect(el.providerElement).toBe(providerEl);
  });

  it('ignores unrecognized elements when searching for provider', async () => {
    await createTestPage({
      elements: ['intl-foo', 'intl-foo-bar'],
      html: `
        <div id="provider"></div>
        <intl-foo id="provider"></intl-foo>
        <intl-foo-bar provider="provider"></intl-foo-bar>
      `,
    });
    const el = document.querySelector('intl-foo-bar') as TestConsumer;
    const providerEl = document.querySelector('intl-foo') as TestProvider;

    expect(el.providerElement).toBe(providerEl);
  });

  it('throws if parent element name isn’t defined', async () => {
    class BadConsumer extends AbstractConsumer<TestProvider, string> {
      value = '';
    }
    customElements.define('bad-consumer', BadConsumer);

    await createTestPage({
      elements: ['intl-foo', 'bad-consumer'],
      html: `
        <intl-foo locale="en">
          <bad-consumer></bad-consumer>
        </intl-foo>
      `,
    });
    const el = document.querySelector('bad-consumer') as BadConsumer;

    expect(() => {el.providerElement;})
        .toThrow('providerElementName is not defined');
  });

  it('returns `undefined` if no provider as parent', async () => {
    await createTestPage({
      elements: ['intl-foo', 'intl-foo-bar'],
      html: `
        <intl-foo-bar></intl-foo-bar>
      `,
    });
    const el = document.querySelector('intl-foo-bar') as TestConsumer;

    expect(el.providerElement).toBeUndefined();
  });

  it('has `role="none"`', async () => {
    await createTestPage({
      elements: ['intl-foo', 'intl-foo-bar'],
      html: `
        <intl-foo locale="en">
          <intl-foo-bar></intl-foo-bar>
        </intl-foo>
      `,
    });
    const el = document.querySelector('intl-foo-bar') as TestConsumer;

    expect(el).toHaveAttribute('role', 'none');
  });

  it('returns correct value with the `value` read-only property', async () => {
    await createTestPage({
      elements: ['intl-foo', 'intl-foo-bar'],
      html: `
        <intl-foo locale="en">
          <intl-foo-bar><data value="day"></data></intl-foo-bar>
        </intl-foo>
        <intl-foo locale="en">
          <intl-foo-bar><data value="year"></data></intl-foo-bar>
        </intl-foo>
        <intl-foo locale="en">
          <intl-foo-bar><data value="month"></data></intl-foo-bar>
        </intl-foo>
      `,
    });
    const els = document.querySelectorAll('intl-foo-bar') as NodeListOf<TestConsumer>;

    expect(els[0]!.value).toBe('day');
    expect(els[1]!.value).toBe('year');
    expect(els[2]!.value).toBe('');
  });

  it('gets the correct data from default slots', async () => {
    await createTestPage({
      elements: ['intl-foo', 'intl-foo-bar'],
      html: `
        <intl-foo locale="en">
          <intl-foo-bar><data value="day"></data></intl-foo-bar>
        </intl-foo>
        <intl-foo locale="en">
          <intl-foo-bar>
            <data value="day"></data>
            <data value="year"></data>
            <data value="month"></data>
          </intl-foo-bar>
        </intl-foo>
        <intl-foo locale="en">
          <intl-foo-bar>
            <data value="day"></data>
            <data value="year"></data>
            <data value="month"></data>
          </intl-foo-bar>
        </intl-foo>
      `,
    });
    const els = document.querySelectorAll('intl-foo-bar') as NodeListOf<TestConsumer>;

    // @ts-ignore
    expect(els[0]!.getData()).toEqual(['day']);
    // @ts-ignore
    expect(els[1]!.getData()).toEqual(['day', 'year', 'month']);
  });

  it('gets the correct data from named slots', async () => {
    await createTestPage({
      elements: ['intl-foo', 'intl-foo-bar'],
      html: `
        <intl-foo locale="en">
          <intl-foo-bar>
            <data slot="foo" value="day"></data>
            <data slot="bar" value="month"></data>
          </intl-foo-bar>
        </intl-foo>
        <intl-foo locale="en">
          <intl-foo-bar>
            <data slot="foo" value="day"></data>
            <data slot="foo" value="year"></data>
            <data slot="foo" value="month"></data>
            <data slot="bar" value="hour"></data>
            <data slot="bar" value="minute"></data>
            <data slot="bar" value="second"></data>
          </intl-foo-bar>
        </intl-foo>
      `,
    });
    const els = document.querySelectorAll('intl-foo-bar') as NodeListOf<TestConsumer>;

    // @ts-ignore
    expect(els[0]!.getData('foo')).toEqual(['day']);
    // @ts-ignore
    expect(els[0]!.getData('bar')).toEqual(['month']);
    // @ts-ignore
    expect(els[1]!.getData('foo')).toEqual(['day', 'year', 'month']);
    // @ts-ignore
    expect(els[1]!.getData('bar')).toEqual(['hour', 'minute', 'second']);
  });

  it('updates when elements are added to the default slot', async () => {
    await createTestPage({
      elements: ['intl-foo', 'intl-foo-bar'],
      html: `
        <intl-foo locale="en">
          <intl-foo-bar></intl-foo-bar>
        </intl-foo>
      `,
    });
    const el = document.querySelector('intl-foo-bar') as TestConsumer;
    const spy = jest.spyOn(el, 'requestUpdate');

    const dataEl = document.createElement('data');
    dataEl.setAttribute('value', 'day');
    el.appendChild(dataEl);

    await el.updateComplete;
    expect(spy).toHaveBeenCalledTimes(1);

    spy.mockRestore();
  });

  it('updates when elements are removed from the default slot', async () => {
    await createTestPage({
      elements: ['intl-foo', 'intl-foo-bar'],
      html: `
        <intl-foo locale="en">
          <intl-foo-bar><data value="day"></data></intl-foo-bar>
        </intl-foo>
      `,
    });
    const el = document.querySelector('intl-foo-bar') as TestConsumer;
    const spy = jest.spyOn(el, 'requestUpdate');

    const dataEl = el.querySelector('data');
    dataEl!.remove();

    await el.updateComplete;
    expect(spy).toHaveBeenCalledTimes(1);

    spy.mockRestore();
  });

  it('observes slotted `<data>` element’s `value` attribute changes and updates', async () => {
    await createTestPage({
      elements: ['intl-foo', 'intl-foo-bar'],
      html: `
        <intl-foo locale="en">
          <intl-foo-bar>
            <data value="foo"></data>
          </intl-foo-bar>
        </intl-foo>
      `,
    });
    const el = document.querySelector('intl-foo-bar') as TestConsumer;
    const dataEl = el.querySelector('data');
    const spy = jest.spyOn(el, 'requestUpdate');

    dataEl!.setAttribute('value', 'bar');
    await el.updateComplete;

    expect(spy).toHaveBeenCalledTimes(1);

    spy.mockRestore();
  });

  it('doesn’t update if non-`value` attribute changes on slotted `<data>` element', async () => {
    await createTestPage({
      elements: ['intl-foo', 'intl-foo-bar'],
      html: `
        <intl-foo locale="en">
          <intl-foo-bar>
            <data value="foo"></data>
          </intl-foo-bar>
        </intl-foo>
      `,
    });
    const el = document.querySelector('intl-foo-bar') as TestConsumer;
    const dataEl = el.querySelector('data');
    const spy = jest.spyOn(el, 'requestUpdate');

    dataEl!.setAttribute('class', 'foo');
    await el.updateComplete;
    expect(spy).not.toHaveBeenCalled();
    spy.mockRestore();

    dataEl!.textContent = 'Hello';
    await el.updateComplete;
    expect(spy).not.toHaveBeenCalled();
    spy.mockRestore();
  });

  it('observes text content changes if text content is allowed', async () => {
    class TextIntlConsumerElement2 extends TestConsumer {
      static override observesText = true;
    }
    customElements.define('intl-foo-baz', TextIntlConsumerElement2);

    await createTestPage({
      elements: ['intl-foo', 'intl-foo-baz'],
      html: `
        <intl-foo locale="en">
          <intl-foo-baz>Hello, world!</intl-foo-baz>
        </intl-foo>
      `,
    });
    const el = document.querySelector('intl-foo-baz') as TestConsumer;
    const spy = jest.spyOn(el, 'requestUpdate');

    el.textContent = 'Hello, moon!';
    await el.updateComplete;

    expect(spy).toHaveBeenCalledTimes(1);

    spy.mockRestore();
  });

  it('trims data values', async () => {
    await createTestPage({
      elements: ['intl-foo', 'intl-foo-bar'],
      html: `
        <intl-foo locale="en">
          <intl-foo-bar>
            <data value=" day "></data>
            <data value=" year "></data>
            <data value=" month "></data>
          </intl-foo-bar>
        </intl-foo>
      `,
    });
    const el = document.querySelector('intl-foo-bar') as TestConsumer;
    // @ts-ignore
    expect(el.getData()).toEqual(['day', 'year', 'month']);
  });

  it('ignores empty data values', async () => {
    await createTestPage({
      elements: ['intl-foo', 'intl-foo-bar'],
      html: `
        <intl-foo locale="en">
          <intl-foo-bar>
            <data value="day"></data>
            <data value=""></data>
            <data value="month"></data>
          </intl-foo-bar>
        </intl-foo>
      `,
    });
    const el = document.querySelector('intl-foo-bar') as TestConsumer;
    // @ts-ignore
    expect(el.getData()).toEqual(['day', 'month']);
  });
});
