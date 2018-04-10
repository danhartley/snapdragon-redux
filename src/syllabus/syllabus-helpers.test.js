import { createLesson } from 'syllabus/syllabus-helpers';

test('createLesson should return new lesson plan with correct number of screens', () => {
    const layout = {screens:[{}]};
    const layouts = [layout, layout, layout, layout];
    const progressScreens = [{},{}];
    const items = [1,2,3];
    expect(createLesson(layouts, progressScreens, items.length).length).toBe(12);
});

test('createLesson should return final layout with correct number of screens', () => {
    const layout = {screens:[{}]};
    const layouts = [layout, layout, layout, layout];
    const progressScreens = [{},{}];
    const items = [1,2,3];
    const lesson = createLesson(layouts, progressScreens, items.length);
    const firstLesson = { layoutIndex: 0, itemIndex: 0, exerciseIndex: 1, screens: [{}]};
    const finalLayout = { layoutIndex: 11, itemIndex: 2, exerciseIndex: 4, screens: [{}, {}, {}]};
    expect(lesson[0]).toEqual(firstLesson);
    expect(lesson[lesson.length - 1]).toEqual(finalLayout);
});

