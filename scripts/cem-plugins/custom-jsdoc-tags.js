const CUSTOM_MEMBER_JS_DOC_TAGS = [
  'mdn',
  'readonly',
];

export default () => ({
  name: 'INTL-ELEMENTS: Custom JsDoc tags',

  analyzePhase: ({ts, node, moduleDoc}) => {
    if (node.kind !== ts.SyntaxKind.ClassDeclaration) {
      return;
    }

    const className = node.name.getText();
    const classDeclaration = moduleDoc.declarations.find(declaration =>
        declaration.name === className);

    node.members?.forEach(member => {
      const memberName = member.name.getText();
      const messageField = classDeclaration.members.find(member =>
          member.name === memberName);

      member?.jsDoc?.forEach(jsDoc => {
        jsDoc?.tags?.forEach(tag => {
          const tagName = tag.tagName.getText();

          if (CUSTOM_MEMBER_JS_DOC_TAGS.includes(tagName)) {
            const description = tag.comment;

            messageField[tagName] = description ?? true;
          }
        });
      });
    });
  }
});
