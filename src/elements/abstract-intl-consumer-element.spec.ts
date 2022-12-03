import {
  TestIntlProviderElement,
  TestIntlConsumerElement,
  createTestPage,
  defineTestIntlElements,
} from '../testing';
import AbstractIntlConsumerElement from './abstract-intl-consumer-element';

defineTestIntlElements();

describe('AbstractIntlConsumerElement', () => {
  it('hides if it has `hidden` attribute', async () => {
    const page = await createTestPage<TestIntlConsumerElement>({
      element: ['intl-foo-bar', 'intl-foo'],
      html: `
        <intl-foo locale="en">
          <intl-foo-bar hidden></intl-foo-bar>
        </intl-foo-bar>
      `,
    });
    const el = page.element;

    expect(el).not.toBeVisible();
  });

  it('gets the correct provider element', async () => {
    const page = await createTestPage<TestIntlConsumerElement>({
      element: ['intl-foo-bar', 'intl-foo'],
      html: `
        <intl-foo locale="en">
          <intl-foo-bar></intl-foo-bar>
        </intl-foo>
      `,
    });
    const el = page.element;
    const providerEl = document.querySelector('intl-foo');

    expect(el.provider).toBe(providerEl);
  });

  it('throws if parent element name isn’t defined', async () => {
    class BadConsumerElement extends AbstractIntlConsumerElement<TestIntlProviderElement, string> {
      value = '';
    }
    customElements.define('bad-consumer', BadConsumerElement);

    const page = await createTestPage<BadConsumerElement>({
      element: ['bad-consumer', 'intl-foo'],
      html: `
        <intl-foo locale="en">
          <bad-consumer></bad-consumer>
        </intl-foo>
      `,
    });
    const el = page.element;

    expect(() => {el.provider;}).toThrow('providerElementName is not defined');
  });

  it('returns `undefined` if no provider as parent', async () => {
    const page = await createTestPage<TestIntlConsumerElement>({
      element: ['intl-foo-bar', 'intl-foo'],
      html: `
        <intl-foo-bar></intl-foo-bar>
      `,
    });
    const el = page.element;

    expect(el.provider).toBeUndefined();
  });

  it('has `role="none"`', async () => {
    const page = await createTestPage<TestIntlConsumerElement>({
      element: ['intl-foo-bar', 'intl-foo'],
      html: `
        <intl-foo locale="en">
          <intl-foo-bar></intl-foo-bar>
        </intl-foo>
      `,
    });
    const el = page.element;

    expect(el.getAttribute('role')).toBe('none');
  });

  it('returns correct value with the `value` read-only property', async () => {
    const page1 = await createTestPage<TestIntlConsumerElement>({
      element: ['intl-foo-bar', 'intl-foo'],
      html: `
        <intl-foo locale="en">
          <intl-foo-bar><data value="day"></data></intl-foo-bar>
        </intl-foo>
      `,
    });
    const el1 = page1.element;
    expect(el1.value).toBe('day');

    const page2 = await createTestPage<TestIntlConsumerElement>({
      element: ['intl-foo-bar', 'intl-foo'],
      html: `
        <intl-foo locale="en">
          <intl-foo-bar><data value="year"></data></intl-foo-bar>
        </intl-foo>
      `,
    });
    const el2 = page2.element;
    expect(el2.value).toBe('year');

    const page3 = await createTestPage<TestIntlConsumerElement>({
      element: ['intl-foo-bar', 'intl-foo'],
      html: `
        <intl-foo locale="en">
          <intl-foo-bar><data value="month"></data></intl-foo-bar>
        </intl-foo>
      `,
    });
    const el3 = page3.element;
    expect(el3.value).toBe('');
  });

  it('gets the correct data from default slots', async () => {
    const page1 = await createTestPage<TestIntlConsumerElement>({
      element: ['intl-foo-bar', 'intl-foo'],
      html: `
        <intl-foo locale="en">
          <intl-foo-bar><data value="day"></data></intl-foo-bar>
        </intl-foo>
      `,
    });
    const el1 = page1.element;

    expect(el1.getData()).toEqual(['day']);

    const page2 = await createTestPage<TestIntlConsumerElement>({
      element: ['intl-foo-bar', 'intl-foo'],
      html: `
        <intl-foo locale="en">
          <intl-foo-bar>
            <data value="day"></data>
            <data value="year"></data>
            <data value="month"></data>
          </intl-foo-bar>
        </intl-foo>
      `,
    });
    const el2 = page2.element;

    expect(el2.getData()).toEqual(['day', 'year', 'month']);
  });

  it('gets the correct data from named slots', async () => {
    const page1 = await createTestPage<TestIntlConsumerElement>({
      element: ['intl-foo-bar', 'intl-foo'],
      html: `
        <intl-foo locale="en">
          <intl-foo-bar>
            <data slot="foo" value="day"></data>
            <data slot="bar" value="month"></data>
          </intl-foo-bar>
        </intl-foo>
      `,
    });
    const el1 = page1.element;

    expect(el1.getData('foo')).toEqual(['day']);
    expect(el1.getData('bar')).toEqual(['month']);

    const page2 = await createTestPage<TestIntlConsumerElement>({
      element: ['intl-foo-bar', 'intl-foo'],
      html: `
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
    const el2 = page2.element;

    expect(el2.getData('foo')).toEqual(['day', 'year', 'month']);
    expect(el2.getData('bar')).toEqual(['hour', 'minute', 'second']);
  });

  it('updates when elements are added to the default slot', async () => {
    const page = await createTestPage<TestIntlConsumerElement>({
      element: ['intl-foo-bar', 'intl-foo'],
      html: `
        <intl-foo locale="en">
          <intl-foo-bar></intl-foo-bar>
        </intl-foo>
      `,
    });
    const el = page.element;
    const spy = jest.spyOn(el, 'requestUpdate');

    const dataEl = document.createElement('data');
    dataEl.setAttribute('value', 'day');
    el.appendChild(dataEl);

    await el.updateComplete;
    expect(spy).toHaveBeenCalledTimes(1);

    spy.mockRestore();
  });

  it('updates when elements are removed from the default slot', async () => {
    const page = await createTestPage<TestIntlConsumerElement>({
      element: ['intl-foo-bar', 'intl-foo'],
      html: `
        <intl-foo locale="en">
          <intl-foo-bar><data value="day"></data></intl-foo-bar>
        </intl-foo>
      `,
    });
    const el = page.element;
    const spy = jest.spyOn(el, 'requestUpdate');

    const dataEl = el.querySelector('data');
    dataEl.remove();

    await el.updateComplete;
    expect(spy).toHaveBeenCalledTimes(1);

    spy.mockRestore();
  });

  it('observes slotted `<data>` element’s `value` attribute changes and updates', async () => {
    const page = await createTestPage<TestIntlConsumerElement>({
      element: ['intl-foo-bar', 'intl-foo'],
      html: `
        <intl-foo locale="en">
          <intl-foo-bar>
            <data value="foo"></data>
          </intl-foo-bar>
        </intl-foo>
      `,
    });
    const el = page.element;
    const dataEl = el.querySelector('data');
    const spy = jest.spyOn(el, 'requestUpdate');

    dataEl.setAttribute('value', 'bar');
    await el.updateComplete;

    expect(spy).toHaveBeenCalledTimes(1);

    spy.mockRestore();
  });

  it('doesn’t update if non-`value` attribute changes on slotted `<data>` element', async () => {
    const page = await createTestPage<TestIntlConsumerElement>({
      element: ['intl-foo-bar', 'intl-foo'],
      html: `
        <intl-foo locale="en">
          <intl-foo-bar>
            <data value="foo"></data>
          </intl-foo-bar>
        </intl-foo>
      `,
    });
    const el = page.element;
    const dataEl = el.querySelector('data');
    const spy = jest.spyOn(el, 'requestUpdate');

    dataEl.setAttribute('class', 'foo');
    await el.updateComplete;
    expect(spy).not.toHaveBeenCalled();
    spy.mockRestore();

    dataEl.textContent = 'Hello';
    await el.updateComplete;
    expect(spy).not.toHaveBeenCalled();
    spy.mockRestore();
  });

  it.todo('throws if it contains elements other than <data value> and/or <template>');
  it.todo('throws if non-<data value> and/or <template> elements are slotted');
  it.todo('throws if it contains direct text content without setting `allowTextContent` to be `true`');
  it.todo('throws if direct text content is added');
});
