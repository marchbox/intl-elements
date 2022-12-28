import AbstractConsumer from '../abstract-consumer.js';
import HTMLIntlRelativeTimeFormatElement from './relativetimeformat.js';

type ValueType = string | Intl.RelativeTimeFormatPart[];

/** @internal */
export default abstract class AbstractRelativeTimeFormatConsumer
    extends AbstractConsumer<HTMLIntlRelativeTimeFormatElement, ValueType> {
  protected static override providerElementName = 'intl-relativetimeformat';

  protected get rtime(): number {
    return Number(this.getDataValue('rtime')[0] ?? this.getDataValue()[0]);
  }

  protected get unit(): string {
    return this.getDataValue('unit')[0] ?? this.getDataValue()[1] ?? '';
  }
}
