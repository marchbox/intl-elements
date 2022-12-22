import {defineIntlElements} from '../index';

defineIntlElements();

interface CreateTestPageOption {
  elements: string[];
  html: string;
  lang?: string;
}

export async function createTestPage(option: CreateTestPageOption): Promise<void> {
  try {
    if (option.lang) {
      document.documentElement.lang = option.lang;
    }
    document.body.innerHTML = option.html;

    await Promise.all(
        option.elements.map(el => customElements.whenDefined(el)));
  } catch (e) {
    throw e;
  }
}
