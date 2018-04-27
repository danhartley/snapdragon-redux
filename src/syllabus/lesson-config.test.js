import { config } from 'syllabus/lesson-config';

test('config should have default lesson and level name', () => {
    expect(config.lesson.name).toBe('Lesson 1');
    expect(config.lesson.level.name).toBe('Level 5');
});