import toolkit from '../index.js';

describe('Load tests', () => {
  test('should handle multiple concurrent operations', () => {
    const iterations = 1000;
    const start = performance.now();

    for (let i = 0; i < iterations; i++) {
      toolkit.isEmpty([i]);
      toolkit.isOfType.number(i);
      toolkit.isOfType.string(`string${i}`);
      toolkit.isOfType.boolean(i % 2 === 0);
    }

    const end = performance.now();
    const duration = end - start;

    // Should complete 1000 iterations in less than 100ms
    expect(duration).toBeLessThan(100);
  });

  test('should handle large data structures efficiently', () => {
    const largeArray = Array.from({ length: 10000 }, (_, i) => ({
      id: i,
      name: `User${i}`,
      data: Array.from({ length: 100 }, (_, j) => `data${j}`),
    }));

    const start = performance.now();

    // Process large array
    const isEmpty = toolkit.isEmpty(largeArray);
    const isArray = toolkit.isOfType.array(largeArray);
    const uniqueData = toolkit.removeDuplicate(largeArray);

    const end = performance.now();
    const duration = end - start;

    expect(isEmpty).toBe(false);
    expect(isArray).toBe(true);
    expect(uniqueData.length).toBe(10000);
    expect(duration).toBeLessThan(50); // Should complete in less than 50ms
  });

  test('should maintain performance under memory pressure', () => {
    const objects = [];
    const start = performance.now();

    // Create many objects
    for (let i = 0; i < 1000; i++) {
      objects.push({
        id: i,
        data: `data${i}`,
        metadata: { timestamp: Date.now(), index: i },
      });
    }

    // Process objects
    const merged = toolkit.mergeIntoObject(objects);
    const end = performance.now();
    const duration = end - start;

    expect(toolkit.isOfType.object(merged)).toBe(true);
    expect(toolkit.isEmpty(merged)).toBe(false);
    expect(duration).toBeLessThan(100); // Should complete in less than 100ms
  });

  test('should handle mixed data types efficiently', () => {
    const mixedData = [
      'string',
      42,
      true,
      [1, 2, 3],
      { key: 'value' },
      null,
      undefined,
      new Date(),
      new Map([['key', 'value']]),
      new Set([1, 2, 3]),
    ];

    const start = performance.now();
    const results = [];

    // Test all type checking methods
    for (let i = 0; i < 1000; i++) {
      mixedData.forEach(item => {
        results.push(toolkit.isOfType.string(item));
        results.push(toolkit.isOfType.number(item));
        results.push(toolkit.isOfType.boolean(item));
        results.push(toolkit.isOfType.array(item));
        results.push(toolkit.isOfType.object(item));
        results.push(toolkit.isOfType.null(item));
        results.push(toolkit.isOfType.undefined(item));
        results.push(toolkit.isOfType.nil(item));
      });
    }

    const end = performance.now();
    const duration = end - start;

    expect(results.length).toBe(80000); // 8 checks * 10 items * 1000 iterations
    expect(duration).toBeLessThan(200); // Should complete in less than 200ms
  });
});
