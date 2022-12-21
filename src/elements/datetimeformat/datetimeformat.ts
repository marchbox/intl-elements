import {nothing} from 'lit';
import {property} from 'lit/decorators.js';

import AbstractProvider from '../abstract-provider.js';

export default class extends AbstractProvider {
  protected static override consumerElementNames = new Set([
    'intl-datetimeformat-format',
    'intl-datetimeformat-formattoparts',
    'intl-datetimeformat-formatrange',
    'intl-datetimeformat-formatrangetoparts',
  ]);

  protected static override intlApi = Intl.DateTimeFormat;

  #resolvedOptions!: Intl.ResolvedDateTimeFormatOptions;

  #intlObject!: Intl.DateTimeFormat;

  get intlObject(): Intl.DateTimeFormat {
    return this.#intlObject;
  }

  @property({attribute: 'option-datestyle'})
  optionDateStyle?: Intl.DateTimeFormatOptions['dateStyle'];

  @property({attribute: 'option-timestyle'})
  optionTimeStyle?: Intl.DateTimeFormatOptions['timeStyle'];

  @property({attribute: 'option-calendar'})
  optionCalendar?: Intl.DateTimeFormatOptions['calendar'];

  @property({attribute: 'option-dayperiod'})
  optionDayPeriod?: Intl.DateTimeFormatOptions['dayPeriod'];

  @property({attribute: 'option-numberingsystem'})
  optionNumberingSystem?: Intl.DateTimeFormatOptions['numberingSystem'];

  @property({attribute: 'option-timezone'})
  optionTimeZone?: Intl.DateTimeFormatOptions['timeZone'];

  @property({attribute: 'option-hour12', type: Boolean})
  optionHour12?: Intl.DateTimeFormatOptions['hour12'];

  @property({attribute: 'option-hourcycle'})
  optionHourCycle?: Intl.DateTimeFormatOptions['hourCycle'];

  @property({attribute: 'option-formatmatcher'})
  optionFormatMatcher: Intl.DateTimeFormatOptions['formatMatcher'] = 'best fit';

  @property({attribute: 'option-weekday'})
  optionWeekday?: Intl.DateTimeFormatOptions['weekday'];

  @property({attribute: 'option-era'})
  optionEra?: Intl.DateTimeFormatOptions['era'];

  @property({attribute: 'option-year'})
  optionYear?: Intl.DateTimeFormatOptions['year'];

  @property({attribute: 'option-month'})
  optionMonth?: Intl.DateTimeFormatOptions['month'];

  @property({attribute: 'option-day'})
  optionDay?: Intl.DateTimeFormatOptions['day'];

  @property({attribute: 'option-hour'})
  optionHour?: Intl.DateTimeFormatOptions['hour'];

  @property({attribute: 'option-minute'})
  optionMinute?: Intl.DateTimeFormatOptions['minute'];

  @property({attribute: 'option-second'})
  optionSecond?: Intl.DateTimeFormatOptions['second'];

  @property({attribute: 'option-fractionalseconddigits', type: Number})
  optionFractionalSecondDigits?: Intl.DateTimeFormatOptions['fractionalSecondDigits'];

  @property({attribute: 'option-timezonename'})
  optionTimeZoneName?: Intl.DateTimeFormatOptions['timeZoneName'];

  resolvedOptions(): Intl.ResolvedDateTimeFormatOptions {
    return this.#resolvedOptions;
  }

  override render() {
    try {
      this.#intlObject = new Intl.DateTimeFormat(this.localeList.valueAsArray, {
        localeMatcher: this.optionLocaleMatcher,
        dateStyle: this.optionDateStyle,
        timeStyle: this.optionTimeStyle,
        calendar: this.optionCalendar,
        dayPeriod: this.optionDayPeriod,
        numberingSystem: this.optionNumberingSystem,
        timeZone: this.optionTimeZone,
        hour12: this.optionHour12,
        hourCycle: this.optionHourCycle,
        formatMatcher: this.optionFormatMatcher,
        weekday: this.optionWeekday,
        era: this.optionEra,
        year: this.optionYear,
        month: this.optionMonth,
        day: this.optionDay,
        hour: this.optionHour,
        minute: this.optionMinute,
        second: this.optionSecond,
        fractionalSecondDigits: this.optionFractionalSecondDigits,
        timeZoneName: this.optionTimeZoneName,
      });
      this.#resolvedOptions = this.#intlObject.resolvedOptions();
    } catch {}

    return nothing;
  }
}
