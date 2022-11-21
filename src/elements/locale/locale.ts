import {LitElement, nothing} from 'lit';

import {property} from 'lit/decorators.js';

type LocaleValue = Intl.Locale | null;

export default class extends LitElement {
  @property({attribute: false})
  get value(): LocaleValue {
    return this.#getLocale();
  }

  @property({attribute: false})
  get valueAsString(): Intl.BCP47LanguageTag | '' {
    return this.#getLocale()?.toString() ?? '';
  }

  @property({reflect: true})
  tag!: string;

  @property({reflect: true, attribute: 'display-string', type: Boolean})
  displayString = false;

  @property({reflect: true, attribute: 'display-maximized', type: Boolean})
  displayMaximized = false;

  @property({reflect: true, attribute: 'display-minimized', type: Boolean})
  displayMinimized = false;

  @property({reflect: true})
  baseName?: string;

  @property({reflect: true})
  calendar?: string;

  @property({attribute: false})
  get calendars(): string[] | undefined {
    return this.#getLocale()?.calendars ?? undefined;
  }

  @property({reflect: true})
  caseFirst?: Intl.LocaleCollationCaseFirst;

  @property({reflect: true})
  collation?: string;

  @property({reflect: true})
  hourCycle?: Intl.LocaleHourCycleKey;

  @property({attribute: false})
  get hourCycles(): Intl.LocaleHourCycleKey[] | undefined {
    return this.#getLocale()?.hourCycles ?? undefined;
  }

  @property({reflect: true})
  language?: string;

  @property({reflect: true})
  numberingSystem?: string;

  @property({reflect: true})
  get numberingSystems(): string[] | undefined {
    return this.#getLocale()?.numberingSystems ?? undefined;
  }

  @property({reflect: true, type: Boolean})
  numeric?: boolean;

  @property({reflect: true})
  region?: string;

  @property({reflect: true})
  script?: string;

  @property({attribute: false})
  get textInfo(): Intl.LocaleTextInfo | undefined {
    return this.#getLocale()?.textInfo ?? undefined;
  }

  @property({attribute: false})
  get timeZones(): string[] | undefined {
    return this.#getLocale()?.timeZones ?? undefined;
  }

  @property({attribute: false})
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
        baseName: this.baseName,
        calendar: this.calendar,
        caseFirst: this.caseFirst,
        collation: this.collation,
        hourCycle: this.hourCycle,
        language: this.language,
        numberingSystem: this.numberingSystem,
        numeric: this.numeric,
        region: this.region,
        script: this.script,
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
