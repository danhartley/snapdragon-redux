import { lessonPlanner } from 'syllabus/lesson-planner';
import { collection as _collection } from 'test/test-collection';
import { lessonPlans } from 'snapdragon/lesson-plans';
import { config } from 'test/test-config';

const lessonPlan = lessonPlans.find(plan => plan.id === 1 && plan.portrait === false);
const collection = _collection;

test('createLessonPlan returns initial plan and collection for landscape mode with moduleSize 4 (overrides config)', () => {        
    const { updatedLessonPlan, updatedCollection } = lessonPlanner.createLessonPlan(lessonPlan, config, collection);    
    let revisedScreens = [];
    updatedLessonPlan.layouts.map(l => l.screens.map(s => revisedScreens.push(s)));
    expect(updatedLessonPlan.layouts.length).toEqual(17);
    expect(updatedLessonPlan.layoutCount).toEqual(17); // 4 (layouts) * 4 (module size) + 1 (summary)
    expect(revisedScreens.length).toEqual(34); // 2 * layouts (2 screens per layout in landscape mode)
});

test('createLessonPlan returns initial plan and collection for Lesson 1 for landscape mode with moduleSize 2 (overrides config)', () => {    
    collection.moduleSize = 2;
    const { updatedLessonPlan, updatedCollection } = lessonPlanner.createLessonPlan(lessonPlan, config, collection);
    let revisedScreens = [];
    updatedLessonPlan.layouts.map(l => l.screens.map(s => revisedScreens.push(s)));
    expect(updatedLessonPlan.layoutCount).toEqual(9); // 4 (layouts) * 2 (module size) + 1 (summary)
    expect(revisedScreens.length).toEqual(18); // 2 * layouts (2 screens per layout in landscape mode)
});

test('createLessonPlan returns next level when level complete', () => {        
  collection.isLevelComplete = true;
  const { updatedLessonPlan, updatedCollection } = lessonPlanner.createLessonPlan(lessonPlan, config, collection);
  expect(collection.lessonName).toEqual('Lesson 1');
  expect(collection.levelName).toEqual('Level 2');
});

test('createLessonPlan skips a level that has no active (non-revision) layouts', () => {        
  collection.isLevelComplete = true;
  collection.lesson.level = lessonPlan.levels[0];
  lessonPlan.levels[1].layouts = [];
  lessonPlan.levels[1].wildcardLayouts = [];
  const { updatedLessonPlan, updatedCollection } = lessonPlanner.createLessonPlan(lessonPlan, config, collection);
  expect(collection.levelName).toEqual('Level 3');
});
