import {createTestPage} from '../../testing';
import AbstractIntlListformatConsumerElement from './abstract-intl-listformat-consumer-element';

class TestIntlListFormatConsumerElement extends AbstractIntlListformatConsumerElement {
  #value = '';

  get value() {
    return this.#value;
  }
}

customElements.define('test-consumer', TestIntlListFormatConsumerElement);

describe('AbtractIntlListFormatConsumerElement', () => {
  it('has `list` property value from the given data', async () => {
    await createTestPage({
      elements: ['intl-listformat', 'test-consumer'],
      html: `
        <intl-listformat locales="en">
          <test-consumer>
            <data value="foo"></data>
            <data value="bar"></data>
          </test-consumer>
        </intl-listformat>
      `,
    });

    const el = document.querySelector('test-consumer') as TestIntlListFormatConsumerElement;

    // @ts-ignore
    expect(el.list).toEqual(['foo', 'bar']);
  });

  it('has `list` property value updated when given data changed', async () => {
    await createTestPage({
      elements: ['intl-listformat', 'test-consumer'],
      html: `
        <intl-listformat locales="en">
          <test-consumer>
            <data value="foo"></data>
            <data value="bar"></data>
          </test-consumer>
        </intl-listformat>
      `,
    });

    const el = document.querySelector('test-consumer') as TestIntlListFormatConsumerElement;

    // @ts-ignore
    expect(el.list).toEqual(['foo', 'bar']);

    const newDataEl = document.createElement('data');
    newDataEl.setAttribute('value', 'baz');
    el.appendChild(newDataEl);
    await el.updateComplete;

    // @ts-ignore
    expect(el.list).toEqual(['foo', 'bar', 'baz']);

    newDataEl.setAttribute('value', 'qux');
    await el.updateComplete;

    // @ts-ignore
    expect(el.list).toEqual(['foo', 'bar', 'qux']);

    el.innerHTML = '';
    await el.updateComplete;
    // @ts-ignore
    expect(el.list).toEqual([]);
  });
});
