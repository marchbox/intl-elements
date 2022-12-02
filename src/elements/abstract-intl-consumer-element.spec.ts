import {expect, describe, it, jest} from '@jest/globals';

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

    expect(window.getComputedStyle(el).display).toBe('none');
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
    customElements.define('bad-consumer-element', BadConsumerElement);

    const page = await createTestPage<TestIntlConsumerElement>({
      element: ['bad-consumer-element', 'intl-foo'],
      html: `
        <intl-foo locale="en">
          <bad-consumer-element></bad-consumer-element>
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

  it.todo('throws if it contains elements other than <data value> and/or <template>');
  it.todo('throws if non-<data value> and/or <template> elements are slotted');
  it.todo('throws if it contains direct text content without setting `allowTextContent` to be `true`');
  it.todo('throws if direct text content is added');

  it.todo('gets the correct data from `<data value>` elements');
  it.todo('updates when elements are added to the default slot');
  it.todo('updates when elements are added to a named slot');
  it.todo('updates when elements are removed from the default slot');
  it.todo('updates when elements are removed from a named slot');

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

    expect(spy).toHaveBeenCalled();

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
});
