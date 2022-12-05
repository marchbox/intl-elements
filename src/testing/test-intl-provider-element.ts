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

  @property({attribute: 'format-unit'})
  // @ts-ignore
  formatUnit = 'day';

  resolvedOptions(): any {
    return {};
  }

  override render() {
    this.#intlObject = new FakeIntlApi(this.localeList.valueAsArray);

    return nothing;
  }
}

