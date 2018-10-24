import { config } from 'syllabus/lesson-config';

test('config should have default collection id of 0', () => {
    expect(config.collection.id).toBe(0);
});