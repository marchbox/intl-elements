export default {
  name: 'INTL-ELEMENTS: Handle @optionProperty() decorator',

  analyzePhase: ({ts, node, moduleDoc}) => {
    if (node.kind === ts.SyntaxKind.ClassDeclaration) {
      const className = node.name.getText();
      const classDeclaration = moduleDoc.declarations?.find(declaration =>
          declaration.name === className);

      node.members?.forEach(member => {
        const memberName = member.name.getText();
        const messageField = classDeclaration.members.find(member =>
            member.name === memberName);
        const optionPropertyDecorator = member?.decorators?.find(decorator =>
            decorator.expression?.expression?.getText() === 'optionProperty');

        if (optionPropertyDecorator) {
          const attributeName = memberName
              .toLowerCase()
              .replace(/^option/, 'option-');

          messageField.attribute = attributeName;

          if (!classDeclaration.attributes) {
            classDeclaration.attributes = [];
          }

          const attribute = {
            ...messageField,
            name: attributeName,
            fieldName: messageField.name,
          };
          delete attribute.kind;
          delete attribute.static;
          delete attribute.privacy;
          delete attribute.reflects;
          delete attribute.attribute;

          if (!classDeclaration.attributes.find(
              attr => attr.name === attributeName)) {
            classDeclaration.attributes.push(attribute);
          }
        }
      });
    }
  },
}
