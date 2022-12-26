import intlElementsDocsPlugin from './scripts/cem-plugins/index.js';

export default {
  globs: [
    'src/elements/**/*.ts',
  ],
  exclude: [
    'src/elements/**/*.spec.ts',
  ],
  dependencies: false,
  packagejson: false,
  litelement: true,
  plugins: [
    ...intlElementsDocsPlugin,
  ],
}