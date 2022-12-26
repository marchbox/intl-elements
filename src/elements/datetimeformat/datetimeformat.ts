import {nothing} from 'lit';

import AbstractProvider from '../abstract-provider.js';
import {optionProperty} from '../../utils/properties.js';

export default class HTMLIntlDateTimeFormatElement extends AbstractProvider {
  protected static override consumerElementNames = new Set([
    'intl-datetimeformat-format',
    'intl-datetimeformat-formattoparts',
    'intl-datetimeformat-formatrange',
    'intl-datetimeformat-formatrangetoparts',
  ]);

  protected static override intlApi = Intl.DateTimeFormat;

  #resolvedOptions!: Intl.ResolvedDateTimeFormatOptions;

  #intlObject!: Intl.DateTimeFormat;

  /** @readonly */
  get intlObject(): Intl.DateTimeFormat {
    return this.#intlObject;
  }

  @optionProperty()
  optionDateStyle?: Intl.DateTimeFormatOptions['dateStyle'];

  @optionProperty()
  optionTimeStyle?: Intl.DateTimeFormatOptions['timeStyle'];

  @optionProperty()
  optionCalendar?: Intl.DateTimeFormatOptions['calendar'];

  @optionProperty()
  optionDayPeriod?: Intl.DateTimeFormatOptions['dayPeriod'];

  @optionProperty()
  optionNumberingSystem?: Intl.DateTimeFormatOptions['numberingSystem'];

  @optionProperty()
  optionTimeZone?: Intl.DateTimeFormatOptions['timeZone'];

  @optionProperty({type: Boolean})
  optionHour12?: Intl.DateTimeFormatOptions['hour12'];

  @optionProperty()
  optionHourCycle?: Intl.DateTimeFormatOptions['hourCycle'];

  @optionProperty()
  optionFormatMatcher: Intl.DateTimeFormatOptions['formatMatcher'] = 'best fit';

  @optionProperty()
  optionWeekday?: Intl.DateTimeFormatOptions['weekday'];

  @optionProperty()
  optionEra?: Intl.DateTimeFormatOptions['era'];

  @optionProperty()
  optionYear?: Intl.DateTimeFormatOptions['year'];

  @optionProperty()
  optionMonth?: Intl.DateTimeFormatOptions['month'];

  @optionProperty()
  optionDay?: Intl.DateTimeFormatOptions['day'];

  @optionProperty()
  optionHour?: Intl.DateTimeFormatOptions['hour'];

  @optionProperty()
  optionMinute?: Intl.DateTimeFormatOptions['minute'];

  @optionProperty()
  optionSecond?: Intl.DateTimeFormatOptions['second'];

  @optionProperty({type: Number})
  optionFractionalSecondDigits?: Intl.DateTimeFormatOptions['fractionalSecondDigits'];

  @optionProperty()
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
