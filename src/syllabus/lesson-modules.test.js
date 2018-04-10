import { modules } from 'syllabus/lesson-modules';

it('should return at least one lesson module', () => {
    expect(modules.items.length).toBeGreaterThan(0);
});