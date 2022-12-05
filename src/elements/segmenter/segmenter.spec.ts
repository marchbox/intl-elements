import {createTestPage} from '../../testing';
import HTMLIntlSegmenterElement from './segmenter';

describe('intl-segmenter', () => {
  it('returns correct resolved options', async () => {
    await createTestPage({
      elements: ['intl-segmenter'],
      html: `
        <intl-segmenter locales="de"></intl-segmenter>
      `,
    });
    const el = document.querySelector('intl-segmenter') as HTMLIntlSegmenterElement;
    // @ts-ignore
    const intlResult = new Intl.Segmenter('de').resolvedOptions();

    expect(el.resolvedOptions()).toEqual(intlResult);
  });

  it.todo('throws an error if any child node is neither a template element nor a text node');
});
