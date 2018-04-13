import { config } from 'syllabus/lesson-config';

test('config should have default active lesson and level', () => {
    expect(config.active.lesson).not.toBeNaN();
    expect(config.active.lesson).toBe(1);
    expect(config.active.level).not.toBeNaN();
    expect(config.active.level).toBe(1);
});

test('config should return next available level', () => {
    const newConfig = config.nextLevel('level1');
    expect(newConfig.active.level).toEqual(2);
});

test('config should return current level where there is no next available level', () => {
    const newConfig = config.nextLevel('level2');
    expect(newConfig.active.level).toEqual(2);
    expect(newConfig.active.level).toEqual(2);
});