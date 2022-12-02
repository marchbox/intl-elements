import AbstractIntlConsumerElement from '../abstract-intl-consumer-element';
import HTMLIntlRelativeTimeFormatElement from './relativetimeformat';

type ValueType = string | Intl.RelativeTimeFormatPart[];

export default abstract class extends AbstractIntlConsumerElement<HTMLIntlRelativeTimeFormatElement, ValueType> {
  protected static override providerElementName = 'intl-relativetimeformat';

  protected get rtime(): number {
    return Number(this.getData('rtime')[0] ?? this.getData()[0] ?? 0);
  }

  protected get unit(): string {
    return this.getData('unit')[0] ?? this.getData()[1] ?? '';
  }
}
