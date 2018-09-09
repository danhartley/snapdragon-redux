import { collection } from 'syllabus/lesson-config';

test.skip('config should have default lesson and level name', () => {
    expect(collection.lesson.name).toBe('Lesson 1');
    expect(collection.lesson.level.name).toBe('Level 1');
    // expect(config.lesson.name).toBe('Lesson 1');
    // expect(config.lesson.level.name).toBe('Level 1');
});