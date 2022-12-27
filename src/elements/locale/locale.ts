import {LitElement, nothing} from 'lit';
import {property} from 'lit/decorators.js';

import {optionProperty} from '../../utils/properties.js';

type LocaleValue = Intl.Locale | null;

/**
 * @intl Intl.Locale()
 * @intlsee http://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Locale/Locale
 *
 * @element intl-locale
 */
export default class HTMLIntlLocaleElement extends LitElement {
  /** @readonly */
  get value(): LocaleValue {
    return this.#getLocale();
  }

  /** @readonly */
  get valueAsString(): Intl.BCP47LanguageTag | '' {
    return this.#getLocale()?.toString() ?? '';
  }

  @property({reflect: true})
  tag!: string;

  @optionProperty()
  optionBaseName?: Intl.LocaleOptions['baseName'];

  /**
   * @intl Intl.Locale.prototype.baseName
   * @intlsee http://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Locale/baseName
   * @readonly
   */
  get baseName(): Intl.Locale['baseName'] | undefined {
    return this.#getLocale()?.baseName ?? undefined;
  }

  @optionProperty()
  optionCalendar?: Intl.LocaleOptions['calendar'];

  /**
   * @intl Intl.Locale.prototype.calendar
   * @intlsee http://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Locale/calendar
   * @readonly
   */
  get calendar(): Intl.Locale['calendar'] | undefined {
    return this.#getLocale()?.calendar ?? undefined;
  }

  /**
   * @intl Intl.Locale.prototype.calendars
   * @intlsee http://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Locale/calendars
   * @readonly
   */
  get calendars(): Intl.Locale['calendars'] | undefined {
    return this.#getLocale()?.calendars ?? undefined;
  }

  @optionProperty()
  optionCaseFirst?: Intl.LocaleOptions['caseFirst'];

  /**
   * @intl Intl.Locale.prototype.caseFirst
   * @intlsee http://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Locale/caseFirst
   * @readonly
   */
  get caseFirst(): Intl.Locale['caseFirst'] | undefined {
    return this.#getLocale()?.caseFirst ?? undefined;
  }

  @optionProperty()
  optionCollation?: Intl.LocaleOptions['collation'];

  /**
   * @intl Intl.Locale.prototype.collation
   * @intlsee http://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Locale/collation
   * @readonly
   */
  get collation(): Intl.Locale['collation'] | undefined {
    return this.#getLocale()?.collation ?? undefined;
  }

  @optionProperty()
  optionHourCycle?: Intl.LocaleOptions['hourCycle'];

  /**
   * @intl Intl.Locale.prototype.hourCycle
   * @intlsee http://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Locale/hourCycle
   * @readonly
   */
  get hourCycle(): Intl.Locale['hourCycle'] | undefined {
    return this.#getLocale()?.hourCycle ?? undefined;
  }

  /**
   * @intl Intl.Locale.prototype.hourCycles
   * @intlsee http://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Locale/hourCycles
   * @readonly
   */
  get hourCycles(): Intl.Locale['hourCycles'] | undefined {
    return this.#getLocale()?.hourCycles ?? undefined;
  }

  @optionProperty()
  optionLanguage?: Intl.LocaleOptions['language'];

  /**
   * @intl Intl.Locale.prototype.language
   * @intlsee http://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Locale/language
   * @readonly
   */
  get language(): Intl.Locale['language'] | undefined {
    return this.#getLocale()?.language ?? undefined;
  }

  @optionProperty()
  optionNumberingSystem?: Intl.LocaleOptions['numberingSystem'];

  /**
   * @intl Intl.Locale.prototype.numberingSystem
   * @intlsee http://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Locale/numberingSystem
   * @readonly
   */
  get numberingSystem(): Intl.Locale['numberingSystem'] | undefined {
    return this.#getLocale()?.numberingSystem ?? undefined;
  }

  /**
   * @intl Intl.Locale.prototype.numberingSystems
   * @intlsee http://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Locale/numberingSystems
   * @readonly
   */
  get numberingSystems(): Intl.Locale['numberingSystems'] | undefined {
    return this.#getLocale()?.numberingSystems ?? undefined;
  }

  @optionProperty({type: Boolean})
  optionNumeric?: Intl.LocaleOptions['numeric'];

  /**
   * @intl Intl.Locale.prototype.numeric
   * @intlsee http://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Locale/numeric
   * @readonly
   */
  get numeric(): Intl.Locale['numeric'] | undefined {
    return this.#getLocale()?.numeric ?? undefined;
  }

  @optionProperty()
  optionRegion?: Intl.LocaleOptions['region'];

  /**
   * @intl Intl.Locale.prototype.region
   * @intlsee http://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Locale/region
   * @readonly
   */
  get region(): Intl.Locale['region'] | undefined {
    return this.#getLocale()?.region ?? undefined;
  }

  @optionProperty()
  optionScript?: Intl.LocaleOptions['script'];

  /**
   * @intl Intl.Locale.prototype.script
   * @intlsee http://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Locale/script
   * @readonly
   */
  get script(): Intl.Locale['script'] | undefined {
    return this.#getLocale()?.script ?? undefined;
  }

  /**
   * @intl Intl.Locale.prototype.textInfo
   * @intlsee http://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Locale/textInfo
   * @readonly
   */
  get textInfo(): Intl.Locale['textInfo'] | undefined {
    return this.#getLocale()?.textInfo ?? undefined;
  }

  /**
   * @intl Intl.Locale.prototype.timeZones
   * @intlsee http://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Locale/timeZones
   * @readonly
   */
  get timeZones(): Intl.Locale['timeZones'] | undefined {
    return this.#getLocale()?.timeZones ?? undefined;
  }

  /**
   * @intl Intl.Locale.prototype.weekInfo
   * @intlsee http://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Locale/weekInfo
   * @readonly
   */
  get weekInfo(): Intl.Locale['weekInfo'] | undefined {
    return this.#getLocale()?.weekInfo ?? undefined;
  }

  protected override createRenderRoot() {
    // No shadow DOM.
    return this;
  }

  /**
   * @intl Intl.Locale.prototype.maximize()
   * @intlsee http://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Locale/maximize
   */
  maximize(): LocaleValue {
    return this.#getLocale()?.maximize() ?? null;
  }

  /**
   * @intl Intl.Locale.prototype.minimize()
   * @intlsee http://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Locale/minimize
   */
  minimize(): LocaleValue {
    return this.#getLocale()?.minimize() ?? null;
  }

  #getLocale(): LocaleValue {
    try {
      return new Intl.Locale(this.tag, {
        baseName: this.optionBaseName,
        calendar: this.optionCalendar,
        caseFirst: this.optionCaseFirst,
        collation: this.optionCollation,
        hourCycle: this.optionHourCycle,
        language: this.optionLanguage,
        numberingSystem: this.optionNumberingSystem,
        numeric: this.optionNumeric,
        region: this.optionRegion,
        script: this.optionScript,
      });
    } catch {}

    return null;
  }

  override render() {
    return nothing;
  }
}
