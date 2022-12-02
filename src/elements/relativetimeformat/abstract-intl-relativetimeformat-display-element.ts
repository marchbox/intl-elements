import AbstractIntlDisplayElement from '../abstract-intl-display-element';
import HTMLIntlRelativeTimeFormatElement from './relativetimeformat';

export default abstract class extends AbstractIntlDisplayElement<HTMLIntlRelativeTimeFormatElement> {
  protected static override providerElementName = 'intl-relativetimeformat';

  protected get rtime(): number {
    return Number(this.getData('rtime')[0] ?? this.getData()[0] ?? 0);
  }

  protected get unit(): string {
    return this.getData('unit')[0] ?? this.getData()[1] ?? '';
  }

  abstract value: string | Intl.RelativeTimeFormatPart[];
}

