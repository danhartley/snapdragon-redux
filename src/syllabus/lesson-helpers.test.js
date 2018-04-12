import { createLessonLayouts } from 'syllabus/lesson-helpers';

test('createLessonLayouts should return new lesson plan with correct number of screens', () => {
    const layout = {screens:[{}]};
    const layouts = [layout, layout, layout, layout];
    const progressScreens = [{},{}];
    const items = [1,2,3];
    expect(createLessonLayouts('lesson1', 'level1', items.length, layouts, progressScreens).length).toBe(12);
});

test('createLessonLayouts should return final layout with correct number of screens', () => {
    const layout = {screens:[{}]};
    const layouts = [layout, layout, layout, layout];
    const progressScreens = [{},{}];
    const items = [1,2,3];
    const lesson = createLessonLayouts('lesson1', 'level1', items.length, layouts, progressScreens);
    const firstLesson = { layoutIndex: 0, itemIndex: 0, exerciseIndex: 1, lessonName: 'lesson1', levelName: 'level1', screens: [{}]};
    const finalLayout = { layoutIndex: 11, itemIndex: 2, exerciseIndex: 4, lessonName: 'lesson1', levelName: 'level1', screens: [{}, {}, {}]};
    expect(lesson[0]).toEqual(firstLesson);
    expect(lesson[lesson.length - 1]).toEqual(finalLayout);
});

test('createLessonLayouts should return final layout with correct number of screens', () => {
    const layout = {screens:[{}]};
    const layouts = [layout, layout, layout, layout];
    const progressScreens = [{},{}];
    const items = [1,2,3];
    const lesson = createLessonLayouts('lesson1', 'level1', items.length, layouts, progressScreens);
    const firstLesson = { layoutIndex: 0, itemIndex: 0, exerciseIndex: 1, lessonName: 'lesson1', levelName: 'level1', screens: [{}]};
    const finalLayout = { layoutIndex: 11, itemIndex: 2, exerciseIndex: 4, lessonName: 'lesson1', levelName: 'level1', screens: [{}, {}, {}]};
    expect(lesson[0]).toEqual(firstLesson);
    expect(lesson[lesson.length - 1]).toEqual(finalLayout);
});
