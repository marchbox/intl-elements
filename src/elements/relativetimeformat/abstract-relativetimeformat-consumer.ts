import AbstractConsumer from '../abstract-consumer';
import HTMLIntlRelativeTimeFormatElement from './relativetimeformat';

type ValueType = string | Intl.RelativeTimeFormatPart[];

export default abstract class extends AbstractConsumer<HTMLIntlRelativeTimeFormatElement, ValueType> {
  protected static override providerElementName = 'intl-relativetimeformat';

  protected get rtime(): number {
    return Number(this.getDataValue('rtime')[0] ?? this.getDataValue()[0]);
  }

  protected get unit(): string {
    return this.getDataValue('unit')[0] ?? this.getDataValue()[1] ?? '';
  }
}
