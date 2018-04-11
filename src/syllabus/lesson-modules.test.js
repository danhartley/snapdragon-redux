import { modules } from 'syllabus/lesson-modules';

it('should return at least one lesson module', () => {
    const moduleSize = 2;
    const lesson = modules.prepareModule(2);
    expect(lesson.items.length).toBe(2);
});