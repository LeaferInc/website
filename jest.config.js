const { defaults } = require('jest-config');

module.exports = {
  verbose: true,
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.ts', '!**/*.module.ts'],
  coveragePathIgnorePatterns: [
    'src/main.ts',
    'src/polyfills.ts',
    'src/environments/environment.prod.ts',
    'src/environments/environment.ts'
  ],
  testPathIgnorePatterns: [
    '/node_modules/',
    '/dist/'
  ]
}