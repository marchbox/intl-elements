/* https://jestjs.io/docs/configuration */
export default {
  preset: 'ts-jest',
  testEnvironment: "jsdom",
  setupFiles: [
    './src/index.ts',
  ],
  transform: {
    // transform files with ts-jest
    '^.+\\.(js|ts)$': 'ts-jest',
  },
  transformIgnorePatterns: [
    // allow lit transformation
    'node_modules/(?!(@?lit|lit-html|lit-element))/',
  ],
};
