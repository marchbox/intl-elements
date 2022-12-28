import AbstractConsumer from '../abstract-consumer.js';
import HTMLIntlListFormatElement from './listformat.js';

type ValueType = string | Intl.ListFormatPart[];

/** @internal */
export default abstract class AbstractListFormatConsumer
    extends AbstractConsumer<HTMLIntlListFormatElement, ValueType> {
  protected static override providerElementName = 'intl-listformat';

  protected get list(): string[] {
    return this.getDataValue();
  }
}
