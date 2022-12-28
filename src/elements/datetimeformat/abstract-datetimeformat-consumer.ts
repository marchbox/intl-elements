// @ts-nocheck
import AbstractConsumer from '../abstract-consumer.js';
import HTMLIntlDateTimeFormatElement from './datetimeformat.js';

type ValueType = string | Intl.DateTimeFormatPart[];

/** @internal */
export default abstract class AbstractDateTimeFormatConsumer
    extends AbstractConsumer<HTMLIntlDateTimeFormatElement, ValueType> {
  protected static override providerElementName = 'intl-datetimeformat';

  protected get dateTime(): Date {
    return new Date(this.getDateTime()[0]);
  }

  protected get start(): Date {
    return new Date(this.getDateTime('start')[0] ?? this.getDateTime()[0]);
  }

  protected get end(): Date {
    return new Date(this.getDateTime('end')[0] ?? this.getDateTime()[1]);
  }
}
