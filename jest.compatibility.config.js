/*
 * Jest configuration for compatibility testing
 * Run with: npx jest --config jest.compatibility.config.js
 */

export default {
  testEnvironment: "node",
  transform: {
    "^.+\\.js$": "babel-jest"
  },
  testRegex: [
    'test/compatibility\\.spec\\.js$'
  ],
  verbose: true,
  testTimeout: 30000, // 30 seconds for compatibility tests
  maxWorkers: 1, // Run compatibility tests sequentially
  collectCoverage: false,
  // Additional compatibility-related configurations
  setupFilesAfterEnv: [],
  globals: {
    // Ensure consistent behavior across different environments
    process: {
      env: {
        NODE_ENV: 'test'
      }
    }
  }
};