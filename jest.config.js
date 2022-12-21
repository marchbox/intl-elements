/* https://jestjs.io/docs/configuration */
export default {
  collectCoverage: true,
  coverageDirectory: '.jest-coverage',
  collectCoverageFrom: [
    'src/{elements,utils}/**/*.ts',
  ],
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: [
    '@testing-library/jest-dom/extend-expect',
    'jest-extended/all',
    './src/testing/jest-setup.ts',
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
