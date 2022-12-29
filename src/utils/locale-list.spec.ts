import {createLocaleList} from './locale-list';

function waitOnChanges() {
  return new Promise(process.nextTick);
}

class FakeIntlObj {
  static supportedLocalesOf(list: string | string[]) {
    const supportedLocales = ['en-US', 'en-GB', 'en-AU', 'en-CA', 'en-IN',
        'zh-CN', 'zh-TW', 'zh-HK'];
    if (list.includes('veryveryinvalid')) {
      throw new RangeError();
    }
    if (Array.isArray(list)) {
      return list.filter(locale => supportedLocales.includes(locale));
    } else if (typeof list === 'string') {
      return supportedLocales.includes(list) ? [list] : [];
    }
    return [];
  }
}

describe('createLocaleList', () => {
  it('returns and sets correct value', async () => {
    const onChange = jest.fn();
    const {localeList: list} = createLocaleList(
      // @ts-ignore
      FakeIntlObj,
      'en-US en-GB',
      onChange
    );

    expect(list.value).toBe('en-US en-GB');
    expect(list.valueAsArray).toEqual(['en-US', 'en-GB']);
    expect(list.toString()).toBe('en-US en-GB');

    list.value = 'en-US en-AU';
    await waitOnChanges();

    expect(list.value).toBe('en-US en-AU');
    expect(list.valueAsArray).toEqual(['en-US', 'en-AU']);
    expect(list.toString()).toBe('en-US en-AU');
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it('returns the length of the list', async () => {
    // @ts-ignore
    const {localeList: list} = createLocaleList(FakeIntlObj, 'en-US en-GB');

    expect(list.length).toBe(2);

    list.value = 'en-US en-GB en-AU';
    expect(list.length).toBe(3);
  });

  it('uses item() to return correct member with given index', async () => {
    // @ts-ignore
    const {localeList: list} = createLocaleList(FakeIntlObj, 'en-US en-GB');

    expect(list.item(0)).toBe('en-US');
    expect(list.item(1)).toBe('en-GB');
    expect(list.item(2)).toBe(null);
  });

  it('uses contains() to check if the list contains given member', async () => {
    // @ts-ignore
    const {localeList: list} = createLocaleList(FakeIntlObj, 'en-US en-GB');

    expect(list.contains('en-US')).toBe(true);
    expect(list.contains('en-GB')).toBe(true);
    expect(list.contains('en-AU')).toBe(false);
  });

  it('uses add() to add given members to the list', async () => {
    const onChange = jest.fn();
    const {localeList: list} = createLocaleList(
      // @ts-ignore
      FakeIntlObj,
      'en-US en-GB',
      onChange
    );

    list.add('en-AU');
    await waitOnChanges();

    expect(list.value).toBe('en-US en-GB en-AU');
    expect(onChange).toHaveBeenCalledTimes(1);
    onChange.mockClear();

    list.add('en-AU');
    await waitOnChanges();

    expect(list.value).toBe('en-US en-GB en-AU');
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it('uses remove() to remove given members from the list', async () => {
    const onChange = jest.fn();
    const {localeList: list} = createLocaleList(
      // @ts-ignore
      FakeIntlObj,
      'en-US en-GB',
      onChange
    );

    list.remove('en-US');
    await waitOnChanges();

    expect(list.value).toBe('en-GB');
    expect(onChange).toHaveBeenCalledTimes(1);
    onChange.mockClear();

    list.remove('en-US');
    await waitOnChanges();

    expect(list.value).toBe('en-GB');
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it('uses toggle() to toggle given members in the list', async () => {
    const onChange = jest.fn();
    const {localeList: list} = createLocaleList(
      // @ts-ignore
      FakeIntlObj,
      'en-US en-GB',
      onChange
    );

    expect(list.toggle('en-AU')).toBe(true);
    await waitOnChanges();

    expect(list.value).toBe('en-US en-GB en-AU');
    expect(onChange).toHaveBeenCalledTimes(1);
    onChange.mockClear();

    expect(list.toggle('en-AU')).toBe(false);
    await waitOnChanges();

    expect(list.value).toBe('en-US en-GB');
    expect(onChange).toHaveBeenCalledTimes(1);
    onChange.mockClear();

    expect(list.toggle('en-AU', true)).toBe(true);
    await waitOnChanges();

    expect(list.value).toBe('en-US en-GB en-AU');
    expect(onChange).toHaveBeenCalledTimes(1);
    onChange.mockClear();

    expect(list.toggle('en-AU', false)).toBe(false);
    await waitOnChanges();

    expect(list.value).toBe('en-US en-GB');
    expect(onChange).toHaveBeenCalledTimes(1);
    onChange.mockClear();

    expect(list.toggle('en-AU', false)).toBe(false);
    await waitOnChanges();

    expect(onChange).not.toHaveBeenCalled();
  });

  it('uses replace() to replace given members in the list', async () => {
    const onChange = jest.fn();
    const {localeList: list} = createLocaleList(
      // @ts-ignore
      FakeIntlObj,
      'en-US en-GB',
      onChange
    );

    expect(list.replace('en-US', 'en-AU')).toBe(true);
    await waitOnChanges();

    expect(list.value).toBe('en-AU en-GB');
    expect(onChange).toHaveBeenCalledTimes(1);
    onChange.mockClear();

    expect(list.replace('en-US', 'en-AU')).toBe(false);
    await waitOnChanges();

    expect(list.value).toBe('en-AU en-GB');
    expect(onChange).not.toHaveBeenCalled();
  });

  it('uses entries() to return an iterator of the list', async () => {
    // @ts-ignore
    const {localeList: list} = createLocaleList(FakeIntlObj, 'en-US en-GB');
    const iterator = list.entries();

    expect(iterator.next().value).toEqual([0, 'en-US']);
    expect(iterator.next().value).toEqual([1, 'en-GB']);
    expect(iterator.next().done).toBe(true);
  });

  it('uses keys() to return an iterator of the list', async () => {
    // @ts-ignore
    const {localeList: list} = createLocaleList(FakeIntlObj, 'en-US en-GB');
    const iterator = list.keys();

    expect(iterator.next().value).toBe(0);
    expect(iterator.next().value).toBe(1);
    expect(iterator.next().done).toBe(true);
  });

  it('uses values() to return an iterator of the list', async () => {
    // @ts-ignore
    const {localeList: list} = createLocaleList(FakeIntlObj, 'en-US en-GB');
    const iterator = list.values();

    expect(iterator.next().value).toBe('en-US');
    expect(iterator.next().value).toBe('en-GB');
    expect(iterator.next().done).toBe(true);
  });

  it('uses forEach() to iterate over the list', async () => {
    // @ts-ignore
    const {localeList: list} = createLocaleList(FakeIntlObj, 'en-US en-GB');
    const values: string[] = [];

    list.forEach((value) => values.push(value));
    expect(values).toEqual(['en-US', 'en-GB']);
  });

  it('uses supports() to check if the item is supported', async () => {
    // @ts-ignore
    const {localeList: list} = createLocaleList(FakeIntlObj, 'en-US en-GB');

    expect(list.supports('zh-CN')).toBe(true);
    expect(list.supports('invalid')).toBe(false);
    expect(list.supports('veryveryinvalid')).toBe(false);
  });

  it('uses [Symbol.iterator]() to return an iterator of the list', async () => {
    // @ts-ignore
    const {localeList: list} = createLocaleList(FakeIntlObj, 'en-US en-GB');
    const iterator = list[Symbol.iterator]();

    expect(iterator.next().value).toBe('en-US');
    expect(iterator.next().value).toBe('en-GB');
    expect(iterator.next().done).toBe(true);
  });

  it('returns correct member with given index via bracket notion', async () => {
    // @ts-ignore
    const {localeList: list} = createLocaleList(FakeIntlObj, 'en-US en-GB');

    expect(list[0]).toBe('en-US');
    expect(list[1]).toBe('en-GB');
    expect(list[2]).toBeUndefined();

    list.add('en-AU', 'en-CA');
    expect(list[2]).toBe('en-AU');
    expect(list[3]).toBe('en-CA');
    expect(list[4]).toBeUndefined();

    list.remove('en-GB');
    expect(list[1]).toBe('en-AU');
    expect(list[3]).toBeUndefined();

    list.toggle('en-US');
    expect(list[0]).toBe('en-AU');
    expect(list[1]).toBe('en-CA');
    expect(list[2]).toBeUndefined();

    list.replace('en-CA', 'en-IN');
    expect(list[1]).toBe('en-IN');

    list.value = 'zh-CN zh-TW zh-HK';
    expect(list[0]).toBe('zh-CN');
    expect(list[1]).toBe('zh-TW');
    expect(list[2]).toBe('zh-HK');
    expect(list[3]).toBeUndefined();
  });

  it('ignores setting values via bracket notion', async () => {
    // @ts-ignore
    const {localeList: list} = createLocaleList(FakeIntlObj, 'en-US en-GB');

    expect(() => list[1] = 'en-AU').toThrow();
    expect(list[1]).toBe('en-GB');
  });

  it('adds invalid locales', async () => {
    const {localeList: list} = createLocaleList(
      // @ts-ignore
      FakeIntlObj,
      'en-US en-GB invalid'
    );

    expect(list.value).toBe('en-US en-GB invalid');
  });

  it.todo('disconnects the observer when the list is destroyed');
  it.todo('doesn’t create observer if `onChange` isn’t a function');
});
