import AbstractConsumer from '../abstract-consumer.js';
import HTMLIntlNumberFormatElement from './numberformat.js';

type ValueType = string | Intl.NumberFormatPart[];

/** @internal */
export default abstract class AbstractNumberFormatConsumer
    extends AbstractConsumer<HTMLIntlNumberFormatElement, ValueType> {
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
