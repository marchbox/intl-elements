import LocaleList from './locale-list';

class FakeIntlObj {
  static supportedLocalesOf(list: string | string[]) {
    const supportedLocales = ['en-US', 'en-GB', 'en-AU', 'en-CA', 'zh'];
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

describe('LocaleList', () => {
  it('returns and sets correct value', () => {
    // @ts-ignore
    const list = new LocaleList(FakeIntlObj, 'en-US en-GB');
    const onChange1 = jest.fn();
    const onChange2 = jest.fn();
    list.onChange(onChange1);
    list.onChange(onChange2);

    expect(list.value).toBe('en-US en-GB');
    expect(list.toString()).toBe('en-US en-GB');

    list.value = 'en-US en-AU';
    expect(list.value).toBe('en-US en-AU');
    expect(list.toString()).toBe('en-US en-AU');
    expect(onChange1).toHaveBeenCalledTimes(1);
    expect(onChange1).toHaveBeenCalledWith(list);
    expect(onChange2).toHaveBeenCalledTimes(1);
    expect(onChange2).toHaveBeenCalledWith(list);
  });

  it('returns the length of the list', async () => {
    // @ts-ignore
    const list = new LocaleList(FakeIntlObj, 'en-US en-GB');

    expect(list.length).toBe(2);

    list.value = 'en-US en-GB en-AU';
    expect(list.length).toBe(3);
  });

  it('uses item() to return correct member with given index', async () => {
    // @ts-ignore
    const list = new LocaleList(FakeIntlObj, 'en-US en-GB');

    expect(list.item(0)).toBe('en-US');
    expect(list.item(1)).toBe('en-GB');
    expect(list.item(2)).toBe(null);
  });

  it('uses contains() to check if the list contains given member', async () => {
    // @ts-ignore
    const list = new LocaleList(FakeIntlObj, 'en-US en-GB');

    expect(list.contains('en-US')).toBe(true);
    expect(list.contains('en-GB')).toBe(true);
    expect(list.contains('en-AU')).toBe(false);
  });

  it('uses add() to add given members to the list', async () => {
    // @ts-ignore
    const list = new LocaleList(FakeIntlObj, 'en-US en-GB');
    const onChange1 = jest.fn();
    const onChange2 = jest.fn();
    list.onChange(onChange1);
    list.onChange(onChange2);

    list.add('en-AU');
    expect(list.value).toBe('en-US en-GB en-AU');
    expect(onChange1).toHaveBeenCalledTimes(1);
    expect(onChange2).toHaveBeenCalledTimes(1);
    onChange1.mockClear();
    onChange2.mockClear();

    list.add('en-AU');
    expect(list.value).toBe('en-US en-GB en-AU');
    expect(onChange1).not.toHaveBeenCalled();
    expect(onChange2).not.toHaveBeenCalled();
  });

  it('uses remove() to remove given members from the list', async () => {
    // @ts-ignore
    const list = new LocaleList(FakeIntlObj, 'en-US en-GB');
    const onChange1 = jest.fn();
    const onChange2 = jest.fn();
    list.onChange(onChange1);
    list.onChange(onChange2);

    list.remove('en-US');
    expect(list.value).toBe('en-GB');
    expect(onChange1).toHaveBeenCalledTimes(1);
    expect(onChange2).toHaveBeenCalledTimes(1);
    onChange1.mockClear();
    onChange2.mockClear();

    list.remove('en-US');
    expect(list.value).toBe('en-GB');
    expect(onChange1).not.toHaveBeenCalled();
    expect(onChange2).not.toHaveBeenCalled();
  });

  it('uses toggle() to toggle given members in the list', async () => {
    // @ts-ignore
    const list = new LocaleList(FakeIntlObj, 'en-US en-GB');
    const onChange1 = jest.fn();
    const onChange2 = jest.fn();
    list.onChange(onChange1);
    list.onChange(onChange2);

    expect(list.toggle('en-AU')).toBe(true);
    expect(list.value).toBe('en-US en-GB en-AU');
    expect(onChange1).toHaveBeenCalledTimes(1);
    expect(onChange2).toHaveBeenCalledTimes(1);
    onChange1.mockClear();
    onChange2.mockClear();

    expect(list.toggle('en-AU')).toBe(false);
    expect(list.value).toBe('en-US en-GB');
    expect(onChange1).toHaveBeenCalledTimes(1);
    expect(onChange2).toHaveBeenCalledTimes(1);
    onChange1.mockClear();
    onChange2.mockClear();

    expect(list.toggle('en-AU', true)).toBe(true);
    expect(list.value).toBe('en-US en-GB en-AU');
    expect(onChange1).toHaveBeenCalledTimes(1);
    expect(onChange2).toHaveBeenCalledTimes(1);
    onChange1.mockClear();
    onChange2.mockClear();

    expect(list.toggle('en-AU', false)).toBe(false);
    expect(list.value).toBe('en-US en-GB');
    expect(onChange1).toHaveBeenCalledTimes(1);
    expect(onChange2).toHaveBeenCalledTimes(1);
    onChange1.mockClear();
    onChange2.mockClear();

    expect(list.toggle('en-AU', false)).toBe(false);
    expect(onChange1).not.toHaveBeenCalled();
    expect(onChange2).not.toHaveBeenCalled();
  });

  it('uses replace() to replace given members in the list', async () => {
    // @ts-ignore
    const list = new LocaleList(FakeIntlObj, 'en-US en-GB');
    const onChange1 = jest.fn();
    const onChange2 = jest.fn();
    list.onChange(onChange1);
    list.onChange(onChange2);

    expect(list.replace('en-US', 'en-AU')).toBe(true);
    expect(list.value).toBe('en-AU en-GB');
    expect(onChange1).toHaveBeenCalledTimes(1);
    expect(onChange2).toHaveBeenCalledTimes(1);
    onChange1.mockClear();
    onChange2.mockClear();

    expect(list.replace('en-US', 'en-AU')).toBe(false);
    expect(list.value).toBe('en-AU en-GB');
    expect(onChange1).not.toHaveBeenCalled();
    expect(onChange2).not.toHaveBeenCalled();
  });

  it('uses entries() to return an iterator of the list', async () => {
    // @ts-ignore
    const list = new LocaleList(FakeIntlObj, 'en-US en-GB');
    const iterator = list.entries();

    expect(iterator.next().value).toEqual([0, 'en-US']);
    expect(iterator.next().value).toEqual([1, 'en-GB']);
    expect(iterator.next().done).toBe(true);
  });

  it('uses keys() to return an iterator of the list', async () => {
    // @ts-ignore
    const list = new LocaleList(FakeIntlObj, 'en-US en-GB');
    const iterator = list.keys();

    expect(iterator.next().value).toBe(0);
    expect(iterator.next().value).toBe(1);
    expect(iterator.next().done).toBe(true);
  });

  it('uses values() to return an iterator of the list', async () => {
    // @ts-ignore
    const list = new LocaleList(FakeIntlObj, 'en-US en-GB');
    const iterator = list.values();

    expect(iterator.next().value).toBe('en-US');
    expect(iterator.next().value).toBe('en-GB');
    expect(iterator.next().done).toBe(true);
  });

  it('uses forEach() to iterate over the list', async () => {
    // @ts-ignore
    const list = new LocaleList(FakeIntlObj, 'en-US en-GB');
    const values: string[] = [];

    list.forEach((value) => values.push(value));
    expect(values).toEqual(['en-US', 'en-GB']);
  });

  it('uses supports() to check if the item is supported', async () => {
    // @ts-ignore
    const list = new LocaleList(FakeIntlObj, 'en-US en-GB');

    expect(list.supports('zh')).toBe(true);
    expect(list.supports('invalid')).toBe(false);
    expect(list.supports('veryveryinvalid')).toBe(false);
  });

  it('uses [Symbol.iterator]() to return an iterator of the list', async () => {
    // @ts-ignore
    const list = new LocaleList(FakeIntlObj, 'en-US en-GB');
    const iterator = list[Symbol.iterator]();

    expect(iterator.next().value).toBe('en-US');
    expect(iterator.next().value).toBe('en-GB');
    expect(iterator.next().done).toBe(true);
  });

  // TODO: Figure out how to access members via bracket notation (if possible)
  it.skip('returns correct member with given index via bracket notion', async () => {
    // @ts-ignore
    const list = new LocaleList(FakeIntlObj, 'en-US en-GB');

    expect(list[0]).toBe('en-US');
    expect(list[1]).toBe('en-GB');
    expect(list[2]).toBe(undefined);
  });

  it('removes invalid locales', async () => {
    // @ts-ignore
    const list = new LocaleList(FakeIntlObj, 'en-US en-GB invalid');

    expect(list.value).toBe('en-US en-GB');
  });
});
