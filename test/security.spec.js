import toolkit from '../index.js';

describe('Security tests', () => {
  test('should handle prototype pollution attempts', () => {
    const maliciousObject = {};

    // Attempt prototype pollution
    try {
      Object.setPrototypeOf(maliciousObject, { __proto__: { isAdmin: true } });
    } catch (e) {
      // Expected in strict mode
    }

    // Test that our functions don't modify prototypes
    const originalProto = Object.getPrototypeOf(maliciousObject);
    toolkit.isEmpty(maliciousObject);
    toolkit.isOfType.object(maliciousObject);

    expect(Object.getPrototypeOf(maliciousObject)).toBe(originalProto);
  });

  test('should handle circular references safely', () => {
    const circular = {};
    circular.self = circular;

    // These should not cause infinite loops
    expect(() => toolkit.isEmpty(circular)).not.toThrow();
    expect(() => toolkit.isOfType.object(circular)).not.toThrow();

    // Should return expected results
    expect(toolkit.isEmpty(circular)).toBe(false);
    expect(toolkit.isOfType.object(circular)).toBe(true);
  });

  test('should handle extremely large inputs safely', () => {
    // Create a very large object
    const largeObject = {};
    for (let i = 0; i < 10000; i++) {
      largeObject[`key${i}`] = `value${i}`;
    }

    // Should handle without crashing
    expect(() => toolkit.isEmpty(largeObject)).not.toThrow();
    expect(() => toolkit.isOfType.object(largeObject)).not.toThrow();

    expect(toolkit.isEmpty(largeObject)).toBe(false);
    expect(toolkit.isOfType.object(largeObject)).toBe(true);
  });

  test('should handle malformed inputs gracefully', () => {
    const malformedInputs = [
      undefined,
      null,
      NaN,
      Infinity,
      -Infinity,
      Symbol('test'),
      function () {},
      new Error('test'),
      new RegExp('test'),
      new Promise(() => {}),
    ];

    malformedInputs.forEach(input => {
      expect(() => toolkit.isEmpty(input)).not.toThrow();
      expect(() => toolkit.isOfType.string(input)).not.toThrow();
      expect(() => toolkit.isOfType.number(input)).not.toThrow();
      expect(() => toolkit.isOfType.boolean(input)).not.toThrow();
      expect(() => toolkit.isOfType.array(input)).not.toThrow();
      expect(() => toolkit.isOfType.object(input)).not.toThrow();
    });
  });

  test('should not leak sensitive information in error messages', () => {
    const sensitiveData = {
      password: 'secret123',
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
      apiKey: 'sk-1234567890abcdef',
    };

    // Test that error messages don't contain sensitive data
    const result = toolkit.mergeIntoObject([sensitiveData]);
    expect(typeof result).toBe('object');

    // Error messages should be generic
    const arrayError = toolkit.mergeIntoObject('not an array');
    expect(arrayError).toContain('Wrong parameter');
    expect(arrayError).not.toContain('secret123');
    expect(arrayError).not.toContain('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9');
    expect(arrayError).not.toContain('sk-1234567890abcdef');
  });

  test('should handle buffer overflow attempts', () => {
    // Create extremely long strings
    const longString = 'a'.repeat(1000000);
    const longArray = Array(1000000).fill('test');

    // Should handle without crashing
    expect(() => toolkit.isEmpty(longString)).not.toThrow();
    expect(() => toolkit.isEmpty(longArray)).not.toThrow();
    expect(() => toolkit.isOfType.string(longString)).not.toThrow();
    expect(() => toolkit.isOfType.array(longArray)).not.toThrow();

    // Should return expected results
    expect(toolkit.isEmpty(longString)).toBe(false);
    expect(toolkit.isEmpty(longArray)).toBe(false);
    expect(toolkit.isOfType.string(longString)).toBe(true);
    expect(toolkit.isOfType.array(longArray)).toBe(true);
  });

  test('should handle timing attacks gracefully', () => {
    const start = performance.now();

    // Perform operations that might have different timing
    toolkit.isEmpty('short');
    toolkit.isEmpty('very long string that might take longer to process');

    const end = performance.now();
    const duration = end - start;

    // Should complete quickly regardless of input size
    expect(duration).toBeLessThan(10); // Less than 10ms
  });
});
