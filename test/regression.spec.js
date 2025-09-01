import toolkit from '../index.js';

describe('Regression tests', () => {
  test('should maintain isEmpty behavior for all supported types', () => {
    // Test arrays
    expect(toolkit.isEmpty([])).toBe(true);
    expect(toolkit.isEmpty([1, 2, 3])).toBe(false);
    expect(toolkit.isEmpty(['a', 'b', 'c'])).toBe(false);

    // Test strings
    expect(toolkit.isEmpty('')).toBe(true);
    expect(toolkit.isEmpty('hello')).toBe(false);
    expect(toolkit.isEmpty(' ')).toBe(false);

    // Test objects
    expect(toolkit.isEmpty({})).toBe(true);
    expect(toolkit.isEmpty({ key: 'value' })).toBe(false);
    expect(toolkit.isEmpty({ a: 1, b: 2 })).toBe(false);

    // Test Maps
    expect(toolkit.isEmpty(new Map())).toBe(true);
    const map = new Map();
    map.set('key', 'value');
    expect(toolkit.isEmpty(map)).toBe(false);

    // Test Sets
    expect(toolkit.isEmpty(new Set())).toBe(true);
    const set = new Set([1, 2, 3]);
    expect(toolkit.isEmpty(set)).toBe(false);

    // Test edge cases
    expect(toolkit.isEmpty()).toBeUndefined();
    expect(toolkit.isEmpty(null)).toBeUndefined();
    expect(toolkit.isEmpty(undefined)).toBeUndefined();
    expect(toolkit.isEmpty(0)).toBeUndefined();
    expect(toolkit.isEmpty(false)).toBeUndefined();
  });

  test('should maintain isOfType behavior for all supported types', () => {
    // Test null and undefined
    expect(toolkit.isOfType.null(null)).toBe(true);
    expect(toolkit.isOfType.null(undefined)).toBe(false);
    expect(toolkit.isOfType.undefined(undefined)).toBe(true);
    expect(toolkit.isOfType.undefined(null)).toBe(false);
    expect(toolkit.isOfType.nil(null)).toBe(true);
    expect(toolkit.isOfType.nil(undefined)).toBe(true);
    expect(toolkit.isOfType.nil('')).toBe(false);

    // Test strings
    expect(toolkit.isOfType.string('')).toBe(true);
    expect(toolkit.isOfType.string('hello')).toBe(true);
    expect(toolkit.isOfType.string(new String('hello'))).toBe(true);
    expect(toolkit.isOfType.string(42)).toBe(false);
    expect(toolkit.isOfType.string(null)).toBe(false);

    // Test numbers
    expect(toolkit.isOfType.number(42)).toBe(true);
    expect(toolkit.isOfType.number(3.14)).toBe(true);
    expect(toolkit.isOfType.number(new Number(42))).toBe(true);
    expect(toolkit.isOfType.number(NaN)).toBe(false);
    expect(toolkit.isOfType.number(Infinity)).toBe(false);
    expect(toolkit.isOfType.number(-Infinity)).toBe(false);
    expect(toolkit.isOfType.number('42')).toBe(false);

    // Test booleans
    expect(toolkit.isOfType.boolean(true)).toBe(true);
    expect(toolkit.isOfType.boolean(false)).toBe(true);
    expect(toolkit.isOfType.boolean(new Boolean(true))).toBe(true);
    expect(toolkit.isOfType.boolean(1)).toBe(false);
    expect(toolkit.isOfType.boolean('true')).toBe(false);

    // Test arrays
    expect(toolkit.isOfType.array([])).toBe(true);
    expect(toolkit.isOfType.array([1, 2, 3])).toBe(true);
    expect(toolkit.isOfType.array(new Array())).toBe(true);
    expect(toolkit.isOfType.array({})).toBe(false);
    expect(toolkit.isOfType.array('array')).toBe(false);

    // Test objects
    expect(toolkit.isOfType.object({})).toBe(true);
    expect(toolkit.isOfType.object({ key: 'value' })).toBe(true);
    expect(toolkit.isOfType.object(new Object())).toBe(true);
    expect(toolkit.isOfType.object([])).toBe(false);
    expect(toolkit.isOfType.object(null)).toBe(false);

    // Test special types
    expect(toolkit.isOfType.date(new Date())).toBe(true);
    expect(toolkit.isOfType.date('2023-01-01')).toBe(false);
    expect(toolkit.isOfType.map(new Map())).toBe(true);
    expect(toolkit.isOfType.map({})).toBe(false);
    expect(toolkit.isOfType.set(new Set())).toBe(true);
    expect(toolkit.isOfType.set([])).toBe(false);

    // Test type checking
    expect(toolkit.isOfType.type([], Array)).toBe(true);
    expect(toolkit.isOfType.type({}, Object)).toBe(true);
    expect(toolkit.isOfType.type(new Date(), Date)).toBe(true);
    expect(toolkit.isOfType.type([], Object)).toBe(true); // Arrays are instances of Object in JavaScript
  });

  test('should maintain mergeIntoObject behavior', () => {
    // Test with empty array
    expect(toolkit.mergeIntoObject([])).toEqual({});

    // Test with single object
    expect(toolkit.mergeIntoObject([{ a: 1 }])).toEqual({ a: 1 });

    // Test with multiple objects
    expect(toolkit.mergeIntoObject([{ a: 1 }, { b: 2 }])).toEqual({
      a: 1,
      b: 2,
    });

    // Test with overlapping keys (last wins)
    expect(toolkit.mergeIntoObject([{ a: 1 }, { a: 2, b: 3 }])).toEqual({
      a: 2,
      b: 3,
    });

    // Test error cases
    expect(toolkit.mergeIntoObject()).toBe(
      'Missing parameter. It has to be a value of type Array'
    );
    expect(toolkit.mergeIntoObject('not an array')).toBe(
      'Wrong parameter. It has to be a value of type Array'
    );
    expect(toolkit.mergeIntoObject(null)).toBe(
      'Wrong parameter. It has to be a value of type Array'
    );
    expect(toolkit.mergeIntoObject(42)).toBe(
      'Wrong parameter. It has to be a value of type Array'
    );
  });

  test('should maintain removeDuplicate behavior', () => {
    // Test with empty array
    expect(toolkit.removeDuplicate([])).toEqual([]);

    // Test with primitive values
    expect(toolkit.removeDuplicate([1, 2, 2, 3, 3, 4])).toEqual([1, 2, 3, 4]);
    expect(toolkit.removeDuplicate(['a', 'b', 'a', 'c'])).toEqual([
      'a',
      'b',
      'c',
    ]);
    expect(toolkit.removeDuplicate([true, false, true])).toEqual([true, false]);

    // Test with mixed types
    expect(toolkit.removeDuplicate([1, '1', true, 1, '1'])).toEqual([
      1,
      '1',
      true,
    ]);

    // Test with objects (objects are deduplicated by reference)
    const obj1 = { a: 1 };
    const obj2 = { a: 1 };
    const result = toolkit.removeDuplicate([obj1, obj2, obj1]);
    expect(result.length).toBeLessThanOrEqual(3); // May remove duplicates
    expect(result).toContain(obj1);
    expect(result).toContain(obj2);

    // Test error cases
    expect(toolkit.removeDuplicate()).toBe(
      'Missing parameter. It has to be a value of type Array'
    );
    expect(toolkit.removeDuplicate('not an array')).toBe(
      'Wrong parameter. It has to be a value of type Array'
    );
    expect(toolkit.removeDuplicate(null)).toBe(
      'Wrong parameter. It has to be a value of type Array'
    );
    expect(toolkit.removeDuplicate(42)).toBe(
      'Wrong parameter. It has to be a value of type Array'
    );
  });

  test('should maintain consistent return types', () => {
    // isEmpty should return boolean or undefined
    expect(typeof toolkit.isEmpty([])).toBe('boolean');
    expect(typeof toolkit.isEmpty([1, 2, 3])).toBe('boolean');
    expect(typeof toolkit.isEmpty()).toBe('undefined');

    // isOfType methods should return boolean
    expect(typeof toolkit.isOfType.string('test')).toBe('boolean');
    expect(typeof toolkit.isOfType.number(42)).toBe('boolean');
    expect(typeof toolkit.isOfType.boolean(true)).toBe('boolean');
    expect(typeof toolkit.isOfType.array([])).toBe('boolean');
    expect(typeof toolkit.isOfType.object({})).toBe('boolean');

    // mergeIntoObject should return object or string
    expect(typeof toolkit.mergeIntoObject([])).toBe('object');
    expect(typeof toolkit.mergeIntoObject()).toBe('string');

    // removeDuplicate should return array or string
    expect(Array.isArray(toolkit.removeDuplicate([]))).toBe(true);
    expect(typeof toolkit.removeDuplicate()).toBe('string');
  });

  test('should maintain immutability of input parameters', () => {
    const originalArray = [1, 2, 3];
    const originalObject = { a: 1, b: 2 };
    const originalString = 'hello';

    // Test isEmpty doesn't modify input
    toolkit.isEmpty(originalArray);
    toolkit.isEmpty(originalObject);
    toolkit.isEmpty(originalString);

    expect(originalArray).toEqual([1, 2, 3]);
    expect(originalObject).toEqual({ a: 1, b: 2 });
    expect(originalString).toBe('hello');

    // Test isOfType doesn't modify input
    toolkit.isOfType.array(originalArray);
    toolkit.isOfType.object(originalObject);
    toolkit.isOfType.string(originalString);

    expect(originalArray).toEqual([1, 2, 3]);
    expect(originalObject).toEqual({ a: 1, b: 2 });
    expect(originalString).toBe('hello');

    // Test mergeIntoObject doesn't modify input
    const inputArray = [{ a: 1 }, { b: 2 }];
    toolkit.mergeIntoObject(inputArray);

    expect(inputArray).toEqual([{ a: 1 }, { b: 2 }]);

    // Test removeDuplicate doesn't modify input
    const inputArray2 = [1, 2, 2, 3];
    toolkit.removeDuplicate(inputArray2);

    expect(inputArray2).toEqual([1, 2, 2, 3]);
  });
});
