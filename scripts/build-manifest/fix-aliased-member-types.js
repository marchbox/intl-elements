const types = new Map();

export default () => ({
  name: 'INTL-ELEMENTS: Fix aliased types on class members',

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

  packageLinkPhase: ({customElementsManifest: manifest}) => {
    manifest.modules.forEach(module => {
      module.declarations.forEach(declaration => {
        declaration.members?.forEach(member => {
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

