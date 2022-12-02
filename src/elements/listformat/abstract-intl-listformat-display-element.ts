import AbstractIntlDisplayElement from '../abstract-intl-display-element';
import HTMLIntlListFormatElement from './listformat';

export default abstract class extends AbstractIntlDisplayElement<HTMLIntlListFormatElement> {
  protected static override providerElementName = 'intl-listformat';

  protected get list(): string[] {
    return this.getData();
  }

  abstract value: string | Intl.ListFormatPart[];
}
