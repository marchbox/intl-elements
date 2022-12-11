import {createTestPage} from '../../testing';
import HTMLIntlPluralRulesSelectElement from './pluralrules-select';

describe('intl-pluralrules-select', () => {
  it('has `value` property the same as Intl API result', async () => {
    await createTestPage({
      elements: ['intl-pluralrules', 'intl-pluralrules-select'],
      html: `
        <intl-pluralrules locales="ar" option-type="ordinal">
          <intl-pluralrules-select>
            <data value="10"></data>
            <template></template>
          </intl-pluralrules-select>
        </intl-pluralrules>
      `,
    });
    const el = document.querySelector('intl-pluralrules-select') as HTMLIntlPluralRulesSelectElement;
    const intlResult = new Intl.PluralRules('zh', {
      type: 'ordinal'
    }).select(1);

    expect(el!.value).toBe(intlResult);
  });

  it('has its content same as the template content', async () => {
    await createTestPage({
      elements: ['intl-pluralrules', 'intl-pluralrules-select'],
      html: `
        <intl-pluralrules locales="ar" option-type="ordinal">
          <intl-pluralrules-select>
            <data value="10"></data>
            <template>Total of <ins></ins> dogs</template>
          </intl-pluralrules-select>
        </intl-pluralrules>
      `,
    });
    const el = document.querySelector('intl-pluralrules-select') as HTMLIntlPluralRulesSelectElement;
    const shadow = el.shadowRoot! as ShadowRoot;
    const span = shadow.querySelector('span') as HTMLSpanElement;

    expect(span).toHaveTextContent('Total of 10 dogs');
  });

  it('renders when number is 0', async () => {
    await createTestPage({
      elements: ['intl-pluralrules', 'intl-pluralrules-select'],
      html: `
        <intl-pluralrules locales="ar">
          <intl-pluralrules-select>
            <data value="0"></data>
            <template></template>
          </intl-pluralrules-select>
        </intl-pluralrules>
      `,
    });
    const el = document.querySelector('intl-pluralrules-select') as HTMLIntlPluralRulesSelectElement;
    const intlResult = new Intl.PluralRules('ar').select(0);

    expect(el.value).toBe(intlResult);
  });

  it('hides slotted contents', async () => {
    await createTestPage({
      elements: ['intl-pluralrules', 'intl-pluralrules-select'],
      html: `
        <intl-pluralrules locales="ar" option-type="ordinal">
          <intl-pluralrules-select>
            <data value="10"></data>
            <template></template>
          </intl-pluralrules-select>
        </intl-pluralrules>
      `,
    });
    const el = document.querySelector('intl-pluralrules-select') as HTMLIntlPluralRulesSelectElement;
    const span = el.shadowRoot?.querySelector('span[hidden]') as HTMLSlotElement;

    expect(span!).not.toBeVisible();
  });

  it('renders an empty string without a valid number', async () => {
    await createTestPage({
      elements: ['intl-pluralrules', 'intl-pluralrules-select'],
      html: `
        <intl-pluralrules locales="ar" option-type="ordinal">
          <intl-pluralrules-select>
            <data value="not a number"></data>
            <template></template>
          </intl-pluralrules-select>
          <intl-pluralrules-select>
            <data></data>
            <template></template>
          </intl-pluralrules-select>
        </intl-pluralrules>
      `,
    });
    const els = document.querySelectorAll('intl-pluralrules-select') as NodeListOf<HTMLIntlPluralRulesSelectElement>;

    expect(els[0]!.value).toBe('');
    expect(els[0]!.shadowRoot!.querySelector('span')).toHaveTextContent('');
    expect(els[1]!.value).toBe('');
    expect(els[1]!.shadowRoot!.querySelector('span')).toHaveTextContent('');
  });

  it('renders Shadow Parts', async () => {
    await createTestPage({
      elements: ['intl-pluralrules', 'intl-pluralrules-select'],
      html: `
        <intl-pluralrules locales="ar" option-type="ordinal">
          <intl-pluralrules-select>
            <data value="10"></data>
            <template></template>
          </intl-pluralrules-select>
        </intl-pluralrules>
      `,
    });
    const el = document.querySelector('intl-pluralrules-select') as HTMLIntlPluralRulesSelectElement;

    expect(el).toHaveShadowPartsCount('value', 1);
  });
  
  it('adds `lang` and `dir` on the value part element', async () => {
    await createTestPage({
      elements: ['intl-pluralrules', 'intl-pluralrules-select'],
      html: `
        <intl-pluralrules locales="ar">
          <intl-pluralrules-select>
            <data value="10"></data>
            <template></template>
          </intl-pluralrules-select>
        </intl-pluralrules>
      `,
    });
    const el = document.querySelector('intl-pluralrules-select') as HTMLIntlPluralRulesSelectElement;
    const span = el.shadowRoot!.querySelector('span');

    expect(span).toHaveAttribute('lang', 'ar');
    expect(span).toHaveAttribute('dir', 'rtl');

    el.providerElement!.locales = 'en';
    await el.updateComplete;
    await el.updateComplete;

    expect(span).toHaveAttribute('lang', 'en');
    expect(span).not.toHaveAttribute('dir');

    el.providerElement!.locales = '$invalid';
    await el.updateComplete;
    await el.updateComplete;

    expect(span).not.toHaveAttribute('lang');
    expect(span).not.toHaveAttribute('dir');
  });
});
