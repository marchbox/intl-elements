import {defineIntlElements} from '../index';

defineIntlElements();

interface CreateTestPageOption {
  elements: string[];
  html: string;
}

export async function createTestPage(option: CreateTestPageOption): Promise<void> {
  try {
    document.body.innerHTML = option.html;

    await Promise.all(
        option.elements.map(el => customElements.whenDefined(el)));
  } catch (e) {
    throw e;
  }
}
