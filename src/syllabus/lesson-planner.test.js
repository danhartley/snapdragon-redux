import { lessonPlanner } from 'syllabus/lesson-planner';

test.skip('createLessonPlan returns layouts and screens for Lesson 1 for landscape mode by default', () => {    
    const config = { lesson:  { name: 'Lesson 1', level: { name: 'Level 1'}}, moduleSize: 2, isPortraitMode: false };
    const collection = { wildcards: [{ name: 'epithets', items: [{species: 'species 1'}]}]};
    const layouts = lessonPlanner.createLessonPlan(config, collection);
    const revisedLayoutCount = layouts.length;
    let revisedScreens = [];
    layouts.map(layout => {
        layout.screens.map(screen => revisedScreens.push(screen));
    });
    expect(revisedLayoutCount).toEqual(10); // 2*4 + 1   + 1 (wildcard)= 9
    expect(revisedScreens.length).toEqual(20); // 2*7 + 4 + 2 (wildcards) = 18
});

test.skip('createLessonPlan returns Lesson 1 missing revision screens for given collection', () => {
    const config = { lesson:  { name: 'Lesson 1', level: { name: 'Level 1'}}, moduleSize: 2, excludeRevision: true, isPortraitMode: false };
    const collection = { wildcards: [{ name: 'epithets', items: [{species: 'species 1'}]}]};
    const layouts = lessonPlanner.createLessonPlan(config, collection);
    const revisedLayoutCount = layouts.length;
    let revisedScreens = [];
    layouts.map(layout => {
        layout.screens.map(screen => revisedScreens.push(screen));
    });
    expect(revisedLayoutCount).toEqual(8); // 2*3 + 1 + 1 (wildcard) = 7
    expect(revisedScreens.length).toEqual(16); // 2*5 + 4 + 2 (wildcards) = 14
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