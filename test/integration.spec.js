import toolkit from '../index.js';

describe('Integration tests', () => {
  test('should work with complex nested data structures', () => {
    const complexData = {
      users: [
        { id: 1, name: 'Alice', roles: ['admin', 'user'] },
        { id: 2, name: 'Bob', roles: ['user'] },
        { id: 3, name: 'Charlie', roles: ['moderator', 'user'] },
      ],
      settings: {
        theme: 'dark',
        notifications: true,
        language: 'en',
      },
    };

    // Test isEmpty with complex data
    expect(toolkit.isEmpty(complexData)).toBe(false);
    expect(toolkit.isEmpty(complexData.users)).toBe(false);
    expect(toolkit.isEmpty(complexData.settings)).toBe(false);

    // Test type checking
    expect(toolkit.isOfType.object(complexData)).toBe(true);
    expect(toolkit.isOfType.array(complexData.users)).toBe(true);
    expect(toolkit.isOfType.object(complexData.settings)).toBe(true);

    // Test with empty nested structures
    const emptyNested = {
      users: [],
      settings: {},
      metadata: null,
    };

    expect(toolkit.isEmpty(emptyNested.users)).toBe(true);
    expect(toolkit.isEmpty(emptyNested.settings)).toBe(true);
    expect(toolkit.isOfType.null(emptyNested.metadata)).toBe(true);
  });

  test('should handle data transformation pipeline', () => {
    const rawData = [
      { id: 1, value: 'a', category: 'alpha' },
      { id: 2, value: 'b', category: 'beta' },
      { id: 1, value: 'a', category: 'alpha' }, // Duplicate
      { id: 3, value: 'c', category: 'gamma' },
    ];

    // Remove duplicates
    const uniqueData = toolkit.removeDuplicate(rawData);
    expect(toolkit.isOfType.array(uniqueData)).toBe(true);
    // Note: removeDuplicate doesn't remove object duplicates, only primitive duplicates
    expect(uniqueData.length).toBe(4);

    // Merge into single object
    const mergedData = toolkit.mergeIntoObject(uniqueData);
    expect(toolkit.isOfType.object(mergedData)).toBe(true);
    expect(toolkit.isEmpty(mergedData)).toBe(false);

    // Verify final structure
    expect(mergedData).toHaveProperty('id');
    expect(mergedData).toHaveProperty('value');
    expect(mergedData).toHaveProperty('category');
  });

  test('should handle edge cases consistently', () => {
    // Test with various falsy values
    const falsyValues = [null, undefined, 0, false, ''];

    falsyValues.forEach(value => {
      if (toolkit.isOfType.nil(value)) {
        expect(toolkit.isEmpty(value)).toBeUndefined();
      } else if (toolkit.isOfType.string(value)) {
        expect(toolkit.isEmpty(value)).toBe(true);
      } else if (toolkit.isOfType.number(value)) {
        expect(toolkit.isEmpty(value)).toBeUndefined();
      }
    });

    // Test with empty collections
    const emptyCollections = [[], {}, new Map(), new Set(), ''];
    emptyCollections.forEach(collection => {
      expect(toolkit.isEmpty(collection)).toBe(true);
    });
  });

  test('should maintain data integrity through operations', () => {
    const originalData = [
      { name: 'John', age: 30 },
      { name: 'Jane', age: 25 },
      { name: 'John', age: 30 }, // Duplicate
    ];

    // Test that removeDuplicate preserves object references
    const uniqueData = toolkit.removeDuplicate(originalData);
    // Note: removeDuplicate doesn't remove object duplicates
    expect(uniqueData.length).toBe(3);

    // Verify that the references are preserved
    expect(uniqueData[0]).toBe(originalData[0]);
    expect(uniqueData[1]).toBe(originalData[1]);
    expect(uniqueData[2]).toBe(originalData[2]);

    // Test that mergeIntoObject creates a new object
    const mergedData = toolkit.mergeIntoObject(uniqueData);
    expect(mergedData).not.toBe(originalData[0]);
    expect(mergedData).not.toBe(originalData[1]);

    // Verify data is correctly merged
    expect(mergedData.name).toBe('John'); // Last occurrence wins
    expect(mergedData.age).toBe(30);
  });

  test('should handle type checking combinations', () => {
    // Test basic type checking without complex logic
    expect(toolkit.isOfType.string('hello')).toBe(true);
    expect(toolkit.isOfType.number(42)).toBe(true);
    expect(toolkit.isOfType.boolean(true)).toBe(true);
    expect(toolkit.isOfType.array([1, 2, 3])).toBe(true);
    expect(toolkit.isOfType.object({ key: 'value' })).toBe(true);
    expect(toolkit.isOfType.null(null)).toBe(true);
    expect(toolkit.isOfType.undefined(undefined)).toBe(true);
    expect(toolkit.isOfType.nil(null)).toBe(true);
    expect(toolkit.isOfType.nil(undefined)).toBe(true);
    expect(toolkit.isOfType.date(new Date())).toBe(true);
    expect(toolkit.isOfType.map(new Map())).toBe(true);
    expect(toolkit.isOfType.set(new Set())).toBe(true);
  });
});
