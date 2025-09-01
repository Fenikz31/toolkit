/*
 * Jest configuration for regression testing
 * Run with: npx jest --config jest.regression.config.js
 */

export default {
  testEnvironment: "node",
  transform: {
    "^.+\\.js$": "babel-jest"
  },
  testRegex: [
    'test/regression\\.spec\\.js$'
  ],
  verbose: true,
  testTimeout: 30000, // 30 seconds for regression tests
  maxWorkers: 1, // Run regression tests sequentially
  collectCoverage: false,
  // Additional regression-related configurations
  setupFilesAfterEnv: [],
  globals: {
    // Ensure consistent behavior for regression tests
    process: {
      env: {
        NODE_ENV: 'test'
      }
    }
  }
};