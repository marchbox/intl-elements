const TARGETS = [
  'cssProperties',
  'cssParts',
  'slots',
  'members',
  'events',
  'attributes',
];

export default () => ({
  name: 'INTL-ELEMENTS: Sort manifest',

  packageLinkPhase: ({customElementsManifest}) => {
    const {modules} = customElementsManifest;

    // Sort class declarations
    modules.forEach(module => {
      TARGETS.forEach(target => {
        module.declarations[0][target]
            ?.sort((i1, i2) => i1.name > i2.name ? 1 : -1);
      });
    });

    // Sort classes
    modules.sort((m1, m2) => {
      const c1 = m1.path.split('/').pop().replace('.ts', '');
      const c2 = m2.path.split('/').pop().replace('.ts', '');

      return c1 > c2 ? 1 : -1;
    });
  },
});
