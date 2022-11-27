import {LitElement, nothing} from 'lit';

import {property} from 'lit/decorators.js';

type LocaleValue = Intl.Locale | null;

export default class extends LitElement {
  get value(): LocaleValue {
    return this.#getLocale();
  }

  get valueAsString(): Intl.BCP47LanguageTag | '' {
    return this.#getLocale()?.toString() ?? '';
  }

  @property({reflect: true})
  tag!: string;

  @property({attribute: 'display-string', reflect: true, type: Boolean})
  displayString = false;

  @property({attribute: 'display-maximized', reflect: true, type: Boolean})
  displayMaximized = false;

  @property({attribute: 'display-minimized', reflect: true, type: Boolean})
  displayMinimized = false;

  @property({attribute: 'option-basename'})
  optionBaseName?: string;

  get baseName(): string | undefined {
    return this.#getLocale()?.baseName ?? undefined;
  }

  @property({attribute: 'option-calendar'})
  optionCalendar?: string;

  get calendar(): string | undefined {
    return this.#getLocale()?.calendar ?? undefined;
  }

  get calendars(): string[] | undefined {
    return this.#getLocale()?.calendars ?? undefined;
  }

  @property({attribute: 'option-casefirst'})
  optionCaseFirst?: Intl.LocaleCollationCaseFirst;

  get caseFirst(): Intl.LocaleCollationCaseFirst | undefined {
    return this.#getLocale()?.caseFirst ?? undefined;
  }

  @property({attribute: 'option-collation'})
  optionCollation?: string;

  get collation(): string | undefined {
    return this.#getLocale()?.collation ?? undefined;
  }

  @property({attribute: 'option-hourcycle'})
  optionHourCycle?: Intl.LocaleHourCycleKey;

  get hourCycle(): Intl.LocaleHourCycleKey | undefined {
    return this.#getLocale()?.hourCycle ?? undefined;
  }

  get hourCycles(): Intl.LocaleHourCycleKey[] | undefined {
    return this.#getLocale()?.hourCycles ?? undefined;
  }

  @property({attribute: 'option-language'})
  optionLanguage?: string;

  get language(): string | undefined {
    return this.#getLocale()?.language ?? undefined;
  }

  @property({attribute: 'option-numberingsystem'})
  optionNumberingSystem?: string;

  get numberingSystem(): string | undefined {
    return this.#getLocale()?.numberingSystem ?? undefined;
  }

  get numberingSystems(): string[] | undefined {
    return this.#getLocale()?.numberingSystems ?? undefined;
  }

  @property({attribute: 'option-numeric', type: Boolean})
  optionNumeric?: boolean;

  get numeric(): boolean | undefined {
    return this.#getLocale()?.numeric ?? undefined;
  }

  @property({attribute: 'option-region'})
  optionRegion?: string;

  get region(): string | undefined {
    return this.#getLocale()?.region ?? undefined;
  }

  @property({attribute: 'option-script'})
  optionScript?: string;

  get script(): string | undefined {
    return this.#getLocale()?.script ?? undefined;
  }

  get textInfo(): Intl.LocaleTextInfo | undefined {
    return this.#getLocale()?.textInfo ?? undefined;
  }

  get timeZones(): string[] | undefined {
    return this.#getLocale()?.timeZones ?? undefined;
  }

  get weekInfo(): Intl.LocaleWeekInfo | undefined {
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
    if (this.displayString) {
      return this.valueAsString;
    } else if (this.displayMinimized) {
      return this.minimize()?.toString() ?? '';
    } else if (this.displayMaximized) {
      return this.maximize()?.toString() ?? '';
    } else {
      return nothing;
    }
  }
}
