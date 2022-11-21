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

  @property({reflect: true, attribute: 'display-maximum', type: Boolean})
  displayMaximum = false;

  @property({reflect: true, attribute: 'display-minimum', type: Boolean})
  displayMinimum = false;

  @property({reflect: true})
  baseName?: string;

  @property({reflect: true})
  calendar?: string;

  @property({reflect: true})
  caseFirst?: Intl.LocaleCollationCaseFirst;

  @property({reflect: true})
  collation?: string;

  @property({reflect: true})
  hourCycle?: Intl.LocaleHourCycleKey;

  @property({reflect: true})
  language?: string;

  @property({reflect: true})
  numberingSystem?: string;

  @property({reflect: true})
  numeric?: boolean;

  @property({reflect: true})
  region?: string;

  @property({reflect: true})
  script?: string;

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
    if (!this.tag) {
      return null;
    }

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
  }

  override render() {
    if (this.displayString) {
      return this.valueAsString;
    }
    if (this.displayMinimum) {
      return this.minimize()?.toString() ?? '';
    }
    if (this.displayMaximum) {
      return this.maximize()?.toString() ?? '';
    }

    return nothing;
  }
}
