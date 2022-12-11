import {createTestPage} from '../../testing';
import AbstractPluralRulesConsumer from './abstract-pluralrules-consumer';

class TestIntlPluralRulesConsumerElement extends AbstractPluralRulesConsumer {
  #value: Intl.LDMLPluralRule | '' = '';

  get value(): Intl.LDMLPluralRule | '' {
    return this.#value;
  }

  override connectedCallback() {
    super.connectedCallback();

    this.#value = this.getAttribute('value') as Intl.LDMLPluralRule | '';
  }
}

customElements.define('test-consumer', TestIntlPluralRulesConsumerElement);

describe('AbstractPluralRulesConsumer', () => {
  it('gets correct single data and template content', async () => {
    await createTestPage({
      elements: ['intl-pluralrules', 'test-consumer'],
      html: `
        <intl-pluralrules locale="en">
          <test-consumer value="zero">
            <data value="1">one</data>
            <template slot="zero">zero</template>
            <template slot="one">one</template>
            <template slot="two">two</template>
            <template slot="few">few</template>
            <template slot="many">many</template>
            <template slot="other">other</template>
          </test-consumer>
        </intl-pluralrules>
      `,
    });
    const el = document.querySelector('test-consumer') as TestIntlPluralRulesConsumerElement;

    // @ts-ignore
    expect(el.data).toBe(1);
    // @ts-ignore
    expect(el.start).toBe(1);
    // @ts-ignore
    expect(el.end).toBeNaN();
    // @ts-ignore
    expect(el.content).toContainDocumentFragmentHtml('zero');
  });

  it('gets correct start and end data and template content', async () => {
    await createTestPage({
      elements: ['intl-pluralrules', 'test-consumer'],
      html: `
        <intl-pluralrules locale="en">
          <test-consumer value="one">
            <data value="1">one</data>
            <data value="10">ten</data>
            <template slot="zero">zero</template>
            <template slot="one">one</template>
            <template slot="two">two</template>
            <template slot="few">few</template>
            <template slot="many">many</template>
            <template slot="other">other</template>
          </test-consumer>
        </intl-pluralrules>
      `,
    });
    const el = document.querySelector('test-consumer') as TestIntlPluralRulesConsumerElement;

    // @ts-ignore
    expect(el.data).toBe(1);
    // @ts-ignore
    expect(el.start).toBe(1);
    // @ts-ignore
    expect(el.end).toBe(10);
    // @ts-ignore
    expect(el.content).toContainDocumentFragmentHtml('one');
  });

  it('gets correct start and end data from named slots and template content', async () => {
    await createTestPage({
      elements: ['intl-pluralrules', 'test-consumer'],
      html: `
        <intl-pluralrules locale="en">
          <test-consumer value="two">
            <data slot="start" value="1">one</data>
            <data slot="end" value="10">ten</data>
            <template slot="zero">zero</template>
            <template slot="one">one</template>
            <template slot="two">two</template>
            <template slot="few">few</template>
            <template slot="many">many</template>
            <template slot="other">other</template>
          </test-consumer>
        </intl-pluralrules>
      `,
    });
    const el = document.querySelector('test-consumer') as TestIntlPluralRulesConsumerElement;

    // @ts-ignore
    expect(el.data).toBeNaN();
    // @ts-ignore
    expect(el.start).toBe(1);
    // @ts-ignore
    expect(el.end).toBe(10);
    // @ts-ignore
    expect(el.content).toContainDocumentFragmentHtml('two');
  });

  it('gets correct data and template content from named slots regardless of their positions in DOM', async () => {
    await createTestPage({
      elements: ['intl-pluralrules', 'test-consumer'],
      html: `
        <intl-pluralrules locale="en">
          <test-consumer value="few">
            <template slot="other">other</template>
            <template slot="few">few</template>
            <data slot="end" value="10">ten</data>
            <template slot="two">two</template>
            <template slot="one">one</template>
            <data slot="start" value="1">one</data>
            <template slot="zero">zero</template>
            <template slot="many">many</template>
          </test-consumer>
        </intl-pluralrules>
      `,
    });
    const el = document.querySelector('test-consumer') as TestIntlPluralRulesConsumerElement;

    // @ts-ignore
    expect(el.data).toBeNaN();
    // @ts-ignore
    expect(el.start).toBe(1);
    // @ts-ignore
    expect(el.end).toBe(10);
    // @ts-ignore
    expect(el.content).toContainDocumentFragmentHtml('few');
  });

  it('gets correct data from the first named slots only', async () => {
    await createTestPage({
      elements: ['intl-pluralrules', 'test-consumer'],
      html: `
        <intl-pluralrules locale="en">
          <test-consumer value="many">
            <data slot="start" value="1">one</data>
            <data slot="start" value="2">two</data>
            <data slot="end" value="10">ten</data>
            <data slot="end" value="11">eleven</data>
            <template slot="zero">zero</template>
            <template slot="zero">0</template>
            <template slot="one">one</template>
            <template slot="one">1</template>
            <template slot="two">two</template>
            <template slot="two">2</template>
            <template slot="few">few</template>
            <template slot="few">++</template>
            <template slot="many">many</template>
            <template slot="many">**</template>
            <template slot="other">other</template>
            <template slot="other">??</template>
          </test-consumer>
        </intl-pluralrules>
      `,
    });
    const el = document.querySelector('test-consumer') as TestIntlPluralRulesConsumerElement;

    // @ts-ignore
    expect(el.data).toBeNaN();
    // @ts-ignore
    expect(el.start).toBe(1);
    // @ts-ignore
    expect(el.end).toBe(10);
    // @ts-ignore
    expect(el.content).toContainDocumentFragmentHtml('many');
  });

  it('gets correct data from default slots', async () => {
    await createTestPage({
      elements: ['intl-pluralrules', 'test-consumer'],
      html: `
        <intl-pluralrules locale="en">
          <test-consumer value="other">
            <data value="1">one</data>
            <data value="10">ten</data>
            <template slot="zero">zero</template>
            <template slot="one">one</template>
            <template slot="two">two</template>
            <template slot="few">few</template>
            <template slot="many">many</template>
            <template slot="other">other</template>
          </test-consumer>
        </intl-pluralrules>
      `,
    });
    const el = document.querySelector('test-consumer') as TestIntlPluralRulesConsumerElement;

    // @ts-ignore
    expect(el.data).toBe(1);
    // @ts-ignore
    expect(el.start).toBe(1);
    // @ts-ignore
    expect(el.end).toBe(10);
    // @ts-ignore
    expect(el.content).toContainDocumentFragmentHtml('other');
  });

  it('uses default slot template as `other`', async () => {
    await createTestPage({
      elements: ['intl-pluralrules', 'test-consumer'],
      html: `
        <intl-pluralrules locales="en">
          <test-consumer value="other">
            <data value="10">ten</data>
            <template>other</template>
          </test-consumer>
        </intl-pluralrules>
      `,
    });
    const el = document.querySelector('test-consumer') as TestIntlPluralRulesConsumerElement;

    expect(el.value).toBe('other');
    // @ts-ignore
    expect(el.content).toContainDocumentFragmentHtml('other');
  });

  it('uses `other`’s template as the fallback for any plural rule templates', async () => {
    await createTestPage({
      elements: ['intl-pluralrules', 'test-consumer'],
      html: `
        <intl-pluralrules locales="en">
          <test-consumer value="one">
            <data value="1">one</data>
            <template slot="other">other</template>
          </test-consumer>
        </intl-pluralrules>
      `,
    });
    const el = document.querySelector('test-consumer') as TestIntlPluralRulesConsumerElement;

    expect(el.value).toBe('one');
    // @ts-ignore
    expect(el.content).toContainDocumentFragmentHtml('other');
  });

  it('requires at least 1 `other` slotted template or default slot template', async () => {
    await createTestPage({
      elements: ['intl-pluralrules', 'test-consumer'],
      html: `
        <intl-pluralrules locales="en">
          <test-consumer value="one">
            <data value="1">one</data>
            <template slot="zero">zero</template>
          </test-consumer>
        </intl-pluralrules>
      `,
    });
    const el = document.querySelector('test-consumer') as TestIntlPluralRulesConsumerElement;

    // @ts-ignore
    expect(el.isValid).toBeFalse();
  });

  it('replaces `<ins>` with first slotted data value', async () => {
    await createTestPage({
      elements: ['intl-pluralrules', 'test-consumer'],
      html: `
        <intl-pluralrules locales="en">
          <test-consumer>
            <data value="1">one</data>
            <template>foo <ins></ins> bar</template>
          </test-consumer>
        </intl-pluralrules>
      `,
    });
    const el = document.querySelector('test-consumer') as TestIntlPluralRulesConsumerElement;

    // @ts-ignore
    expect(el.content).toContainDocumentFragmentHtml('foo 1 bar');
  });

  it('replaces `<ins>` with default slotted data value', async () => {
    await createTestPage({
      elements: ['intl-pluralrules', 'test-consumer'],
      html: `
        <intl-pluralrules locales="en">
          <test-consumer>
            <data value="1">one</data>
            <data value="2">two</data>
            <template>foo <ins></ins> bar <ins></ins> baz</template>
          </test-consumer>
        </intl-pluralrules>
      `,
    });
    const el = document.querySelector('test-consumer') as TestIntlPluralRulesConsumerElement;

    // @ts-ignore
    expect(el.content).toContainDocumentFragmentHtml('foo 1 bar 2 baz');
  });

  it('replaces `<ins>` with named slotted data value', async () => {
    await createTestPage({
      elements: ['intl-pluralrules', 'test-consumer'],
      html: `
        <intl-pluralrules locales="en">
          <test-consumer>
            <data slot="start" value="1">one</data>
            <data slot="end" value="2">two</data>
            <template>foo <ins></ins> bar <ins></ins> baz</template>
          </test-consumer>
        </intl-pluralrules>
      `,
    });
    const el = document.querySelector('test-consumer') as TestIntlPluralRulesConsumerElement;

    // @ts-ignore
    expect(el.content).toContainDocumentFragmentHtml('foo 1 bar 2 baz');
  });

  it('replaces `<ins>` with mixed slotted data value', async () => {
    await createTestPage({
      elements: ['intl-pluralrules', 'test-consumer'],
      html: `
        <intl-pluralrules locales="en">
          <test-consumer>
            <data value="1">one</data>
            <data slot="end" value="2">two</data>
            <template>foo <ins></ins> bar <ins></ins> baz</template>
          </test-consumer>
        </intl-pluralrules>
      `,
    });
    const el = document.querySelector('test-consumer') as TestIntlPluralRulesConsumerElement;

    // @ts-ignore
    expect(el.content).toContainDocumentFragmentHtml('foo 1 bar 2 baz');
  });
});
