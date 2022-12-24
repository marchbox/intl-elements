import {nothing} from 'lit';

import AbstractProvider from '../elements/abstract-provider';
import {optionProperty} from '../utils/properties';
import {FakeIntlApi} from './fake-intl-api';

export default class extends AbstractProvider {
  // @ts-ignore
  protected static override intlApi = FakeIntlApi;

  protected static override consumerElementNames = new Set(['intl-foo-bar']);

  #intlObject!: FakeIntlApi;

  // @ts-ignore
  get intlObject(): FakeIntlApi {
    return this.#intlObject;
  }

  @optionProperty()
  optionUnit = 'day';

  @optionProperty()
  optionCurrency?: string;

  @optionProperty()
  optionTimeZone?: string;

  resolvedOptions(): any {
    return {};
  }

  override render() {
    this.#intlObject = new FakeIntlApi(this.localeList.valueAsArray, {
      unit: this.optionUnit,
      currency: this.optionCurrency,
      timeZone: this.optionTimeZone,
    });

    return nothing;
  }
}

