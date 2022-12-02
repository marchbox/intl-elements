import AbstractIntlConsumerElement from '../elements/abstract-intl-consumer-element';
import TestIntlProviderElement from './test-intl-provider-element';

export default class extends AbstractIntlConsumerElement<TestIntlProviderElement> {
  protected static override providerElementName = 'intl-foo';
}
