import AbstractIntlConsumerElement from '../abstract-intl-consumer-element';
import HTMLIntlRelativeTimeFormatElement from './relativetimeformat';

type ValueType = string | Intl.RelativeTimeFormatPart[];

export default abstract class extends AbstractIntlConsumerElement<HTMLIntlRelativeTimeFormatElement, ValueType> {
  protected static override providerElementName = 'intl-relativetimeformat';

  protected get rtime(): number | undefined {
    let data = Number(this.getData('rtime')[0]);

    if (!data || isNaN(data)) {
      data = Number(this.getData()[0]);
    }

    return Boolean(data) ? data : undefined;
  }

  protected get unit(): string {
    return this.getData('unit')[0] ?? this.getData()[1] ?? '';
  }
}
