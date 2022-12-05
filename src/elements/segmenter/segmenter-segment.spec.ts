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
            <template><span><ins></ins></span></template>
          </intl-segmenter-segment>
        </intl-segmenter>
      `,
    });
    const el = document.querySelector('intl-segmenter-segment') as HTMLIntlSegmenterElement;
    // @ts-ignore
    const intlResult = new Intl.Segmenter('en').segment('Hello, world!');

    expect(el.value).toEqual(intlResult);
  });

  it('gets the correct text as input', async () => {
    await createTestPage({
      elements: ['intl-segmenter', 'intl-segmenter-segment'],
      html: `
        <intl-segmenter locales="en">
          <intl-segmenter-segment>
            Hello, world!
            <template><span><ins></ins></span></template>
          </intl-segmenter-segment>
        </intl-segmenter>
      `,
    });
    const el = document.querySelector('intl-segmenter-segment') as HTMLIntlSegmenterElement;

    expect(el.input).toBe('Hello, world!');
  });
});
