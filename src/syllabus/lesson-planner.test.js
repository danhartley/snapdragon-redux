import { lessonPlanner } from 'syllabus/lesson-planner';
import { lessonPlan } from 'syllabus/lesson-plans';

test.skip('createLessonPlan returns Lesson 1 screens unchanged for given collection', () => {
    const moduleSize = 2;
    const layouts = lessonPlanner.createLessonPlan('Lesson 1', 'Level 1', moduleSize);
    const revisedLayoutCount = layouts.length;
    let revisedScreens = [];
    layouts.map(layout => {
        layout.screens.map(screen => revisedScreens.push(screen));
    });
    expect(revisedLayoutCount).toEqual(8); // 2*4 = 8
    expect(revisedScreens.length).toEqual(18); // 2*7 + 4 = 18
});

test.skip('createLessonPlan returns Lesson 1 missing revision screens for given collection', () => {
    const moduleSize = 2;
    const excludeRevision = true;
    const layouts = lessonPlanner.createLessonPlan('Lesson 1', 'Level 1', moduleSize, excludeRevision);
    const revisedLayoutCount = layouts.length;
    let revisedScreens = [];
    layouts.map(layout => {
        layout.screens.map(screen => revisedScreens.push(screen));
    });
    expect(revisedLayoutCount).toEqual(6); // 2*3 = 6
    expect(revisedScreens.length).toEqual(14); // 2*5 + 4 = 14
});

test('config should return next available level', () => {
    const level = lessonPlanner.nextLevel('Lesson 1', 'Level 1');
    expect(level.name).toEqual('Level 2');
});

test('config should return current level where there is no next available level', () => {
    const level = lessonPlanner.nextLevel('Lesson 1', 'Level 5');
    expect(level.name).toEqual('Level 5');
});

test('config should return current level where there is no previous available level', () => {
    const level = lessonPlanner.previousLevel('Lesson 1', 'Level 1');
    expect(level.name).toEqual('Level 1');
});