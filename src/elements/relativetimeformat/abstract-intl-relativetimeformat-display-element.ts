import AbstractIntlDisplayElement from '../abstract-intl-display-element';
import HTMLIntlRelativeTimeFormatElement from './relativetimeformat';

export default abstract class extends AbstractIntlDisplayElement {
  protected get rtime(): number {
    return Number(this.getData('rtime')[0] ?? this.getData()[0] ?? 0);
  }

  protected get unit(): string {
    return this.getData('unit')[0] ?? this.getData()[1] ?? '';
  }

  protected get parent(): HTMLIntlRelativeTimeFormatElement | undefined {
    return this.closest('intl-relativetimeformat') ?? undefined;
  }

  abstract value: string | Intl.RelativeTimeFormatPart[];
}

