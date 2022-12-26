export default {
  name: 'INTL-ELEMENT: Handle @optionProperty() decorator',
  analyzePhase: ({ts, node, moduleDoc}) => {
    if (node.kind === ts.SyntaxKind.ClassDeclaration) {
      const className = node.name.getText();
      const classDeclaration = moduleDoc.declarations.find(declaration =>
          declaration.name === className);

      node.members?.forEach(member => {
        const memberName = member.name.getText();
        const messageField = classDeclaration.members.find(member =>
            member.name === memberName);

        // Handle `@optionProperty()` decorator
        member?.decorators?.forEach(decorator => {
          const decoratorName = decorator.expression?.expression?.escapedText;

          if (decoratorName === 'optionProperty') {
            const attributeName = memberName
                .toLowerCase()
                .replace(/^option/, 'option-');

            messageField.attribute = attributeName;

            if (!classDeclaration.attributes) {
              classDeclaration.attributes = [];
            }

            // @see https://github.com/open-wc/custom-elements-manifest/blob/master/packages/analyzer/src/features/analyse-phase/creators/createAttribute.js
            const attribute = {
              fieldName: member.name,
              ...member,
            };
            delete attribute.kind;
            delete attribute.static;
            delete attribute.privacy;
            delete attribute.reflects;
            if (!classDeclaration.attributes.find(attr => attr.name === attributeName)) {
              classDeclaration.attributes.push(attribute);
            }
          }
        });
      });
    }
  },
}
