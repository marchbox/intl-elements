import {createTestPage} from '../../testing/';
import HTMLIntlSegmenterElement from './segmenter-segment';

describe('intl-segmenter-segment', () => {
  it('has `value` property the same as Intl API result', async () => {
    await createTestPage({
      elements: ['intl-segmenter', 'intl-segmenter-segment'],
      html: `
        <intl-segmenter locales="en">
          <intl-segmenter-segment>
            Hello, world!
          </intl-segmenter-segment>
        </intl-segmenter>
      `,
    });
    const el = document.querySelector('intl-segmenter-segment') as HTMLIntlSegmenterElement;
    // @ts-ignore
    const intlResult = new Intl.Segmenter('en').segment('Hello, world!');

    expect(el.value).toEqual(intlResult);
  });

  it('hides slotted contents', async () => {
    await createTestPage({
      elements: ['intl-segmenter', 'intl-segmenter-segment'],
      html: `
        <intl-segmenter locales="en">
          <intl-segmenter-segment>
            Hello, world!
          </intl-segmenter-segment>
        </intl-segmenter>
      `,
    });
    const el = document.querySelector('intl-segmenter-segment') as HTMLIntlSegmenterElement;
    const span = el.shadowRoot?.querySelector('span[hidden]') as HTMLSlotElement;

    expect(span!).not.toBeVisible();
  });

  it('gets the correct text as input', async () => {
    await createTestPage({
      elements: ['intl-segmenter', 'intl-segmenter-segment'],
      html: `
        <intl-segmenter locales="en">
          <intl-segmenter-segment>
            Hello, world!
          </intl-segmenter-segment>
          <intl-segmenter-segment></intl-segmenter-segment>
        </intl-segmenter>
      `,
    });
    const els = document.querySelectorAll('intl-segmenter-segment') as NodeListOf<HTMLIntlSegmenterElement>;

    expect(els[0]!.input).toBe('Hello, world!');
    expect(els[1]!.input).toBe('');
  });

  it('updates when the text content changes', async () => {
    await createTestPage({
      elements: ['intl-segmenter', 'intl-segmenter-segment'],
      html: `
        <intl-segmenter locales="en">
          <intl-segmenter-segment>
            Hello, world!
          </intl-segmenter-segment>
        </intl-segmenter>
      `,
    });
    const el = document.querySelector('intl-segmenter-segment') as HTMLIntlSegmenterElement;
    // @ts-ignore
    const intlResult = new Intl.Segmenter('en').segment('Hello, moon!');

    el.textContent = 'Hello, moon!';
    await el.updateComplete;
    await el.updateComplete;

    expect(el.value).toEqual(intlResult);
  });

  it('renders Shadow Parts with grapheme granularity', async () => {
    await createTestPage({
      elements: ['intl-segmenter', 'intl-segmenter-segment'],
      html: `
        <intl-segmenter locales="en">
          <intl-segmenter-segment>
            Hello, world!
          </intl-segmenter-segment>
        </intl-segmenter>
      `,
    });
    const el = document.querySelector('intl-segmenter-segment') as HTMLIntlSegmenterElement;

    expect(el).toHaveShadowPart('segment');
    expect(el).not.toHaveShadowPart('wordlike');
  });

  it('renders Shadow Parts with word granularity', async () => {
    await createTestPage({
      elements: ['intl-segmenter', 'intl-segmenter-segment'],
      html: `
        <intl-segmenter locales="en" option-granularity="word">
          <intl-segmenter-segment>
            Hello, world!
          </intl-segmenter-segment>
        </intl-segmenter>
      `,
    });
    const el = document.querySelector('intl-segmenter-segment') as HTMLIntlSegmenterElement;

    expect(el).toHaveShadowPart('segment');
    expect(el).toHaveShadowPart('wordlike');
  });

  it('renders Shadow Parts with sentence granularity', async () => {
    await createTestPage({
      elements: ['intl-segmenter', 'intl-segmenter-segment'],
      html: `
        <intl-segmenter locales="en" option-granularity="sentence">
          <intl-segmenter-segment>
            Hello, world!
          </intl-segmenter-segment>
        </intl-segmenter>
      `,
    });
    const el = document.querySelector('intl-segmenter-segment') as HTMLIntlSegmenterElement;

    expect(el).toHaveShadowPart('segment');
    expect(el).not.toHaveShadowPart('wordlike');
  });
  
  it('adds `lang` and `dir` on the value part element', async () => {
    await createTestPage({
      elements: ['intl-segmenter', 'intl-segmenter-segment'],
      html: `
        <intl-segmenter locales="ar" option-granularity="sentence">
          <intl-segmenter-segment>
            Hello, world!
          </intl-segmenter-segment>
        </intl-segmenter>
      `,
    });
    const el = document.querySelector('intl-segmenter-segment') as HTMLIntlSegmenterElement;
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
