import {describe, it, expect} from '@jest/globals';

import {createTestPage} from '../../testing';
import HTMLIntlSegmenterElement from './segmenter';

describe('intl-segmenter', () => {
  it.skip('renders document fragment based on the given user template', async () => {
    const page = await createTestPage<HTMLIntlSegmenterElement>({
      element: ['intl-segmenter', 'intl-output'],
      html: `
        <intl-segmenter locales="en" option-granularity="word">
          Hello, world!!
          <template>
            <span><intl-output /></span>
          </template>
        </intl-segmenter>
      `,
    });
    const el = page.element;

    expect(el.valueAsHTMLString).toBe('<span>Hello</span><span>,</span><span>world</span><span>!</span><span>!</span>');
  });

  it.todo('throws an error if any child node is neither a template element nor a text node');
});
