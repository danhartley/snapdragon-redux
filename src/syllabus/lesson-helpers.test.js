import { createLesson } from 'syllabus/lesson-helpers';

test.skip('createLesson should return new lesson plan with correct number of screens', () => {
    const layout = {screens:[{}]};
    const layouts = [layout, layout, layout, layout];
    const progressScreens = [{},{}];
    const collection = [1,2,3];
    expect(createLesson('Lesson 1', 'Level 1', collection.length, layouts, progressScreens).length).toBe(12);
});

test.skip('createLesson should return final layout with correct number of screens', () => {
    const layout = {screens:[{}]};
    const layouts = [layout, layout, layout, layout];
    const progressScreens = [{},{}];
    const collection = [1,2,3];
    const lesson = createLesson('Lesson 1', 'Level 1', collection.length, layouts, progressScreens);
    const firstLesson = { layoutIndex: 0, itemIndex: 0, exerciseIndex: 1, lessonName: 'Lesson 1', levelName: 'Level 1', screens: [{}]};
    const finalLayout = { layoutIndex: 11, itemIndex: 2, exerciseIndex: 4, lessonName: 'Lesson 1', levelName: 'Level 1', screens: [{}, {}, {}]};
    expect(lesson[0]).toEqual(firstLesson);
    expect(lesson[lesson.length - 1]).toEqual(finalLayout);
});

test.skip('createLesson should return final layout with correct number of screens', () => {
    const layout = {screens:[{}]};
    const layouts = [layout, layout, layout, layout];
    const progressScreens = [{},{}];
    const collection = [1,2,3];
    const lesson = createLesson('Lesson 1', 'Level 1', collection.length, layouts, progressScreens);
    const firstLesson = { layoutIndex: 0, itemIndex: 0, exerciseIndex: 1, lessonName: 'Lesson 1', levelName: 'Level 1', screens: [{}]};
    const finalLayout = { layoutIndex: 11, itemIndex: 2, exerciseIndex: 4, lessonName: 'Lesson 1', levelName: 'Level 1', screens: [{}, {}, {}]};
    expect(lesson[0]).toEqual(firstLesson);
    expect(lesson[lesson.length - 1]).toEqual(finalLayout);
});
