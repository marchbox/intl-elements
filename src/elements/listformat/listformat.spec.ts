import {describe, it, expect} from '@jest/globals';

import {createTestPage} from '../../testing';
import HTMLIntlListItemElement from '../listitem/listitem';
import HTMLIntlListFormatElement from './listformat';

function getTextContent(el: HTMLIntlListFormatElement) {
  const clonedEl = el.cloneNode(true) as HTMLIntlListFormatElement;
  clonedEl.querySelectorAll('intl-listitem')
      .forEach((el: HTMLIntlListItemElement) => el.remove());
  return clonedEl.textContent?.trim() || '';
}

describe('intl-listformat', () => {
  it('updates result text when both props and attributes change', async () => {
    const page = await createTestPage<HTMLIntlListFormatElement>({
      element: ['intl-listformat', 'intl-listitem'],
      html: `
        <intl-listformat locales="en">
          <intl-listitem>foo</intl-listitem>
          <intl-listitem>bar</intl-listitem>
          <intl-listitem>baz</intl-listitem>
          <intl-listitem>qux</intl-listitem>
        </intl-listformat>
      `,
    });
    const el = page.element!;

    expect(getTextContent(el)).toBe('foo, bar, baz, and qux');

    el.setAttribute('locales', 'zh-Hant');
    await el.updateComplete;
    expect(getTextContent(el)).toBe('foo、bar、baz和qux');
  });

  it('produces consistent result as the Intl API', async () => {
    const page = await createTestPage<HTMLIntlListFormatElement>({
      element: ['intl-listformat', 'intl-listitem'],
      html: `
        <intl-listformat locales="en">
          <intl-listitem>foo</intl-listitem>
          <intl-listitem>bar</intl-listitem>
          <intl-listitem>baz</intl-listitem>
          <intl-listitem>qux</intl-listitem>
        </intl-listformat>
      `,
    });

    // @ts-ignore
    let intlResult = new Intl.ListFormat('en').format([
      'foo', 'bar', 'baz', 'qux']);
    expect(getTextContent(page.element)).toBe(intlResult);
  });

  it('has `value` property the same as its text content', async () => {
    const page = await createTestPage<HTMLIntlListFormatElement>({
      element: 'intl-listformat',
      html: `
        <intl-listformat locales="ar">
          <intl-listitem>foo</intl-listitem>
          <intl-listitem>bar</intl-listitem>
          <intl-listitem>baz</intl-listitem>
          <intl-listitem>qux</intl-listitem>
        </intl-listformat>
      `,
    });

    expect(page.element!.value).toBe(getTextContent(page.element));
  });

  it('handles multiple locales and ignores invalid ones', async () => {
    const page = await createTestPage<HTMLIntlListFormatElement>({
      element: ['intl-listformat', 'intl-listitem'],
      html: `
        <intl-listformat locales="invalid zh en">
          <intl-listitem>foo</intl-listitem>
          <intl-listitem>bar</intl-listitem>
          <intl-listitem>baz</intl-listitem>
          <intl-listitem>qux</intl-listitem>
        </intl-listformat>
      `,
    });
    const el = page.element;

    // @ts-ignore
    let intlResult = new Intl.ListFormat('zh').format([
      'foo', 'bar', 'baz', 'qux']);

    expect(getTextContent(el)).toBe(intlResult);
  });

  it('reacts to intl-listitem children changes', async () => {
    const page = await createTestPage<HTMLIntlListFormatElement>({
      element: ['intl-listformat', 'intl-listitem'],
      html: `
        <intl-listformat locales="de">
          <intl-listitem>foo</intl-listitem>
          <intl-listitem>bar</intl-listitem>
          <intl-listitem>baz</intl-listitem>
          <intl-listitem>qux</intl-listitem>
        </intl-listformat>
      `,
    });
    const el = page.element;

    // @ts-ignore
    let intlResult = new Intl.ListFormat('de').format([
      'foo', 'bar', 'baz', 'qux']);

    expect(el.list).toEqual(['foo', 'bar', 'baz', 'qux']);
    expect(getTextContent(el)).toBe(intlResult);

    el.append(
      Object.assign(document.createElement('intl-listitem'), {
        textContent: 'hello',
      }),
      Object.assign(document.createElement('intl-listitem'), {
        textContent: 'world',
      }),
    );
    el.querySelector('intl-listitem:nth-child(2)')!.remove();

    // TODO: look into why this triggers 2 update cycles.
    await el.updateComplete;
    await el.updateComplete;

    expect(el.list).toEqual(['foo', 'baz', 'qux', 'hello', 'world']);
    // @ts-ignore
    intlResult = new Intl.ListFormat('de').format([
        'foo', 'baz', 'qux', 'hello', 'world']);
    expect(getTextContent(el)).toBe(intlResult);

    el.querySelector('intl-listitem:last-child')!.textContent = 'moon';
    await el.updateComplete;
    await el.updateComplete;

    expect(el.list).toEqual(['foo', 'baz', 'qux', 'hello', 'moon']);
    // @ts-ignore
    intlResult = new Intl.ListFormat('de').format([
        'foo', 'baz', 'qux', 'hello', 'moon']);
    expect(getTextContent(el)).toBe(intlResult);
  });

  it('returns correct resolved options', async () => {
    const page = await createTestPage<HTMLIntlListFormatElement>({
      element: ['intl-listformat', 'intl-listitem'],
      html: `
        <intl-listformat locales="de" intl-style="narrow" type="unit">
          <intl-listitem>foo</intl-listitem>
          <intl-listitem>bar</intl-listitem>
          <intl-listitem>baz</intl-listitem>
          <intl-listitem>qux</intl-listitem>
        </intl-listformat>
      `,
    });
    const el = page.element;

    // @ts-ignore
    const intlResult = new Intl.ListFormat('de', {
      type: 'unit',
      style: 'narrow',
    }).resolvedOptions();

    expect(el.resolvedOptions()).toEqual(intlResult);
  });

  it('returns correct formatted parts', async () => {
    const page = await createTestPage<HTMLIntlListFormatElement>({
      element: ['intl-listformat', 'intl-listitem'],
      html: `
        <intl-listformat locales="de" intl-style="narrow" type="unit">
          <intl-listitem>foo</intl-listitem>
          <intl-listitem>bar</intl-listitem>
          <intl-listitem>baz</intl-listitem>
          <intl-listitem>qux</intl-listitem>
        </intl-listformat>
      `,
    });
    const el = page.element;

    // @ts-ignore
    const intlResult = new Intl.ListFormat('de', {
      type: 'unit',
      style: 'narrow',
    }).formatToParts(['foo', 'bar', 'baz', 'qux']);

    expect(el.formatToParts()).toEqual(intlResult);
  });

  it('trims list item text', async () => {
    const page = await createTestPage<HTMLIntlListFormatElement>({
      element: ['intl-listformat', 'intl-listitem'],
      html: `
        <intl-listformat locales="de">
          <intl-listitem> foo </intl-listitem>
          <intl-listitem>bar </intl-listitem>
          <intl-listitem> baz   </intl-listitem>
          <intl-listitem> qux </intl-listitem>
        </intl-listformat>
      `,
    });
    const el = page.element;

    // @ts-ignore
    let intlResult = new Intl.ListFormat('de').format([
      'foo', 'bar', 'baz', 'qux']);

    expect(getTextContent(el)).toBe(intlResult);
  });

  it('ignores empty list items', async () => {
    const page = await createTestPage<HTMLIntlListFormatElement>({
      element: ['intl-listformat', 'intl-listitem'],
      html: `
        <intl-listformat locales="de">
          <intl-listitem>foo</intl-listitem>
          <intl-listitem></intl-listitem>
          <intl-listitem>baz</intl-listitem>
          <intl-listitem></intl-listitem>
        </intl-listformat>
      `,
    });
    const el = page.element;

    // @ts-ignore
    const intlResult = new Intl.ListFormat('de').format(['foo', 'baz']);

    expect(el.list).toEqual(['foo', 'baz']);
    expect(getTextContent(el)).toBe(intlResult);
  });
});
