import {camelToKebab} from './strings';

describe('camelToKebab()', () => {
  it('converts camelCase to kebab-case', () => {
    expect(camelToKebab('camelCase')).toBe('camel-case');
    expect(camelToKebab('camelCaseMore')).toBe('camel-case-more');
  });
});
