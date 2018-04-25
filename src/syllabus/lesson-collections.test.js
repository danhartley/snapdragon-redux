import { collections } from 'syllabus/lesson-collections';

test('should return at least one lesson module with at least one item', () => {    
    expect(collections.length).toBeGreaterThan(0);
    expect(collections[0].id).toBe('1');
});