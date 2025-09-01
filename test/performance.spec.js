import toolkit from '../index.js';

describe('Performance tests', () => {
  const largeArray = Array.from({ length: 1000 }, (_, i) => i);
  const largeObject = Object.fromEntries(
    Array.from({ length: 100 }, (_, i) => [`key${i}`, `value${i}`])
  );

  test('isEmpty performance with large arrays', () => {
    const start = performance.now();
    toolkit.isEmpty(largeArray);
    const end = performance.now();

    expect(end - start).toBeLessThan(1); // Moins de 1ms
  });

  test('isEmpty performance with large objects', () => {
    const start = performance.now();
    toolkit.isEmpty(largeObject);
    const end = performance.now();

    expect(end - start).toBeLessThan(1); // Moins de 1ms
  });

  test('removeDuplicate performance with large arrays', () => {
    const arrayWithDuplicates = [...largeArray, ...largeArray];
    const start = performance.now();
    toolkit.removeDuplicate(arrayWithDuplicates);
    const end = performance.now();

    expect(end - start).toBeLessThan(5); // Moins de 5ms
  });

  test('mergeIntoObject performance with reasonable arrays', () => {
    const arrayOfObjects = Array.from({ length: 100 }, (_, i) => ({
      [`key${i}`]: `value${i}`,
    }));
    const start = performance.now();
    toolkit.mergeIntoObject(arrayOfObjects);
    const end = performance.now();

    expect(end - start).toBeLessThan(5); // Moins de 5ms
  });

  test('isOfType performance with various types', () => {
    const testValues = [
      'string',
      42,
      true,
      [1, 2, 3],
      { key: 'value' },
      null,
      undefined,
      new Date(),
      new Map(),
      new Set(),
    ];

    const start = performance.now();
    testValues.forEach(value => {
      toolkit.isOfType.string(value);
      toolkit.isOfType.number(value);
      toolkit.isOfType.boolean(value);
      toolkit.isOfType.array(value);
      toolkit.isOfType.object(value);
    });
    const end = performance.now();

    expect(end - start).toBeLessThan(1); // Moins de 1ms
  });
});
