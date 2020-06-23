import { clone } from 'ramda';

// import { lessonPlanner } from 'snapdragon-engine/lesson-planner';
import { extendedCollection as _collection } from 'test/test-collection';
import { lessonPlans } from 'snapdragon-config/lesson-plans';
import { config } from 'test/test-config';

let lessonPlan = clone(lessonPlans.find(plan => plan.id === 1 && plan.portrait === false));
const collection = _collection; // for debugging purposes, do not change.
const lesson = {
  name: 'Lesson 1',
  level: { name: 'Level 1', id:1 },
  moduleSize: 4
};

test('', () => {});

// test('createLessonPlan returns initial plan and collection for landscape mode with moduleSize 4 (overrides config)', () => {            
//     const { updatedLessonPlan, updatedCollection, updatedLesson } = lessonPlanner.createLessonPlan(lessonPlan, config, collection, lesson);    
//     let revisedScreens = [];
//     updatedLessonPlan.layouts.map(l => l.screens.map(s => revisedScreens.push(s)));
//     expect(updatedLessonPlan.layouts.length).toEqual(10); // 2 lessons * 4 (moduleSize) + summary + history
//     expect(revisedScreens.length).toEqual(20); // 2 lessons * 4 (moduleSize) * 2 screens (landscape) + summary + history
// });

// test('createLessonPlan returns initial plan and collection for Lesson 1 for landscape mode with moduleSize 2 (overrides config)', () => {    
//     lesson.moduleSize = 2;
//     const { updatedLessonPlan, updatedCollection, updatedLesson } = lessonPlanner.createLessonPlan(lessonPlan, config, collection, lesson);
//     let revisedScreens = [];
//     updatedLessonPlan.layouts.map(l => l.screens.map(s => revisedScreens.push(s)));
//     expect(updatedLessonPlan.layoutCount).toEqual(undefined);
// });

// test('createLessonPlan returns next level when level complete', () => {        
//   lesson.isLevelComplete = true;
//   expect(lesson.level.name).toEqual('Level 1');
//   const { updatedLessonPlan, updatedCollection, updatedLesson } = lessonPlanner.createLessonPlan(lessonPlan, config, collection, lesson);
//   expect(updatedLesson.name).toEqual('Lesson 1');
//   expect(updatedLesson.level.name).toEqual('Level 2');
// });

// test('createLessonPlan skips a level that has no active (non-revision) layouts', () => {        
//   lessonPlan = R.clone(lessonPlans.find(plan => plan.id === 1 && plan.portrait === false));
//   lesson.isLevelComplete = true;
//   lesson.level = lessonPlan.levels[0];
//   lessonPlan.levels[1].layouts = [];
//   lessonPlan.levels[1].bonusLayouts = [];
//   const { updatedLessonPlan, updatedCollection, updatedLesson } = lessonPlanner.createLessonPlan(lessonPlan, config, collection, lesson);
//   expect(updatedLesson.level.name).toEqual('Level 3');
// });

// test('createLessonPlan skips two levels that have no active (non-revision) layouts', () => {      
//   lessonPlan = R.clone(lessonPlans.find(plan => plan.id === 1 && plan.portrait === false));  
//   lesson.isLevelComplete = true;
//   lesson.level = lessonPlan.levels[0];
//   lessonPlan.levels[1].layouts = [];
//   lessonPlan.levels[1].bonusLayouts = [];
//   lessonPlan.levels[2].layouts = [];
//   lessonPlan.levels[2].bonusLayouts = [];
//   const { updatedLessonPlan, updatedCollection, updatedLesson } = lessonPlanner.createLessonPlan(lessonPlan, config, collection, lesson);
//   expect(updatedLesson.level.name).toEqual('Level 4');
// });

// test('createLessonPlan skips two levels from which user has removed all screens', () => {      
//   lessonPlan = R.clone(lessonPlans.find(plan => plan.id === 1 && plan.portrait === false));  
//   lesson.isLevelComplete = false;
//   lesson.level = lessonPlan.levels[0];
//   lessonPlan.levels[0].layouts = [];
//   lessonPlan.levels[0].bonusLayouts = [];
//   lessonPlan.levels[1].layouts = [];
//   lessonPlan.levels[1].bonusLayouts = [];
//   const { updatedLessonPlan, updatedCollection, updatedLesson } = lessonPlanner.createLessonPlan(lessonPlan, config, collection, lesson);
//   expect(updatedLesson.level.name).toEqual('Level 3');
// });

// test('createLessonPlan skips four levels from which user has removed all screens', () => {      
//   lessonPlan = R.clone(lessonPlans.find(plan => plan.id === 1 && plan.portrait === false));  
//   lesson.isLevelComplete = false;
//   lesson.level = lessonPlan.levels[0];
//   lessonPlan.levels[0].layouts = [];
//   lessonPlan.levels[0].bonusLayouts = [];
//   lessonPlan.levels[1].layouts = [];
//   lessonPlan.levels[1].bonusLayouts = [];
//   lessonPlan.levels[2].layouts = [];
//   lessonPlan.levels[2].bonusLayouts = [];
//   lessonPlan.levels[3].layouts = [];
//   lessonPlan.levels[3].bonusLayouts = [];
//   const { updatedLessonPlan, updatedCollection, updatedLesson } = lessonPlanner.createLessonPlan(lessonPlan, config, collection, lesson);
//   expect(updatedLesson.level.name).toEqual('Level 5');
// });
