import toolkit from '../index.js';

describe('Compatibility tests', () => {
  test('should work with older JavaScript features', () => {
    // Test with older array methods
    const oldArray = [1, 2, 3];
    const oldArrayMethods = {
      slice: oldArray.slice(0, 2),
      concat: oldArray.concat([4, 5]),
      join: oldArray.join('-'),
    };

    expect(toolkit.isOfType.array(oldArrayMethods.slice)).toBe(true);
    expect(toolkit.isOfType.array(oldArrayMethods.concat)).toBe(true);
    expect(toolkit.isOfType.string(oldArrayMethods.join)).toBe(true);
  });

  test('should work with modern JavaScript features', () => {
    // Test with modern features
    const modernFeatures = {
      spread: [...Array(5).keys()],
      destructuring: { a: 1, b: 2, ...{ c: 3 } },
      template: `value: ${42}`,
      arrow: () => 'test',
      async: async () => 'async test',
    };

    expect(toolkit.isOfType.array(modernFeatures.spread)).toBe(true);
    expect(toolkit.isOfType.object(modernFeatures.destructuring)).toBe(true);
    expect(toolkit.isOfType.string(modernFeatures.template)).toBe(true);
    // Note: Our toolkit doesn't have function type checking
    expect(typeof modernFeatures.arrow).toBe('function');
    expect(typeof modernFeatures.async).toBe('function');
  });

  test('should work with different object creation methods', () => {
    const objects = [
      {}, // Object literal
      new Object(), // Constructor
      Object.create(null), // Create with null prototype
      Object.create({}), // Create with empty prototype
      Object.assign({}, { key: 'value' }), // Assign
      { ...{ key: 'value' } }, // Spread
    ];

    objects.forEach(obj => {
      expect(toolkit.isOfType.object(obj)).toBe(true);
      // All these objects are empty except the last two
      expect(toolkit.isEmpty(obj)).toBe(
        obj === objects[0] ||
          obj === objects[1] ||
          obj === objects[2] ||
          obj === objects[3]
      );
    });
  });

  test('should work with different array creation methods', () => {
    const arrays = [
      [], // Array literal
      new Array(), // Constructor
      Array.from({ length: 3 }, (_, i) => i), // From
      [...Array(3).keys()], // Spread
      Array.of(1, 2, 3), // Of
    ];

    arrays.forEach(arr => {
      expect(toolkit.isOfType.array(arr)).toBe(true);
      expect(toolkit.isEmpty(arr)).toBe(arr.length === 0);
    });
  });

  test('should work with different primitive wrappers', () => {
    const primitives = [
      'string',
      new String('string'),
      42,
      new Number(42),
      true,
      new Boolean(true),
    ];

    expect(toolkit.isOfType.string(primitives[0])).toBe(true);
    expect(toolkit.isOfType.string(primitives[1])).toBe(true);
    expect(toolkit.isOfType.number(primitives[2])).toBe(true);
    expect(toolkit.isOfType.number(primitives[3])).toBe(true);
    expect(toolkit.isOfType.boolean(primitives[4])).toBe(true);
    expect(toolkit.isOfType.boolean(primitives[5])).toBe(true);
  });

  test('should work with edge case values', () => {
    const edgeCases = [
      -0, // Negative zero
      0, // Zero
      +0, // Positive zero
      Number.MAX_SAFE_INTEGER,
      Number.MIN_SAFE_INTEGER,
      Number.MAX_VALUE,
      Number.MIN_VALUE,
      Number.EPSILON,
    ];

    edgeCases.forEach(value => {
      expect(toolkit.isOfType.number(value)).toBe(true);
      if (value === 0 || Object.is(value, -0)) {
        expect(toolkit.isEmpty(value)).toBeUndefined(); // Numbers don't have isEmpty
      }
    });
  });

  test('should work with different function types', () => {
    const functions = [
      function () {},
      () => {},
      function* () {},
      async function () {},
      async () => {},
      function () {
        return arguments;
      },
    ];

    // Note: Our toolkit doesn't have function type checking, so we test other properties
    functions.forEach(fn => {
      expect(typeof fn).toBe('function');
      // Test that calling our methods doesn't break with functions
      expect(() => toolkit.isEmpty(fn)).not.toThrow();
      expect(() => toolkit.isOfType.object(fn)).not.toThrow();
    });
  });

  test('should work with different module systems', () => {
    // Test that our toolkit can be imported and used
    expect(typeof toolkit).toBe('object');
    expect(typeof toolkit.isEmpty).toBe('function');
    expect(typeof toolkit.isOfType).toBe('object');
    expect(typeof toolkit.mergeIntoObject).toBe('function');
    expect(typeof toolkit.removeDuplicate).toBe('function');

    // Test that methods are callable
    expect(() => toolkit.isEmpty([])).not.toThrow();
    expect(() => toolkit.isOfType.string('test')).not.toThrow();
  });
});
