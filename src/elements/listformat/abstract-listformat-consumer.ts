import AbstractConsumer from '../abstract-consumer.js';
import HTMLIntlListFormatElement from './listformat.js';

type ValueType = string | Intl.ListFormatPart[];

export default abstract class extends AbstractConsumer<HTMLIntlListFormatElement, ValueType> {
  protected static override providerElementName = 'intl-listformat';

  protected get list(): string[] {
    return this.getDataValue();
  }
}
