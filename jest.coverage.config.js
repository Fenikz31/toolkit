/*
 * Jest configuration for coverage testing
 * Run with: npx jest --config jest.coverage.config.js
 */

export default {
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  coverageReporters: [
    "clover",
    "html",
    "json",
    "text",
    "lcov",
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80
    }
  },
  testEnvironment: "node",
  transform: {
    "^.+\\.js$": "babel-jest"
  },
  testRegex: [
    '(/__tests__/.*|(\\.|/)(test|spec))\\.(mjs?|jsx?|js?|tsx?|ts?)$'
  ],
  verbose: true
};