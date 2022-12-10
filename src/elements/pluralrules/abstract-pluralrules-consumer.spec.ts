import {createTestPage} from '../../testing';
import AbstractPluralRulesConsumer from './abstract-pluralrules-consumer';

class TestIntlPluralRulesConsumerElement extends AbstractPluralRulesConsumer {
  #value: Intl.LDMLPluralRule | '' = '';

  get value(): Intl.LDMLPluralRule | '' {
    return this.#value;
  }
}

customElements.define('test-consumer', TestIntlPluralRulesConsumerElement);

describe('AbstractPluralRulesConsumer', () => {
  it('gets correct single data and template content', async () => {
    await createTestPage({
      elements: ['intl-pluralrules', 'test-consumer'],
      html: `
        <intl-pluralrules locale="en">
          <test-consumer>
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
    expect(el.zero).toContainTemplateHTML('zero');
    // @ts-ignore
    expect(el.one).toContainTemplateHTML('one');
    // @ts-ignore
    expect(el.two).toContainTemplateHTML('two');
    // @ts-ignore
    expect(el.few).toContainTemplateHTML('few');
    // @ts-ignore
    expect(el.many).toContainTemplateHTML('many');
    // @ts-ignore
    expect(el.other).toContainTemplateHTML('other');
  });

  it('gets correct start and end data and template content', async () => {
    await createTestPage({
      elements: ['intl-pluralrules', 'test-consumer'],
      html: `
        <intl-pluralrules locale="en">
          <test-consumer>
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
    expect(el.zero).toContainTemplateHTML('zero');
    // @ts-ignore
    expect(el.one).toContainTemplateHTML('one');
    // @ts-ignore
    expect(el.two).toContainTemplateHTML('two');
    // @ts-ignore
    expect(el.few).toContainTemplateHTML('few');
    // @ts-ignore
    expect(el.many).toContainTemplateHTML('many');
    // @ts-ignore
    expect(el.other).toContainTemplateHTML('other');
  });

  it('gets correct start and end data from named slots and template content', async () => {
    await createTestPage({
      elements: ['intl-pluralrules', 'test-consumer'],
      html: `
        <intl-pluralrules locale="en">
          <test-consumer>
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
    expect(el.zero).toContainTemplateHTML('zero');
    // @ts-ignore
    expect(el.one).toContainTemplateHTML('one');
    // @ts-ignore
    expect(el.two).toContainTemplateHTML('two');
    // @ts-ignore
    expect(el.few).toContainTemplateHTML('few');
    // @ts-ignore
    expect(el.many).toContainTemplateHTML('many');
    // @ts-ignore
    expect(el.other).toContainTemplateHTML('other');
  });

  it('gets correct data and template content from named slots regardless of their positions in DOM', async () => {
    await createTestPage({
      elements: ['intl-pluralrules', 'test-consumer'],
      html: `
        <intl-pluralrules locale="en">
          <test-consumer>
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
    expect(el.zero).toContainTemplateHTML('zero');
    // @ts-ignore
    expect(el.one).toContainTemplateHTML('one');
    // @ts-ignore
    expect(el.two).toContainTemplateHTML('two');
    // @ts-ignore
    expect(el.few).toContainTemplateHTML('few');
    // @ts-ignore
    expect(el.many).toContainTemplateHTML('many');
    // @ts-ignore
    expect(el.other).toContainTemplateHTML('other');
  });

  it('gets correct data from the first named slots only', async () => {
    await createTestPage({
      elements: ['intl-pluralrules', 'test-consumer'],
      html: `
        <intl-pluralrules locale="en">
          <test-consumer>
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
    expect(el.zero).toContainTemplateHTML('zero');
    // @ts-ignore
    expect(el.one).toContainTemplateHTML('one');
    // @ts-ignore
    expect(el.two).toContainTemplateHTML('two');
    // @ts-ignore
    expect(el.few).toContainTemplateHTML('few');
    // @ts-ignore
    expect(el.many).toContainTemplateHTML('many');
    // @ts-ignore
    expect(el.other).toContainTemplateHTML('other');
  });

  it('gets correct data from default slots', async () => {
    await createTestPage({
      elements: ['intl-pluralrules', 'test-consumer'],
      html: `
        <intl-pluralrules locale="en">
          <test-consumer>
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
    expect(el.zero).toContainTemplateHTML('zero');
    // @ts-ignore
    expect(el.one).toContainTemplateHTML('one');
    // @ts-ignore
    expect(el.two).toContainTemplateHTML('two');
    // @ts-ignore
    expect(el.few).toContainTemplateHTML('few');
    // @ts-ignore
    expect(el.many).toContainTemplateHTML('many');
    // @ts-ignore
    expect(el.other).toContainTemplateHTML('other');
  });

  it.todo('requires at least 1 `other` slotted template or default slot template');

  it.todo('uses default slot template as `other`');

  it.todo('uses `other`’s template as the fallback for any plural rule templates');
});
