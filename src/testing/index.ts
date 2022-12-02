import TestIntlProviderElement from './test-intl-provider-element';
import TestIntlConsumerElement from './test-intl-consumer-element';

export {FakeIntlApi} from './fake-intl-api';
export {createTestPage} from './test-page';

export function defineTestIntlElements() {
  customElements.define('intl-foo', TestIntlProviderElement);
  customElements.define('intl-foo-bar', TestIntlConsumerElement);
}

export {
  TestIntlProviderElement,
  TestIntlConsumerElement,
}
