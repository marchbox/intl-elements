import type {LitElement} from 'lit';
import {defineIntlElements} from '../index';

defineIntlElements();

interface CreateTestPageOption {
  element: string | string[];
  html: string;
}

interface TestPage {
  body: HTMLBodyElement;
  element?: any;
}

export async function createTestPage<T extends LitElement>(
  option: CreateTestPageOption
): Promise<TestPage> {
  try {
    const page: TestPage = {
      body: document.body as HTMLBodyElement,
    };

    document.body.innerHTML = option.html;

    if (typeof option.element === 'string') {
      await customElements.whenDefined(option.element);
      page.element = document.querySelector(option.element) as T;
    } else if (Array.isArray(option.element)) {
      await Promise.all(
          option.element.map(el => customElements.whenDefined(el)));
      page.element = document.querySelector(option.element[0] as string) as T;
    }

    return page;
  } catch (e) {
    throw e;
  }
}
