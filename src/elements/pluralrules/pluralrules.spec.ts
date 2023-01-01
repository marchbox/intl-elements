import {createTestPage} from '../../testing';
import HTMLIntlPluralRulesElement from './pluralrules';

describe('intl-pluralrules', () => {
  it('returns correct resolved options', async () => {
    await createTestPage({
      elements: ['intl-pluralrules'],
      html: `
        <intl-pluralrules locales="de"></intl-pluralrules>
      `,
    });
    const el = document.querySelector('intl-pluralrules') as HTMLIntlPluralRulesElement;
    // @ts-ignore
    const intlResult = new Intl.PluralRules('de').resolvedOptions();

    expect(el.resolvedOptions()).toEqual(intlResult);
  });

  it('normalizes locales', async () => {
    await createTestPage({
      elements: ['intl-pluralrules'],
      html: `
        <intl-pluralrules locales="ar_eg"></intl-pluralrules>
      `,
    });
    const el = document.querySelector('intl-pluralrules') as HTMLIntlPluralRulesElement;
    const intlLocale = new Intl.PluralRules('ar-EG').resolvedOptions().locale;

    expect(el.resolvedOptions().locale).toBe(intlLocale);
  });

  it('picks the runtime default locale if no valid locale specified', async () => {
    await createTestPage({
      elements: ['intl-pluralrules'],
      html: `
        <intl-pluralrules locales="$$invalid"></intl-pluralrules>
      `,
    });
    const el = document.querySelector('intl-pluralrules') as HTMLIntlPluralRulesElement;
    const defaultLocale = new Intl.PluralRules().resolvedOptions().locale;

    expect(el.resolvedOptions().locale).toBe(defaultLocale);
  });
});
