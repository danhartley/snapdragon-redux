import { modules } from 'syllabus/lesson-modules';

test('should return at least one lesson module with at least one item', () => {    
    expect(modules.collections.length).toBeGreaterThan(0);
    expect(modules.collections[0].id).toBe(1);
});