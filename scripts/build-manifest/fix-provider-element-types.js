const PROVIDER_TYPES = new Map();

function getGroupPath(path) {
  return path.split('/').filter((_, i, arr) => i < arr.length - 1).join('/');
}

export default () => ({
  name: 'INTL-ELEMENTS: Fix provider element types',

  analyzePhase: ({ts, node}) => {
    if (node.kind === ts.SyntaxKind.ExpressionWithTypeArguments &&
        node.expression.getText() === 'AbstractConsumer') {
      PROVIDER_TYPES.set(
        getGroupPath(node.getSourceFile().fileName),
        node.typeArguments?.[0]?.typeName.getText()
      );
    }
  },

  packageLinkPhase: ({customElementsManifest: manifest}) => {
    manifest.modules.forEach(module => {
      const declaration = module.declarations?.[0];
      const path = getGroupPath(module.path);

      if (!declaration?.intlconsumer || !PROVIDER_TYPES.has(path)) {
        return;
      }

      declaration.members.forEach(member => {
        if (member.name === 'providerElement') {
          member.type = {
            text: member.type.text.replace('P', PROVIDER_TYPES.get(path)),
          };
        }
      });
    });
  },
});
