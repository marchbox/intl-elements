import TestProvider from './test-provider';
import TestConsumer from './test-consumer';

export {FakeIntlApi} from './fake-intl-api';
export {createTestPage} from './test-page';

export function defineTestIntlElements() {
  customElements.define('intl-foo', TestProvider);
  customElements.define('intl-foo-bar', TestConsumer);
}

export {
  TestProvider,
  TestConsumer,
}
