import AbstractConsumer from '../abstract-consumer';
import HTMLIntlListFormatElement from './listformat';

type ValueType = string | Intl.ListFormatPart[];

export default abstract class extends AbstractConsumer<HTMLIntlListFormatElement, ValueType> {
  protected static override providerElementName = 'intl-listformat';

  protected get list(): string[] {
    return this.getData();
  }
}
