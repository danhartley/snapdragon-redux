import { lessonPlanner } from 'syllabus/lesson-planner';
import { lessonPlan } from 'syllabus/lesson-plans';

test('createLessonPlan returns lesson1 screens unchanged for given number of items', () => {
    const moduleSize = 2;
    const layouts = lessonPlanner.createLessonPlan('lesson1', 'level1', moduleSize);
    const revisedLayoutCount = layouts.length;
    let revisedScreens = [];
    layouts.map(layout => {
        layout.screens.map(screen => revisedScreens.push(screen));
    });
    expect(revisedLayoutCount).toEqual(8); // 2*4 = 8
    expect(revisedScreens.length).toEqual(18); // 2*7 + 4 = 18
});

test('createLessonPlan returns lesson1 missing revision screens for given number of items', () => {
    const moduleSize = 2;
    const excludeRevision = true;
    const layouts = lessonPlanner.createLessonPlan('lesson1', 'level1', moduleSize, excludeRevision);
    const revisedLayoutCount = layouts.length;
    let revisedScreens = [];
    layouts.map(layout => {
        layout.screens.map(screen => revisedScreens.push(screen));
    });
    expect(revisedLayoutCount).toEqual(6); // 2*3 = 6
    expect(revisedScreens.length).toEqual(14); // 2*5 + 4 = 14
});

test('config should return next available level', () => {
    const level = lessonPlanner.nextLevel('lesson1', 'level1');
    expect(level.name).toEqual('level2');
});

test('config should return current level where there is no next available level', () => {
    const level = lessonPlanner.nextLevel('lesson1', 'level4');
    expect(level.name).toEqual('level4');
});

test('config should return current level where there is no previous available level', () => {
    const level = lessonPlanner.previousLevel('lesson1', 'level1');
    expect(level.name).toEqual('level1');
});