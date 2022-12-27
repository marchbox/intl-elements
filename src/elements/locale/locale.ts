import {LitElement, nothing} from 'lit';
import {property} from 'lit/decorators.js';

import {optionProperty} from '../../utils/properties.js';

type LocaleValue = Intl.Locale | null;

/**
 * @intl `Intl.Locale`
 * @mdn http://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Locale/Locale
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

  /** @readonly */
  get baseName(): Intl.Locale['baseName'] | undefined {
    return this.#getLocale()?.baseName ?? undefined;
  }

  @optionProperty()
  optionCalendar?: Intl.LocaleOptions['calendar'];

  /** @readonly */
  get calendar(): Intl.Locale['calendar'] | undefined {
    return this.#getLocale()?.calendar ?? undefined;
  }

  /** @readonly */
  get calendars(): Intl.Locale['calendars'] | undefined {
    return this.#getLocale()?.calendars ?? undefined;
  }

  @optionProperty()
  optionCaseFirst?: Intl.LocaleOptions['caseFirst'];

  /** @readonly */
  get caseFirst(): Intl.Locale['caseFirst'] | undefined {
    return this.#getLocale()?.caseFirst ?? undefined;
  }

  @optionProperty()
  optionCollation?: Intl.LocaleOptions['collation'];

  /** @readonly */
  get collation(): Intl.Locale['collation'] | undefined {
    return this.#getLocale()?.collation ?? undefined;
  }

  @optionProperty()
  optionHourCycle?: Intl.LocaleOptions['hourCycle'];

  /** @readonly */
  get hourCycle(): Intl.Locale['hourCycle'] | undefined {
    return this.#getLocale()?.hourCycle ?? undefined;
  }

  /** @readonly */
  get hourCycles(): Intl.Locale['hourCycles'] | undefined {
    return this.#getLocale()?.hourCycles ?? undefined;
  }

  @optionProperty()
  optionLanguage?: Intl.LocaleOptions['language'];

  /** @readonly */
  get language(): Intl.Locale['language'] | undefined {
    return this.#getLocale()?.language ?? undefined;
  }

  @optionProperty()
  optionNumberingSystem?: Intl.LocaleOptions['numberingSystem'];

  /** @readonly */
  get numberingSystem(): Intl.Locale['numberingSystem'] | undefined {
    return this.#getLocale()?.numberingSystem ?? undefined;
  }

  /** @readonly */
  get numberingSystems(): Intl.Locale['numberingSystems'] | undefined {
    return this.#getLocale()?.numberingSystems ?? undefined;
  }

  @optionProperty({type: Boolean})
  optionNumeric?: Intl.LocaleOptions['numeric'];

  /** @readonly */
  get numeric(): Intl.Locale['numeric'] | undefined {
    return this.#getLocale()?.numeric ?? undefined;
  }

  @optionProperty()
  optionRegion?: Intl.LocaleOptions['region'];

  /** @readonly */
  get region(): Intl.Locale['region'] | undefined {
    return this.#getLocale()?.region ?? undefined;
  }

  @optionProperty()
  optionScript?: Intl.LocaleOptions['script'];

  /** @readonly */
  get script(): Intl.Locale['script'] | undefined {
    return this.#getLocale()?.script ?? undefined;
  }

  /** @readonly */
  get textInfo(): Intl.Locale['textInfo'] | undefined {
    return this.#getLocale()?.textInfo ?? undefined;
  }

  /** @readonly */
  get timeZones(): Intl.Locale['timeZones'] | undefined {
    return this.#getLocale()?.timeZones ?? undefined;
  }

  /** @readonly */
  get weekInfo(): Intl.Locale['weekInfo'] | undefined {
    return this.#getLocale()?.weekInfo ?? undefined;
  }

  protected override createRenderRoot() {
    // No shadow DOM.
    return this;
  }

  maximize(): LocaleValue {
    return this.#getLocale()?.maximize() ?? null;
  }

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
