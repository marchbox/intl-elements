import {
  getCanonicalIntlOptionValue,
  getCanonicalOptionValue,
} from './properties';

describe('getCanonicalIntlOptionValue', () => {
  it('returns normalized values for supported keys', () => {
    expect(getCanonicalIntlOptionValue('calendar', 'GREGORY')).toBe('gregory');
    expect(getCanonicalIntlOptionValue('unit', 'yEaR')).toBe('year');
    expect(getCanonicalIntlOptionValue('currency', 'usd')).toBe('USD');
    expect(getCanonicalIntlOptionValue('timeZone', 'America/New_York'))
        .toBe('America/New_York');
  });

  it('returns an empty string to a unsupported value for a supported key', () => {
    expect(getCanonicalIntlOptionValue('calendar', 'foo')).toBe('');
    expect(getCanonicalIntlOptionValue('timeZone', 'foo')).toBe('');
    expect(getCanonicalIntlOptionValue('currency', 'foo')).toBe('');
  });

  it('returns the value as-is if it’s not a string or an empty string', () => {
    const foo = {};
    expect(getCanonicalIntlOptionValue('calendar', 1)).toBe(1);
    expect(getCanonicalIntlOptionValue('calendar', true)).toBe(true);
    expect(getCanonicalIntlOptionValue('calendar', null)).toBe(null);
    expect(getCanonicalIntlOptionValue('calendar', '')).toBe('');
    expect(getCanonicalIntlOptionValue('calendar', foo)).toBe(foo);
  });

  it('returns the value as-is if the key is not supported', () => {
    expect(getCanonicalIntlOptionValue('foo', 'bar')).toBe('bar');
    expect(getCanonicalIntlOptionValue('foo', 1)).toBe(1);
  });
});

describe('getCanonicalOptionValue', () => {
  it('converts property key to Intl key', () => {
    expect(getCanonicalOptionValue('optionCalendar', 'GREGORY'))
        .toBe(getCanonicalIntlOptionValue('calendar', 'GREGORY'));
    expect(getCanonicalOptionValue('optionTimeZone', 'America/New_York'))
        .toBe(getCanonicalIntlOptionValue('timeZone', 'America/New_York'));
    expect(getCanonicalOptionValue('optionCurrency', 'usd'))
        .toBe(getCanonicalIntlOptionValue('currency', 'usd'));
    expect(getCanonicalOptionValue('optionFoo', 1))
        .toBe(getCanonicalIntlOptionValue('foo', 1));
  });
});
