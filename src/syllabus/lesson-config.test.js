import { config } from 'syllabus/lesson-config';

test('config should have default lesson and level name', () => {
    expect(config.lessonName).toBe('lesson1');
    expect(config.levelName).toBe('level1');
});