import customJsDocTags from './custom-jsdoc-tags.js';
import fixAliasedMemberTypes from './fix-aliased-member-types.js';
import fixInheritedFieldTypes from './fix-inherited-field-types.js';
import fixProviderElementTypes from './fix-provider-element-types.js';
import optionPropertyDecorator from './option-property-decorator.js';
import removeMembers from './remove-members.js';
import removeInternalClasses from './remove-internal-classes.js'
import sortManifest from './sort-manifest.js';

// The order of these plugins matters
export default [
  customJsDocTags(),
  optionPropertyDecorator(),
  fixInheritedFieldTypes(),
  fixAliasedMemberTypes(),
  fixProviderElementTypes(),
  removeMembers(),
  removeInternalClasses(),
  sortManifest(),
];
