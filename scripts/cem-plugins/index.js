import customJsDocTags from './custom-jsdoc-tags.js';
import fixInheritedFieldTypes from './fix-inherited-field-types.js';
import optionPropertyDecorator from './option-property-decorator.js';
import removeMembers from './remove-members.js';
import removeInternalClasses from './remove-internal-classes.js'

export default [
  customJsDocTags,
  optionPropertyDecorator,
  fixInheritedFieldTypes,
  removeMembers,
  removeInternalClasses,
];
