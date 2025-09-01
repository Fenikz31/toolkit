/*
 * Jest configuration for integration testing
 * Run with: npx jest --config jest.integration.config.js
 */

export default {
  testEnvironment: "node",
  transform: {
    "^.+\\.js$": "babel-jest"
  },
  testRegex: [
    'test/integration\\.spec\\.js$'
  ],
  verbose: true,
  testTimeout: 30000, // 30 seconds for integration tests
  maxWorkers: 1, // Run integration tests sequentially
  collectCoverage: false,
  // Additional integration-related configurations
  setupFilesAfterEnv: [],
  globals: {
    // Ensure consistent behavior for integration tests
    process: {
      env: {
        NODE_ENV: 'test'
      }
    }
  }
};