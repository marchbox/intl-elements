/* https://jestjs.io/docs/configuration */
export default {
  collectCoverage: true,
  coverageDirectory: '.jest-coverage',
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '/src/testing/',
  ],
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
