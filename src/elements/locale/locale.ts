import {LitElement, nothing} from 'lit';
import {property} from 'lit/decorators.js';

import {optionProperty} from '../../utils/properties.js';

type LocaleValue = Intl.Locale | null;

export default class HTMLIntlLocaleElement extends LitElement {
  get value(): LocaleValue {
    return this.#getLocale();
  }

  get valueAsString(): Intl.BCP47LanguageTag | '' {
    return this.#getLocale()?.toString() ?? '';
  }

  @property({reflect: true})
  tag!: string;

  @optionProperty()
  optionBaseName?: Intl.LocaleOptions['baseName'];

  get baseName(): Intl.Locale['baseName'] | undefined {
    return this.#getLocale()?.baseName ?? undefined;
  }

  @optionProperty()
  optionCalendar?: Intl.LocaleOptions['calendar'];

  get calendar(): Intl.Locale['calendar'] | undefined {
    return this.#getLocale()?.calendar ?? undefined;
  }

  get calendars(): Intl.Locale['calendars'] | undefined {
    return this.#getLocale()?.calendars ?? undefined;
  }

  @optionProperty()
  optionCaseFirst?: Intl.LocaleOptions['caseFirst'];

  get caseFirst(): Intl.Locale['caseFirst'] | undefined {
    return this.#getLocale()?.caseFirst ?? undefined;
  }

  @optionProperty()
  optionCollation?: Intl.LocaleOptions['collation'];

  get collation(): Intl.Locale['collation'] | undefined {
    return this.#getLocale()?.collation ?? undefined;
  }

  @optionProperty()
  optionHourCycle?: Intl.LocaleOptions['hourCycle'];

  get hourCycle(): Intl.Locale['hourCycle'] | undefined {
    return this.#getLocale()?.hourCycle ?? undefined;
  }

  get hourCycles(): Intl.Locale['hourCycles'] | undefined {
    return this.#getLocale()?.hourCycles ?? undefined;
  }

  @optionProperty()
  optionLanguage?: Intl.LocaleOptions['language'];

  get language(): Intl.Locale['language'] | undefined {
    return this.#getLocale()?.language ?? undefined;
  }

  @optionProperty()
  optionNumberingSystem?: Intl.LocaleOptions['numberingSystem'];

  get numberingSystem(): Intl.Locale['numberingSystem'] | undefined {
    return this.#getLocale()?.numberingSystem ?? undefined;
  }

  get numberingSystems(): Intl.Locale['numberingSystems'] | undefined {
    return this.#getLocale()?.numberingSystems ?? undefined;
  }

  @optionProperty({type: Boolean})
  optionNumeric?: Intl.LocaleOptions['numeric'];

  get numeric(): Intl.Locale['numeric'] | undefined {
    return this.#getLocale()?.numeric ?? undefined;
  }

  @optionProperty()
  optionRegion?: Intl.LocaleOptions['region'];

  get region(): Intl.Locale['region'] | undefined {
    return this.#getLocale()?.region ?? undefined;
  }

  @optionProperty()
  optionScript?: Intl.LocaleOptions['script'];

  get script(): Intl.Locale['script'] | undefined {
    return this.#getLocale()?.script ?? undefined;
  }

  get textInfo(): Intl.Locale['textInfo'] | undefined {
    return this.#getLocale()?.textInfo ?? undefined;
  }

  get timeZones(): Intl.Locale['timeZones'] | undefined {
    return this.#getLocale()?.timeZones ?? undefined;
  }

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
