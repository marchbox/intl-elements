import type {LitElement} from 'lit';

interface CreateTestPageOption {
  element: string;
  html: string;
}

interface TestPage {
  body: HTMLBodyElement;
  element?: any;
}

export async function createTestPage<T extends LitElement>(
  option: CreateTestPageOption
): Promise<TestPage> {
  const page: TestPage = {
    body: document.body as HTMLBodyElement,
  };

  document.body.innerHTML = option.html;

  try {
    await customElements.whenDefined(option.element);
    page.element = document.querySelector(option.element) as T;
  } catch (e) {
    throw e;
  }

  return page;
}
