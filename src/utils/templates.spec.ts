import {render} from 'lit';

import {generateContent} from './templates';

describe('generateContent()', () => {
  let container: HTMLElement;
  let srContainer: () => HTMLElement;
  let valueContainer: () => HTMLElement;
  let slotContainer: () => HTMLElement;

  beforeEach(() => {
    container = document.createElement('div');
    srContainer = () => container.querySelector('.sr')!;
    valueContainer = () => container.querySelector('[part="value"]')!;
    slotContainer = () => container.querySelector('span:last-child')!;
  });

  afterEach(() => {
    container.innerHTML = '';
  });

  it('generates slot elements', async () => {
    render(generateContent({
      slots: ['', 'foo', 'bar'],
    }), container);

    expect(slotContainer()).toHaveAttribute('aria-hidden', 'true');
    expect(slotContainer()).toHaveAttribute('hidden');
    expect(slotContainer()).toContainHTML('<slot></slot>');
    expect(slotContainer()).toContainHTML('<slot name="foo"></slot>');
    expect(slotContainer()).toContainHTML('<slot name="bar"></slot>');
  });

  it('generates screen reader content and hides value part', async () => {
    render(generateContent({
      slots: [],
      stringContent: 'foo bar',
      partsContent: [{value: 'foo'}, {value: 'bar'}],
    }), container);

    expect(srContainer()?.textContent).toBe('foo bar');
    expect(valueContainer()).toHaveAttribute('aria-hidden', 'true');
  });

  it('doesn’t generate screen reader content if only content is `stringContent`', async () => {
    render(generateContent({
      slots: [],
      stringContent: 'foo bar',
    }), container);

    expect(srContainer()).toBeNull();
    expect(valueContainer().textContent).toBe('foo bar');
    expect(valueContainer()).not.toHaveAttribute('aria-hidden');
  });

  it('sets `lang` and `dir` attributes', async () => {
    render(generateContent({
      slots: [],
      stringContent: 'hello world',
      partsContent: [{value: 'foo'}, {value: 'bar'}],
      lang: 'he',
      dir: 'rtl',
    }), container);

    expect(srContainer()).toHaveAttribute('lang', 'he');
    expect(srContainer()).toHaveAttribute('dir', 'rtl');
    expect(valueContainer()).toHaveAttribute('lang', 'he');
    expect(valueContainer()).toHaveAttribute('dir', 'rtl');
  });

  it('generates `<div>` as value part if `block` is `true`', async () => {
    render(generateContent({
      slots: [],
      stringContent: 'hello world',
      partsContent: [{value: 'foo'}, {value: 'bar'}],
      lang: 'he',
      dir: 'rtl',
      block: true,
    }), container);

    expect(valueContainer()).toBeInstanceOf(HTMLDivElement);
    expect(valueContainer()).toHaveAttribute('lang', 'he');
    expect(valueContainer()).toHaveAttribute('dir', 'rtl');
  });

  it('takes `nodeContent` as content', async () => {
    render(generateContent({
      slots: [],
      nodeContent: document.createElement('picture'),
    }), container);

    expect(valueContainer().children[0]).toBeInstanceOf(HTMLPictureElement);
  });

  it('generates part contents', async () => {
    render(generateContent({
      slots: [],
      partsContent: [
        {value: 'hello', type: 'fooFooFoo'},
        {value: ', ', unwrap: true},
        {value: 'world', type: 'bar', source: 'baz'},
        {value: '!'},
      ],
    }), container);

    expect(valueContainer().children[0]).toBeInstanceOf(HTMLSpanElement);
    expect(valueContainer().children[0])
        .toHaveAttribute('part', 'foo-foo-foo');
    expect(valueContainer().children[0]).toHaveAttribute('role', 'none');
    expect(valueContainer().children[0]!.textContent).toBe('hello');

    expect(valueContainer().children[1]).toBeInstanceOf(HTMLSpanElement);
    expect(valueContainer().children[1])
        .toHaveAttribute('part', 'bar baz');
    expect(valueContainer().children[1]).toHaveAttribute('role', 'none');
    expect(valueContainer().children[1]!.textContent)
        .toBe('world');

    expect(valueContainer().children[2]).toBeInstanceOf(HTMLSpanElement);
    expect(valueContainer().children[2]).not.toHaveAttribute('part');
    expect(valueContainer().children[2]).toHaveAttribute('role', 'none');
    expect(valueContainer().children[2]!.textContent)
        .toBe('!');

    const textNodes = Array.from(valueContainer().childNodes)
        .filter(node => node.nodeType === Node.TEXT_NODE);
    expect(textNodes.length).toBe(1);
    expect(textNodes[0]!.nodeValue).toBe(', ');
  });
});
