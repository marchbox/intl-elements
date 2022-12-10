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

  it.todo('throws an error if any child node is neither a template nor a data element');
});
