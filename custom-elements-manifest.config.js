import intlElementsDocsPlugin from './scripts/build-manifest/index.js';

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