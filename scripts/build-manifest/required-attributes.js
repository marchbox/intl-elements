export default () => ({
  name: 'LIT-ELEMENTS: Mark attributes as required if they are',

  analyzePhase({ts, node, moduleDoc}) {
    if (node.kind === ts.SyntaxKind.PropertyDeclaration) {
      if (node.exclamationToken !== undefined) {
        const className = node.parent.name.getText();
        const fieldName = node.name.getText();

        const classDeclaration = moduleDoc.declarations?.find(declaration =>
            declaration.name === className);
        const member = classDeclaration.members.find(member =>
            member.name === fieldName);
        member.required = true;

        if (member.attribute) {
          const attribute = classDeclaration.attributes.find(
              attr => attr.name === member.attribute);
          attribute.required = true;
        }
      }
    }
  },
});
