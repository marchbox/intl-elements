export default {
  name: 'INTL-ELEMENTS: Remove classes marked as @internal',

  packageLinkPhase: ({customElementsManifest: manifest}) => {
    manifest.modules =
        manifest.modules.filter(module => module.declarations.length > 0);
  },
}
