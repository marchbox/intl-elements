import AbstractConsumer from '../abstract-consumer';
import NumberFormat from './numberformat';

type ValueType = string | Intl.NumberFormatPart[];

export default abstract class extends AbstractConsumer<NumberFormat, ValueType> {
  protected static override providerElementName = 'intl-numberformat';

  protected get number(): number {
    return Number(this.getData()[0]);
  }

  protected get start(): number {
    return Number(this.getData('start')[0] ?? this.getData()[0]);
  }

  protected get end(): number {
    return Number(this.getData('end')[0] ?? this.getData()[1]);
  }
}
