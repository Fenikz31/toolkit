/*
 * Jest configuration for performance testing
 * Run with: npx jest --config jest.performance.config.js
 */

export default {
  testEnvironment: "node",
  transform: {
    "^.+\\.js$": "babel-jest"
  },
  testRegex: [
    'test/performance\\.spec\\.js$'
  ],
  verbose: true,
  testTimeout: 30000, // 30 seconds for performance tests
  maxWorkers: 1, // Run performance tests sequentially
  collectCoverage: false
};