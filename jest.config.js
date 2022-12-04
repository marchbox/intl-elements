/* https://jestjs.io/docs/configuration */
export default {
  collectCoverage: true,
  coverageDirectory: '.jest-coverage',
  collectCoverageFrom: [
    'src/{elements,utils}/**/*.ts',
  ],
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: [
    './jest-setup.ts',
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
