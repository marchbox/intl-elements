import {nothing} from 'lit';
import {property} from 'lit/decorators.js';

import AbstractIntlProviderElement from '../elements/abstract-intl-provider-element';
import {FakeIntlApi} from './fake-intl-api';

export default class TestIntlProviderElement extends AbstractIntlProviderElement {
  // @ts-ignore
  protected static override intlApi = FakeIntlApi;

  protected static override consumerElementNames = new Set(['intl-foo-bar']);

  #intlObject!: FakeIntlApi;

  // @ts-ignore
  get intlObject(): FakeIntlApi {
    return this.#intlObject;
  }

  @property({attribute: 'option-unit'})
  // @ts-ignore
  optionUnit = 'day';

  @property({attribute: 'option-currency'})
  // @ts-ignore
  optionCurrency?: string;

  @property({attribute: 'option-timezone'})
  // @ts-ignore
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

