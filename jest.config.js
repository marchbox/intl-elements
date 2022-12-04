/* https://jestjs.io/docs/configuration */
export default {
  collectCoverage: true,
  coverageDirectory: '.jest-coverage',
  collectCoverageFrom: [
    'src/{elements,utils}/**/*.ts',
  ],
  preset: 'ts-jest',
  testEnvironment: "jsdom",
  setupFilesAfterEnv: [
    './src/testing/jest-setup.js',
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
