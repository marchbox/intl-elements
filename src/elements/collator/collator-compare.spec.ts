import HTMLIntlCollatorCompareElement from './collator-compare';
import {createTestPage} from '../../testing';

describe('intl-collator-compare', () => {
  it('has `value` property the same as Intl API result for sort', async () => {
    await createTestPage({
      elements: ['intl-collator', 'intl-collator-compare'],
      html: `
        <intl-collator locales="zh-u-co-pinyin">
          <intl-collator-compare>
            <div slot="list">
              <div>铁拐李</div>
              <div>张果老</div>
              <div>何仙姑</div>
              <div>蓝采和</div>
              <div>汉钟离</div>
              <div>曹国舅</div>
              <div>吕洞宾</div>
              <div>韩湘子</div>
            </div>
          </intl-collator-compare>
        </intl-collator>
      `,
    });
    const el = document.querySelector('intl-collator-compare') as HTMLIntlCollatorCompareElement;
    // @ts-ignore
    const intlResult = [
      '铁拐李',
      '张果老',
      '何仙姑',
      '蓝采和',
      '汉钟离',
      '曹国舅',
      '吕洞宾',
      '韩湘子',
    ].sort(new Intl.Collator('zh-u-co-pinyin').compare);

    expect(el.value).toEqual(intlResult);
  });

  it('has `value` property the same as Intl API result for search', async () => {
    await createTestPage({
      elements: ['intl-collator', 'intl-collator-compare'],
      html: `
        <intl-collator locales="fr" option-usage="search" option-sensitivity="base">
          <intl-collator-compare>
            <data slot="target" value="congres"></data>
            <ol slot="list">
              <li>Congrès</li>
              <li>congres</li>
              <li>Assemblée</li>
              <li>poisson</li>
            </ol>
          </intl-collator-compare>
        </intl-collator>
      `,
    });
    const el = document.querySelector('intl-collator-compare') as HTMLIntlCollatorCompareElement;
    // @ts-ignore
    const intlResult = [
      'Congrès',
      'congres',
      'Assemblée',
      'poisson',
    ].filter(el =>
        new Intl.Collator('fr', {
          usage: 'search',
          sensitivity: 'base'
        }).compare(el, 'congres') === 0);

    expect(el.value).toEqual(intlResult);
  });

  it('hides slotted contents', async () => {
    await createTestPage({
      elements: ['intl-collator', 'intl-collator-compare'],
      html: `
        <intl-collator locales="zh-u-co-pinyin">
          <intl-collator-compare>
            <div slot="list">
              <div>铁拐李</div>
              <div>张果老</div>
              <div>何仙姑</div>
              <div>蓝采和</div>
              <div>汉钟离</div>
              <div>曹国舅</div>
              <div>吕洞宾</div>
              <div>韩湘子</div>
            </div>
          </intl-collator-compare>
        </intl-collator>
      `,
    });
    const el = document.querySelector('intl-collator-compare') as HTMLIntlCollatorCompareElement;
    const span = el.shadowRoot?.querySelector('span[hidden]') as HTMLSlotElement;

    expect(span!).not.toBeVisible();
  });

  it('gets the text content of each list item element as the input', async () => {
    await createTestPage({
      elements: ['intl-collator', 'intl-collator-compare'],
      html: `
        <intl-collator locales="en">
          <intl-collator-compare>
            <div slot="list">
              <figure><blockquote>D</blockquote></figure>
              <span>B</span>
              <div>A</div>
              <p>C</p>
            </div>
          </intl-collator-compare>
        </intl-collator>
      `,
    });
    const el = document.querySelector('intl-collator-compare') as HTMLIntlCollatorCompareElement;
    const div = el.shadowRoot?.querySelector('div[role="none"] > div');
    const {children} = div!;

    expect(div).not.toHaveAttribute('slot');
    expect(children[0]).toContainHTML(`<div>A</div>`);
    expect(children[1]).toContainHTML(`<span>B</span>`);
    expect(children[2]).toContainHTML(`<p>C</p>`);
    expect(children[3])
        .toContainHTML(`<figure><blockquote>D</blockquote></figure>`);
  });

  it('updates when the content changes', async () => {
    await createTestPage({
      elements: ['intl-collator', 'intl-collator-compare'],
      html: `
        <intl-collator locales="en">
          <intl-collator-compare>
            <div slot="list">
              <figure><blockquote>D</blockquote></figure>
              <span>B</span>
              <input value="E">
              <div>A</div>
              <p>C</p>
            </div>
          </intl-collator-compare>
        </intl-collator>
      `,
    });
    const el = document.querySelector('intl-collator-compare') as HTMLIntlCollatorCompareElement;
    const list = el.querySelector('div[slot="list"]')!;

    expect(el.value).toEqual(['', 'A', 'B', 'C', 'D']);

    list.querySelector('div')!.textContent = 'E';
    await el.updateComplete;
    await el.updateComplete;
    expect(el.value).toEqual(['', 'B', 'C', 'D', 'E']);

    list.querySelector('span')!.classList.add('foo');
    await el.updateComplete;
    await el.updateComplete;
    expect(el.value).toEqual(['', 'B', 'C', 'D', 'E']);

    const newDiv = document.createElement('div');
    newDiv.textContent = 'F';
    list.append(newDiv);
    await el.updateComplete;
    await el.updateComplete;
    expect(el.value).toEqual(['', 'B', 'C', 'D', 'E', 'F']);

    const newTextArea = document.createElement('textarea');
    newTextArea.innerHTML = '0';
    list.append(newTextArea);
    await el.updateComplete;
    await el.updateComplete;
    expect(el.value).toEqual(['', '0', 'B', 'C', 'D', 'E', 'F']);

    list.removeAttribute('slot');
    await el.updateComplete;
    await el.updateComplete;
    expect(el.value).toEqual([]);
  });

  it('gets the correct target text for search', async () => {
    await createTestPage({
      elements: ['intl-collator', 'intl-collator-compare'],
      html: `
        <intl-collator locales="fr" option-usage="search" option-sensitivity="base">
          <intl-collator-compare>
            <data slot="target" value="congres"></data>
            <ol slot="list">
              <li>Congrès</li>
              <li>congres</li>
              <li>Assemblée</li>
              <li>poisson</li>
            </ol>
          </intl-collator-compare>
        </intl-collator>
      `,
    });
    const el = document.querySelector('intl-collator-compare') as HTMLIntlCollatorCompareElement;
    let div = el.shadowRoot?.querySelector('div[role="none"] > ol')!;

    expect(div.children[0]).toContainHTML('<li>Congrès</li>');
    expect(div.children[1]).toContainHTML('<li>congres</li>');

    const data = el.querySelector('data[slot="target"]')!;
    data.setAttribute('value', 'assemblee');
    await el.updateComplete;
    await el.updateComplete;
    div = el.shadowRoot?.querySelector('div[role="none"] > ol')!;
    expect(div.children.length).toBe(1);
    expect(div.children[0]).toContainHTML('<li>Assemblée</li>');

    data.setAttribute('value', 'foo');
    await el.updateComplete;
    await el.updateComplete;
    div = el.shadowRoot?.querySelector('div[role="none"] > ol')!;
    expect(div.children.length).toBe(0);
  });

  it('adds `lang` and `dir` on the value part element', async () => {
    await createTestPage({
      elements: ['intl-collator', 'intl-collator-compare'],
      html: `
        <intl-collator locales="zh-u-co-pinyin">
          <intl-collator-compare>
            <div slot="list">
              <div>铁拐李</div>
              <div>张果老</div>
              <div>何仙姑</div>
              <div>蓝采和</div>
              <div>汉钟离</div>
              <div>曹国舅</div>
              <div>吕洞宾</div>
              <div>韩湘子</div>
            </div>
          </intl-collator-compare>
        </intl-collator>
      `,
    });
    const el = document.querySelector('intl-collator-compare') as HTMLIntlCollatorCompareElement;
    const div = el.shadowRoot!.querySelector('div');

    expect(div).toHaveAttribute('lang', 'zh-u-co-pinyin');
    expect(div).not.toHaveAttribute('dir');

    el.providerElement!.locales = 'ar';
    await el.updateComplete;
    await el.updateComplete;

    expect(div).toHaveAttribute('lang', 'ar');
    expect(div).toHaveAttribute('dir', 'rtl');

    el.providerElement!.locales = '$invalid';
    await el.updateComplete;
    await el.updateComplete;

    expect(div).not.toHaveAttribute('lang');
    expect(div).not.toHaveAttribute('dir');
  });
});
