export default () => ({
  name: 'INTL-ELEMENTS: Remove non-public members',

  packageLinkPhase: ({customElementsManifest: manifest}) => {
    manifest.modules.forEach(module => {
      module.declarations.forEach(declaration => {
        if (!declaration.members) {
          return;
        }

        declaration.members = declaration.members?.filter(member =>
            !(
              member.name.startsWith('#') ||
              ['private', 'protected'].includes(member.privacy)
            ) ||
            member?.name?.getText?.() === 'intlApi');
      });
    });
  },
});
