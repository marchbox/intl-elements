import AbstractIntlConsumerElement from '../abstract-intl-consumer-element';
import HTMLIntlListFormatElement from './listformat';

type ValueType = string | Intl.ListFormatPart[];

export default abstract class extends AbstractIntlConsumerElement<HTMLIntlListFormatElement, ValueType> {
  protected static override providerElementName = 'intl-listformat';

  protected get list(): string[] {
    return this.getData();
  }
}
