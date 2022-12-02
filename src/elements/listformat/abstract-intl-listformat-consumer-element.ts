import AbstractIntlConsumerElement from '../abstract-intl-consumer-element';
import HTMLIntlListFormatElement from './listformat';

export default abstract class extends AbstractIntlConsumerElement<HTMLIntlListFormatElement> {
  protected static override providerElementName = 'intl-listformat';

  protected get list(): string[] {
    return this.getData();
  }

  abstract value: string | Intl.ListFormatPart[];
}
