/**
 * @fileoverview By default, the generated manifest uses superclass’s field
 * type, which isn’t ideal. Storing the child class field type in `originalType`
 * so that we can restore it into `type` in the package link phase.
 */

const INHERITED_FIELDS = [
  'value',
  'intlObject',
];

const types = new Map();

export default () => ({
  name: 'INTL-ELEMENTS: Fix inherited field types and aliased types',

  analyzePhase: ({ts, node}) => {
    if (node.kind === ts.SyntaxKind.TypeAliasDeclaration) {
      const {fileName} = node.parent;
      const ref = {
        name: node.name.getText(),
        type: node.type.getText(),
      };
      if (types.has(fileName)) {
        types.get(fileName).push(ref);
      } else {
        types.set(fileName, [ref]);
      }
    }
  },

  moduleLinkPhase: ({moduleDoc}) => {
    moduleDoc.declarations.forEach(declaration => {
      declaration.members?.forEach(member => {
        if (INHERITED_FIELDS.includes(member.name)) {
          member.originalType = Object.assign({}, member.type);
        }
      });
    });
  },

  packageLinkPhase: ({customElementsManifest: manifest}) => {
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
          if (types.has(module.path)) {
            let ref;
            switch (member.kind) {
              case 'method':
                ref = types.get(module.path)
                    .find(type => type.name === member.return?.type?.text);
                if (ref) {
                  member.return.type.text = ref.type;
                }
                break;
              case 'field':
                ref = types.get(module.path)
                    .find(type => type.name === member.type?.text);
                if (ref) {
                  member.type.text = ref.type;
                }
                break;
            }
          }
        });
      });
    });
  },
});
