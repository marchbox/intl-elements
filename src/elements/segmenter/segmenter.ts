import {nothing} from 'lit';

import AbstractProvider from '../abstract-provider.js';
import {optionProperty} from '../../utils/properties.js';

/**
 * @summary A custom element for [Intl.Segmenter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Segmenter)
 *
 * `intl-segmenter` elements can be used to separate a string with
 * language-sensitive sematic segmentation.
 *
 * A particularly useful case is a page title used in a hero area of a webpage.
 * Usually this kind of title is used in a graphical way, and often in languages
 * like Chinese and Japanese, because they are written in characters without
 * spaces to separate words, they could result in awkward line breaks. For
 * example, the Chinese sentence, “欢迎来到我的网站！” (Welcome to my website), has
 * the following semantic segments:
 *
 * + “欢迎” (“Welcome”)
 * + “来到” (“to”)
 * + “我的” (“my”)
 * + “网站” (“website”)
 * + “！” (exclamation mark)
 *
 * But it could be broken into:
 *
 * ```
 * 欢迎来到我
 * 的网站！
 * ```
 * (The word “我的” is broken into two lines)
 *
 * The ideal result should be:
 * 
 * ```
 * 欢迎来到
 * 我的网站！
 * ```
 *
 * The `<intl-segmenter-segment>` element takes its own `textContent`, segments
 * it, and wraps each segment in a `<span part="segment">` element in its shadow
 * DOM. For the above case, the `<intl-segmenter>` element should have its
 * `option-granularity` attribute set to `word`, and the `<span>` elements in
 * the Shadow DOM will have to `wordlike` as their parts, and non-wordlike
 * segments are not wrapped in a `<span>`, this makes sure that punctuation
 * segments will stay in the appropriate line between line breaks (e.g. a comma
 * won’t be at the beginning of a line and an opening quotation mark won’t be at
 * the beginning of a line).
 *
 * @example Segmenting a string into words
 * ```html
 * <style>.title-content::part(wordlike) { white-space: nowrap; }</style>
 * <intl-segmenter locales="zh-Hans" option-granularity="word">
 *   <h1>
 *     <intl-segmenter-segment class="title-content">
 *       欢迎来到我的网站！
 *     </intl-segmenter-segment>
 *   </h1>
 * </intl-segmenter>
 * ```
 *
 * @intl Intl.Segmenter()
 * @intlsee http://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Segmenter/Segmenter
 * @intlprovider
 *
 * @element intl-segmenter
 */
export default class HTMLIntlSegmenterElement extends AbstractProvider {
  protected static override intlApi = Intl.Segmenter;

  protected static override consumerElementNames = new Set([
    'intl-segmenter-segment',
  ]);

  #intlObject!: Intl.Segmenter;

  #resolvedOptions!: Intl.ResolvedSegmenterOptions;

  @optionProperty()
  optionGranularity?: Intl.SegmenterOptions['granularity'];

  /** @readonly */
  get intlObject(): Intl.Segmenter {
    return this.#intlObject;
  }

  /**
   * @intl Intl.Segmenter.prototype.resolvedOptions()
   * @intlsee http://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Segmenter/resolvedOptions
   */
  resolvedOptions(): Intl.ResolvedSegmenterOptions {
    return this.#resolvedOptions;
  }

  override render() {
    try {
      this.#intlObject = new Intl.Segmenter(
        Array.from(this.localeList.values()),
        {
          granularity: this.optionGranularity,
          localeMatcher: this.optionLocaleMatcher,
        }
      );
      this.#resolvedOptions = this.#intlObject.resolvedOptions();
    } catch {}

    return nothing;
  }
}