/*
 * Jest configuration for load testing
 * Run with: npx jest --config jest.load.config.js
 */

export default {
  testEnvironment: "node",
  transform: {
    "^.+\\.js$": "babel-jest"
  },
  testRegex: [
    'test/load\\.spec\\.js$'
  ],
  verbose: true,
  testTimeout: 60000, // 60 seconds for load tests
  maxWorkers: 1, // Run load tests sequentially
  collectCoverage: false,
  // Additional load-related configurations
  setupFilesAfterEnv: [],
  globals: {
    // Ensure consistent behavior for load tests
    process: {
      env: {
        NODE_ENV: 'test'
      }
    }
  }
};