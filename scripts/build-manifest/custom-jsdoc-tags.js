const TAGS = [
  'example',
  'intl',
  'intlsee',
  'intlprovider',
  'intlconsumer',
  'readonly',
];

const TAGS_AS_LIST = [
  'example',
]

export default () => ({
  name: 'INTL-ELEMENTS: Custom JsDoc tags',

  analyzePhase: ({ts, node, moduleDoc}) => {
    let field;

    switch (node.kind) {
      case ts.SyntaxKind.ClassDeclaration:
        field = moduleDoc.declarations?.find(d =>
            d.name === node.name.getText());
        break;
      case ts.SyntaxKind.PropertyDeclaration:
      case ts.SyntaxKind.MethodDeclaration:
      case ts.SyntaxKind.GetAccessor:
        field = moduleDoc.declarations
            // Find the class declaration
            ?.find(d => d.name === node.parent.name.getText())
            // Find the member in the class declaration
            ?.members?.find(m => m.name === node.name.getText());
        break;
      default:
        return;
    }

    if (field) {
      node.jsDoc?.forEach(j => {
        j.tags?.forEach(t => {
          const tagName = t.tagName.getText();
          if (TAGS.includes(tagName)) {
            if (TAGS_AS_LIST.includes(tagName)) {
              if (!(tagName in field)) {
                field[tagName] = [];
              }
              field[tagName].push(t.comment || '');
            } else {
              field[tagName] = t.comment ?? true;
            }
          }
        });
      });
    }
  }
});
