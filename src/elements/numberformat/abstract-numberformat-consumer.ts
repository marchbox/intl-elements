import AbstractConsumer from '../abstract-consumer';
import NumberFormat from './numberformat';

type ValueType = string | Intl.NumberFormatPart[];

export default abstract class extends AbstractConsumer<NumberFormat, ValueType> {
  protected static override providerElementName = 'intl-numberformat';

  protected get number(): number {
    return Number(this.getDataValue()[0]);
  }

  protected get start(): number {
    return Number(this.getDataValue('start')[0] ?? this.getDataValue()[0]);
  }

  protected get end(): number {
    return Number(this.getDataValue('end')[0] ?? this.getDataValue()[1]);
  }
}
