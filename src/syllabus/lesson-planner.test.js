import { lessonPlanner } from 'syllabus/lesson-planner';

test('createLessonPlan returns layouts and screens for Lesson 1 for landscape mode by default', () => {    
    const config = { lesson:  { name: 'Lesson 1', level: { name: 'Level 1'}}, moduleSize: 2, isPortraitMode: false };
    const layouts = lessonPlanner.createLessonPlan(config);
    const revisedLayoutCount = layouts.length;
    let revisedScreens = [];
    layouts.map(layout => {
        layout.screens.map(screen => revisedScreens.push(screen));
    });
    expect(revisedLayoutCount).toEqual(9); // 2*4 + 1 = 9
    expect(revisedScreens.length).toEqual(18); // 2*7 + 4 = 18
});

test('createLessonPlan returns Lesson 1 missing revision screens for given collection', () => {
    const config = { lesson:  { name: 'Lesson 1', level: { name: 'Level 1'}}, moduleSize: 2, excludeRevision: true, isPortraitMode: false };
    const layouts = lessonPlanner.createLessonPlan(config);
    const revisedLayoutCount = layouts.length;
    let revisedScreens = [];
    layouts.map(layout => {
        layout.screens.map(screen => revisedScreens.push(screen));
    });
    expect(revisedLayoutCount).toEqual(7); // 2*3 + 1 = 7
    expect(revisedScreens.length).toEqual(14); // 2*5 + 4 = 14
});

test('config should return next available level', () => {
    const level = lessonPlanner.nextLevel('Lesson 1', 'Level 1');
    expect(level.name).toEqual('Level 2');
});

test('config should return current level where there is no next available level', () => {
    const level = lessonPlanner.nextLevel('Lesson 1', 'Level 4');
    expect(level.name).toEqual('Level 5');
});

test('config should return current level where there is no previous available level', () => {
    const level = lessonPlanner.previousLevel('Lesson 1', 'Level 1');
    expect(level.name).toEqual('Level 1');
});