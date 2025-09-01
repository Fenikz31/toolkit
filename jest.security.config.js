/*
 * Jest configuration for security testing
 * Run with: npx jest --config jest.security.config.js
 */

export default {
  testEnvironment: "node",
  transform: {
    "^.+\\.js$": "babel-jest"
  },
  testRegex: [
    'test/security\\.spec\\.js$'
  ],
  verbose: true,
  testTimeout: 60000, // 60 seconds for security tests
  maxWorkers: 1, // Run security tests sequentially
  collectCoverage: false,
  // Additional security-related configurations
  setupFilesAfterEnv: [],
  globals: {
    // Disable console.log in security tests to prevent information leakage
    console: {
      log: jest.fn(),
      warn: jest.fn(),
      error: jest.fn()
    }
  }
};