import {describe, it, expect} from '@jest/globals';

import LocaleList from './locale-list';

describe('LocaleList', () => {
  it('returns and sets correct value', () => {
    const list = new LocaleList(Intl.DisplayNames, 'en-US en-GB');
    expect(list.value).toBe('en-US en-GB');
    expect(list.toString()).toBe('en-US en-GB');

    list.value = 'en-US en-AU';
    expect(list.value).toBe('en-US en-AU');
    expect(list.toString()).toBe('en-US en-AU');
  });

  it('returns the length of the list', async () => {
    const list = new LocaleList(Intl.DisplayNames, 'en-US en-GB');
    expect(list.length).toBe(2);

    list.value = 'en-US en-GB en-AU';
    expect(list.length).toBe(3);
  });

  it('uses item() to return correct member with given index', async () => {
    const list = new LocaleList(Intl.DisplayNames, 'en-US en-GB');
    expect(list.item(0)).toBe('en-US');
    expect(list.item(1)).toBe('en-GB');
    expect(list.item(2)).toBe(null);
  });

  it('uses contains() to check if the list contains given member', async () => {
    const list = new LocaleList(Intl.DisplayNames, 'en-US en-GB');
    expect(list.contains('en-US')).toBe(true);
    expect(list.contains('en-GB')).toBe(true);
    expect(list.contains('en-AU')).toBe(false);
  });

  it('uses add() to add given members to the list', async () => {
    const list = new LocaleList(Intl.DisplayNames, 'en-US en-GB');
    list.add('en-AU');
    expect(list.value).toBe('en-US en-GB en-AU');
    list.add('en-AU');
    expect(list.value).toBe('en-US en-GB en-AU');
  });

  it('uses remove() to remove given members from the list', async () => {
    const list = new LocaleList(Intl.DisplayNames, 'en-US en-GB');
    list.remove('en-US');
    expect(list.value).toBe('en-GB');
    list.remove('en-US');
    expect(list.value).toBe('en-GB');
  });

  it('uses toggle() to toggle given members in the list', async () => {
    const list = new LocaleList(Intl.DisplayNames, 'en-US en-GB');
    list.toggle('en-AU');
    expect(list.value).toBe('en-US en-GB en-AU');
    list.toggle('en-AU');
    expect(list.value).toBe('en-US en-GB');
    list.toggle('en-AU', true);
    expect(list.value).toBe('en-US en-GB en-AU');
    list.toggle('en-AU', false);
    expect(list.value).toBe('en-US en-GB');
  });

  it('uses replace() to replace given members in the list', async () => {
    const list = new LocaleList(Intl.DisplayNames, 'en-US en-GB');
    expect(list.replace('en-US', 'en-AU')).toBe(true);
    expect(list.value).toBe('en-AU en-GB');
    expect(list.replace('en-US', 'en-AU')).toBe(false);
    expect(list.value).toBe('en-AU en-GB');
  });

  it('uses entries() to return an iterator of the list', async () => {
    const list = new LocaleList(Intl.DisplayNames, 'en-US en-GB');
    const iterator = list.entries();
    expect(iterator.next().value).toEqual([0, 'en-US']);
    expect(iterator.next().value).toEqual([1, 'en-GB']);
    expect(iterator.next().done).toBe(true);
  });

  it('uses keys() to return an iterator of the list', async () => {
    const list = new LocaleList(Intl.DisplayNames, 'en-US en-GB');
    const iterator = list.keys();
    expect(iterator.next().value).toBe(0);
    expect(iterator.next().value).toBe(1);
    expect(iterator.next().done).toBe(true);
  });

  it('uses values() to return an iterator of the list', async () => {
    const list = new LocaleList(Intl.DisplayNames, 'en-US en-GB');
    const iterator = list.values();
    expect(iterator.next().value).toBe('en-US');
    expect(iterator.next().value).toBe('en-GB');
    expect(iterator.next().done).toBe(true);
  });

  it('uses forEach() to iterate over the list', async () => {
    const list = new LocaleList(Intl.DisplayNames, 'en-US en-GB');
    const values: string[] = [];
    list.forEach((value) => values.push(value));
    expect(values).toEqual(['en-US', 'en-GB']);
  });

  it('uses supports() to check if the item is supported', async () => {
    const list = new LocaleList(Intl.DisplayNames, 'en-US en-GB');
    expect(list.supports('zh')).toBe(true);
    expect(list.supports('zh-CN-u-ca-chinese')).toBe(true);
    expect(list.supports('invalid')).toBe(false);
    expect(list.supports('veryveryinvalid')).toBe(false);
  });

  it('uses [Symbol.iterator]() to return an iterator of the list', async () => {
    const list = new LocaleList(Intl.DisplayNames, 'en-US en-GB');
    const iterator = list[Symbol.iterator]();
    expect(iterator.next().value).toBe('en-US');
    expect(iterator.next().value).toBe('en-GB');
    expect(iterator.next().done).toBe(true);
  });
});
