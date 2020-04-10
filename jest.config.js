const { defaults } = require('jest-config');

module.exports = {
  verbose: true,
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.ts'],
  coveragePathIgnorePatterns: [
    'src/main.ts',
    'src/polyfills.ts',
    'src/app/app-routing.module.ts',
    'src/app/app.module.ts',
    'src/environments/environment.prod.ts',
    'src/environments/environment.ts'
  ],
  testPathIgnorePatterns: [
    '/node_modules/',
    '/dist/'
  ]
}