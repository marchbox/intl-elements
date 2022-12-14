import {generateContent} from '../../utils/templates.js';
import AbstractPluralRulesConsumer from './abstract-pluralrules-consumer.js';

/**
 * @intl Intl.PluralRules.prototype.select
 * @intlsee http://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/PluralRules/select
 * @intlconsumer
 *
 * @element intl-pluralrules-select
 *
 * @slot - The slotted element must be a `<data>` element with a `value`
 *    attribute. The value should be a number, it’s used as the `number`
 *    argument of `Intl.PluralRules`’s `select()` method.
 * @slot zero - The slotted element must be a `<template>` element. The
 *    template’s content is displayed when the `select()` method returns `zero`.
 *    The `<template>` can contain an `<ins>` element with empty content as a
 *    placeholder for the number.
 * @slot one - The slotted element must be a `<template>` element. The
 *    template’s content is displayed when the `select()` method returns `one`.
 *    The `<template>` can contain an `<ins>` element with empty content as a
 *    placeholder for the number.
 * @slot two - The slotted element must be a `<template>` element. The
 *    template’s content is displayed when the `select()` method returns `two`.
 *    The `<template>` can contain an `<ins>` element with empty content as a
 *    placeholder for the number.
 * @slot few - The slotted element must be a `<template>` element. The
 *    template’s content is displayed when the `select()` method returns `few`.
 *    The `<template>` can contain an `<ins>` element with empty content as a
 *    placeholder for the number.
 * @slot many - The slotted element must be a `<template>` element. The
 *    template’s content is displayed when the `select()` method returns `many`.
 *    The `<template>` can contain an `<ins>` element with empty content as a
 *    placeholder for the number.
 * @slot other - This slot is required. The slotted element must be a
 *    `<template>` element. The template’s content is displayed when the
 *    `select()` method returns `other`. The `<template>` can contain an `<ins>`
 *    element with empty content as a placeholder for the number.
 *
 * @csspart value - The `<span>` element that contains the selected template’s
 *     HTML.
 */
export default class HTMLIntlPluralRulesSelectElement
    extends AbstractPluralRulesConsumer {
  protected static override providerElementName = 'intl-pluralrules';

  #value: Intl.LDMLPluralRule | '' = '';

  /** @readonly */
  get value(): Intl.LDMLPluralRule | '' {
    return this.#value;
  }

  override render() {
    if (this.providerElement && !isNaN(this.data)) {
      try {
        this.#value = this.providerElement.intlObject.select(this.data);
      } catch {}
    }

    return generateContent({
      nodeContent: this.content,
      lang: this.currentLang,
      dir: this.currentDir,
      slots: ['', 'zero', 'one', 'two', 'few', 'many', 'other'],
    });
  }
}
