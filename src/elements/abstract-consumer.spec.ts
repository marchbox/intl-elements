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
          <intl-foo-bar><data value="year"></data></intl-foo-bar>
          <intl-foo-bar><data value="month"></data></intl-foo-bar>
          <intl-foo-bar><time datetime="1923-10-16"></time></intl-foo-bar>
          <intl-foo-bar><time datetime="invalid date"></time></intl-foo-bar>
        </intl-foo>
      `,
    });
    const els = document.querySelectorAll('intl-foo-bar') as NodeListOf<TestConsumer>;

    expect(els[0]!.value).toBe('day');
    expect(els[1]!.value).toBe('year');
    expect(els[2]!.value).toBe('');
    expect(els[3]!.value).toBe(new Date('1923-10-16').toISOString());
    expect(els[4]!.value).toBe('');
  });

  it('gets the correct data from default slots', async () => {
    await createTestPage({
      elements: ['intl-foo', 'intl-foo-bar'],
      html: `
        <intl-foo locale="en">
          <intl-foo-bar><data value="day"></data></intl-foo-bar>
          <intl-foo-bar>
            <data value="day"></data>
            <data value="year"></data>
            <data value="month"></data>
          </intl-foo-bar>
          <intl-foo-bar>
            <time datetime="1923-10-16"></time>
            <time datetime="2023-01-01"></time>
          </intl-foo-bar>
          <intl-foo-bar>
            <template><ins></ins>Content</template>
            <template>Content</template>
          </intl-foo-bar>
        </intl-foo>
      `,
    });
    const els = document.querySelectorAll('intl-foo-bar') as NodeListOf<TestConsumer>;

    // @ts-ignore
    expect(els[0]!.getDataValue()).toEqual(['day']);
    // @ts-ignore
    expect(els[1]!.getDataValue()).toEqual(['day', 'year', 'month']);
    // @ts-ignore
    expect(els[2]!.getDateTime()).toEqual([
      new Date('1923-10-16'),
      new Date('2023-01-01'),
    ]);
    // @ts-ignore
    expect(els[3]!.getTemplateContent()[0]).toContainTemplateHTML('<ins></ins>Content');
    // @ts-ignore
    expect(els[3]!.getTemplateContent()[1]).toContainTemplateHTML('Content');
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
          <intl-foo-bar>
            <data slot="foo" value="day"></data>
            <data slot="foo" value="year"></data>
            <data slot="foo" value="month"></data>
            <data slot="bar" value="hour"></data>
            <data slot="bar" value="minute"></data>
            <data slot="bar" value="second"></data>
          </intl-foo-bar>
          <intl-foo-bar>
            <time slot="foo" datetime="1923-10-16"></time>
            <time slot="foo" datetime="1964-08-27"></time>
            <time slot="bar" datetime="1989-11-17"></time>
            <time slot="bar" datetime="2023-01-01"></time>
          </intl-foo-bar>
          <intl-foo-bar>
            <template slot="foo"><ins></ins>Content 1</template>
            <template slot="foo">Content 1</template>
            <template slot="bar"><ins></ins>Content 2</template>
            <template slot="bar">Content 2</template>
          </intl-foo-bar>
        </intl-foo>
      `,
    });
    const els = document.querySelectorAll('intl-foo-bar') as NodeListOf<TestConsumer>;

    // @ts-ignore
    expect(els[0]!.getDataValue('foo')).toEqual(['day']);
    // @ts-ignore
    expect(els[0]!.getDataValue('bar')).toEqual(['month']);
    // @ts-ignore
    expect(els[1]!.getDataValue('foo')).toEqual(['day', 'year', 'month']);
    // @ts-ignore
    expect(els[1]!.getDataValue('bar')).toEqual(['hour', 'minute', 'second']);
    // @ts-ignore
    expect(els[2]!.getDateTime('foo')).toEqual([
      new Date('1923-10-16'),
      new Date('1964-08-27'),
    ]);
    // @ts-ignore
    expect(els[2]!.getDateTime('bar')).toEqual([
      new Date('1989-11-17'),
      new Date('2023-01-01'),
    ]);
    // @ts-ignore
    expect(els[3]!.getTemplateContent('foo')[0]).toContainTemplateHTML('<ins></ins>Content 1');
    // @ts-ignore
    expect(els[3]!.getTemplateContent('foo')[1]).toContainTemplateHTML('Content 1');
    // @ts-ignore
    expect(els[3]!.getTemplateContent('bar')[0]).toContainTemplateHTML('<ins></ins>Content 2');
    // @ts-ignore
    expect(els[3]!.getTemplateContent('bar')[1]).toContainTemplateHTML('Content 2');
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
            <time datetime=" 1923-10-16  "></time>
            <time datetime="        1964-08-27  "></time>
          </intl-foo-bar>
        </intl-foo>
      `,
    });
    const el = document.querySelector('intl-foo-bar') as TestConsumer;
    // @ts-ignore
    expect(el.getDataValue()).toEqual(['day', 'year', 'month']);
    // @ts-ignore
    expect(el.getDateTime()).toEqual([
      new Date('1923-10-16'),
      new Date('1964-08-27'),
    ]);
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
            <time datetime="1923-10-16"></time>
            <time datetime=""></time>
          </intl-foo-bar>
        </intl-foo>
      `,
    });
    const el = document.querySelector('intl-foo-bar') as TestConsumer;
    // @ts-ignore
    expect(el.getDataValue()).toEqual(['day', 'month']);
    // @ts-ignore
    expect(el.getDateTime()).toEqual([
      new Date('1923-10-16'),
    ]);
  });

  it('ignores named slots when getting data from default slots', async () => {
    await createTestPage({
      elements: ['intl-foo', 'intl-foo-bar'],
      html: `
        <intl-foo locale="en">
          <intl-foo-bar>
            <data slot="foo" value="month"></data>
            <data value="day"></data>
          </intl-foo-bar>
          <intl-foo-bar>
            <time slot="foo" datetime="1964-08-27"></time>
            <time datetime="1923-10-16"></time>
          </intl-foo-bar>
          <intl-foo-bar>
            <template slot="foo">Content 2</template>
            <template>Content 1</template>
          </intl-foo-bar>
        </intl-foo>
      `,
    });
    const els = document.querySelectorAll('intl-foo-bar') as NodeListOf<TestConsumer>;

    // @ts-ignore
    expect(els[0]!.getDataValue()).toEqual(['day']);
    // @ts-ignore
    expect(els[1]!.getDateTime()).toEqual([new Date('1923-10-16')]);
    // @ts-ignore
    expect(els[2]!.getTemplateContent()).toContainTemplateHTML('Content 1');
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
    el.append(dataEl);
    await el.updateComplete;

    expect(spy).toHaveBeenCalledTimes(1);

    spy.mockReset();

    const timeEl = document.createElement('time');
    timeEl.setAttribute('datetime', '1923-10-16');
    el.append(timeEl);
    await el.updateComplete;

    expect(spy).toHaveBeenCalledTimes(1);

    spy.mockReset();

    const templateEl = document.createElement('template');
    templateEl.innerHTML = 'Content 1';
    el.append(templateEl);
    await el.updateComplete;

    expect(spy).toHaveBeenCalledTimes(1);

    spy.mockRestore();
  });

  it('updates when elements are removed from the default slot', async () => {
    await createTestPage({
      elements: ['intl-foo', 'intl-foo-bar'],
      html: `
        <intl-foo locale="en">
          <intl-foo-bar>
            <data value="day"></data>
            <time datetime="1923-10-16"></time>
            <template>Content 1</template>
          </intl-foo-bar>
        </intl-foo>
      `,
    });
    const el = document.querySelector('intl-foo-bar') as TestConsumer;
    const spy = jest.spyOn(el, 'requestUpdate');

    const dataEl = el.querySelector('data');
    dataEl!.remove();
    await el.updateComplete;

    expect(spy).toHaveBeenCalledTimes(1);

    spy.mockReset();

    const timeEl = el.querySelector('time');
    timeEl!.remove();
    await el.updateComplete;

    expect(spy).toHaveBeenCalledTimes(1);

    spy.mockReset();

    const templateEl = el.querySelector('template');
    templateEl!.remove();
    await el.updateComplete;

    expect(spy).toHaveBeenCalledTimes(1);

    spy.mockRestore();
  });

  it('observes slotted data’s `value`, time’s `datetime`, and template’s content attribute changes and updates', async () => {
    await createTestPage({
      elements: ['intl-foo', 'intl-foo-bar'],
      html: `
        <intl-foo locale="en">
          <intl-foo-bar>
            <data value="foo"></data>
            <time datetime="1923-10-16"></time>
            <template>Content 1</template>
          </intl-foo-bar>
        </intl-foo>
      `,
    });
    const el = document.querySelector('intl-foo-bar') as TestConsumer;
    const spy = jest.spyOn(el, 'requestUpdate');

    const dataEl = el.querySelector('data');
    dataEl!.setAttribute('value', 'bar');
    await el.updateComplete;

    expect(spy).toHaveBeenCalledTimes(1);

    spy.mockReset();

    const timeEl = el.querySelector('time');
    timeEl!.setAttribute('datetime', '1964-08-27');
    await el.updateComplete;

    expect(spy).toHaveBeenCalledTimes(1);

    spy.mockReset();

    const templateEl = el.querySelector('template');
    templateEl!.innerHTML = 'Content 2';
    await el.updateComplete;

    expect(spy).toHaveBeenCalledTimes(1);

    spy.mockReset();

    templateEl!.content.append(document.createElement('span'));
    await el.updateComplete;

    expect(spy).toHaveBeenCalledTimes(1);

    spy.mockRestore();
  });

  it('doesn’t update if non-`value`/`datetime` attribute or template content changes on slotted element', async () => {
    await createTestPage({
      elements: ['intl-foo', 'intl-foo-bar'],
      html: `
        <intl-foo locale="en">
          <intl-foo-bar>
            <data value="foo"></data>
            <time datetime="1923-10-16"></time>
            <template>Content 1</template>
          </intl-foo-bar>
        </intl-foo>
      `,
    });
    const el = document.querySelector('intl-foo-bar') as TestConsumer;
    const spy = jest.spyOn(el, 'requestUpdate');
    const dataEl = el.querySelector('data');
    const timeEl = el.querySelector('time');
    const templateEl = el.querySelector('template');

    dataEl!.setAttribute('class', 'foo');
    await el.updateComplete;
    expect(spy).not.toHaveBeenCalled();

    spy.mockReset();

    dataEl!.textContent = 'Hello';
    await el.updateComplete;
    expect(spy).not.toHaveBeenCalled();

    spy.mockReset();

    timeEl!.setAttribute('class', 'foo');
    await el.updateComplete;
    expect(spy).not.toHaveBeenCalled();

    spy.mockReset();

    timeEl!.textContent = 'Hello';
    await el.updateComplete;
    expect(spy).not.toHaveBeenCalled();

    spy.mockReset();

    templateEl!.setAttribute('class', 'foo');
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

  it('gets the correct `currentLang` and `currentDir` values', async () => {
    await createTestPage({
      elements: ['intl-foo', 'intl-foo-bar'],
      html: `
        <intl-foo locales="en">
          <intl-foo-bar></intl-foo-bar>
        </intl-foo>
      `,
    });
    const el = document.querySelector('intl-foo-bar') as TestConsumer;
    // @ts-ignore
    expect(el.currentLang).toBe('en');
    // @ts-ignore
    expect(el.currentDir).toBeUndefined();

    el.providerElement!.setAttribute('locales', 'ar');
    await el.updateComplete;
    await el.updateComplete;
    // @ts-ignore
    expect(el.currentLang).toBe('ar');
    // @ts-ignore
    expect(el.currentDir).toBe('rtl');
  });

  it('gets undefined `currentLang` and `currentDir` if no provider element', async () => {
    await createTestPage({
      elements: ['intl-foo-bar'],
      html: `
        <intl-foo-bar></intl-foo-bar>
      `,
    });
    const el = document.querySelector('intl-foo-bar') as TestConsumer;
    // @ts-ignore
    expect(el.currentLang).toBeUndefined();
    // @ts-ignore
    expect(el.currentDir).toBeUndefined();
  });
});
