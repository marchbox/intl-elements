/**
 * @fileoverview By default, the generated manifest uses superclass’s field
 * type, which isn’t ideal. Storing the child class field type in `originalType`
 * so that we can restore it into `type` in the package link phase.
 */

const PROVIDER_FIELDS = [
  'intlObject',
];

export default {
  name: 'INTL-ELEMENTS: Fix inherited field types',

  moduleLinkPhase: ({moduleDoc}) => {
    moduleDoc.declarations.forEach(declaration => {
      declaration.members?.forEach(member => {
        if (PROVIDER_FIELDS.includes(member.name)) {
          member.originalType = Object.assign({}, member.type);
        }
      });
    });
  },

  packageLinkPhase: ({customElementsManifest: manifest}) => {
    // Remove private and protected members from the docs.
    manifest.modules.forEach(module => {
      module.declarations.forEach(declaration => {
        if (!declaration.members) {
          return;
        }

        declaration.members.forEach(member => {
          if (member.originalType) {
            member.type = Object.assign({}, member.originalType);
            delete member.originalType;
          }
        });
      });
    });
  },
}
