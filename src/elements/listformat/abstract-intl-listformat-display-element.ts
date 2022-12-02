import AbstractIntlDisplayElement from '../abstract-intl-display-element';
import HTMLIntlListFormatElement from './listformat';

export default abstract class extends AbstractIntlDisplayElement {
  protected get list(): string[] {
    return this.getData();
  }

  protected get parent(): HTMLIntlListFormatElement | undefined {
    return this.closest('intl-listformat') ?? undefined;
  }

  abstract value: string | Intl.ListFormatPart[];
}
