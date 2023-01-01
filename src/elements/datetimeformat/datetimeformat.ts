import {nothing} from 'lit';

import AbstractProvider from '../abstract-provider.js';
import {optionProperty} from '../../utils/properties.js';

/**
 * @summary A custom element for [Intl.DateTimeFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat)
 *
 * `intl-datetimeformat` elements can be used to format dates and times with
 * language sensitivity. Use `<time>` elements with `datetime` attributes to
 * pass the date and time to be formatted.
 *
 * @example Format a date and time:
 * ```html
 * <intl-datetimeformat locales="hi" option-datestyle="long"
 *     option-timestyle="long">
 *   <p>
 *     <intl-datetimeformat-format>
 *       <time datetime="2023-01-01T00:00:00Z">
 *         Midnight on January 1, 2023
 *       </time>
 *     </intl-datetimeformat-format>
 *   </p>
 * </intl-datetimeformat>
 * ```
 *
 * @example Format a date range:
 * ```html
 * <intl-datetimeformat locales="ar" option-datestyle="long"
 *     option-timestyle="long">
 *   <p>
 *     <intl-datetimeformat-formatrange>
 *       <time slot="start" datetime="2023-01-01T00:00:00Z">
 *         Midnight on January 1, 2023
 *       </time>
 *       ~
 *       <time slot="end" datetime="2024-12-31T23:59:59Z">
 *         Midnight on December 31, 2023
 *       </time>
 *     </intl-datetimeformat-formatrange>
 *   </p>
 * </intl-datetimeformat>
 * ```
 *
 * @intl Intl.DateTimeFormat()
 * @intlsee http://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat
 * @intlprovider
 *
 * @element intl-datetimeformat
 */
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

  /**
   * @intl Intl.DateTimeFormat.prototype.resolvedOptions()
   * @intlsee http://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/resolvedOptions
   */
  resolvedOptions(): Intl.ResolvedDateTimeFormatOptions {
    return this.#resolvedOptions;
  }

  override render() {
    try {
      this.#intlObject = new Intl.DateTimeFormat(
        Array.from(this.localeList.values()),
        {
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
        }
      );
      this.#resolvedOptions = this.#intlObject.resolvedOptions();
    } catch {}

    return nothing;
  }
}
