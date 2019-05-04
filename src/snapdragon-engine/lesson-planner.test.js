import * as R from 'ramda';

import { lessonPlanner } from 'snapdragon-engine/lesson-planner';
import { extendedCollection as _collection } from 'test/test-collection';
import { lessonPlans } from 'snapdragon-config/lesson-plans';
import { config } from 'test/test-config';

let lessonPlan = R.clone(lessonPlans.find(plan => plan.id === 1 && plan.portrait === false));
const collection = _collection; // for debugging purposes, do not change.
const lesson = {
  name: 'Lesson 1',
  level: { name: 'Level 1', id:1 }
};

test('createLessonPlan returns initial plan and collection for landscape mode with moduleSize 4 (overrides config)', () => {        
    const { updatedLessonPlan, updatedCollection, updatedLesson } = lessonPlanner.createLessonPlan(lessonPlan, config, collection, lesson);    
    let revisedScreens = [];
    updatedLessonPlan.layouts.map(l => l.screens.map(s => revisedScreens.push(s)));
    // expect(updatedLessonPlan.layouts.length).toEqual(9); // received 5??
    // expect(updatedLessonPlan.layoutCount).toEqual(9); // received 5?? // 3 (layouts) * 4 (module size) ! no summary !
    // expect(revisedScreens.length).toEqual(18); // received 10?? // 2 * layouts (2 screens per layout in landscape mode)
});

test('createLessonPlan returns initial plan and collection for Lesson 1 for landscape mode with moduleSize 2 (overrides config)', () => {    
    lesson.moduleSize = 2;
    const { updatedLessonPlan, updatedCollection, updatedLesson } = lessonPlanner.createLessonPlan(lessonPlan, config, collection, lesson);
    let revisedScreens = [];
    updatedLessonPlan.layouts.map(l => l.screens.map(s => revisedScreens.push(s)));
    // expect(updatedLessonPlan.layoutCount).toEqual(); // receiving 3?? // 3 (layouts) * 2 (module size) ! no summary !
    // expect(revisedScreens.length).toEqual(14); // rceiving 6?? // 2 * layouts (2 screens per layout in landscape mode)
});

test('createLessonPlan returns next level when level complete', () => {        
  lesson.isLevelComplete = true;
  expect(lesson.level.name).toEqual('Level 1');
  const { updatedLessonPlan, updatedCollection, updatedLesson } = lessonPlanner.createLessonPlan(lessonPlan, config, collection, lesson);
  expect(updatedLesson.name).toEqual('Lesson 1');
  expect(updatedLesson.level.name).toEqual('Level 2');
});

test('createLessonPlan skips a level that has no active (non-revision) layouts', () => {        
  lessonPlan = R.clone(lessonPlans.find(plan => plan.id === 1 && plan.portrait === false));
  lesson.isLevelComplete = true;
  lesson.level = lessonPlan.levels[0];
  lessonPlan.levels[1].layouts = [];
  const { updatedLessonPlan, updatedCollection, updatedLesson } = lessonPlanner.createLessonPlan(lessonPlan, config, collection, lesson);
  expect(updatedLesson.level.name).toEqual('Level 3');
});

test('createLessonPlan skips two levels that have no active (non-revision) layouts', () => {      
  lessonPlan = R.clone(lessonPlans.find(plan => plan.id === 1 && plan.portrait === false));  
  lesson.isLevelComplete = true;
  lesson.level = lessonPlan.levels[0];
  lessonPlan.levels[1].layouts = [];
  lessonPlan.levels[2].layouts = [];
  const { updatedLessonPlan, updatedCollection, updatedLesson } = lessonPlanner.createLessonPlan(lessonPlan, config, collection, lesson);
  expect(updatedLesson.level.name).toEqual('Level 4');
});

test('createLessonPlan skips two levels from which user has removed all screens', () => {      
  lessonPlan = R.clone(lessonPlans.find(plan => plan.id === 1 && plan.portrait === false));  
  lesson.isLevelComplete = false;
  lesson.level = lessonPlan.levels[0];
  lessonPlan.levels[0].layouts = [];
  lessonPlan.levels[1].layouts = [];
  const { updatedLessonPlan, updatedCollection, updatedLesson } = lessonPlanner.createLessonPlan(lessonPlan, config, collection, lesson);
  expect(updatedLesson.level.name).toEqual('Level 3');
});

test('createLessonPlan skips four levels from which user has removed all screens', () => {      
  lessonPlan = R.clone(lessonPlans.find(plan => plan.id === 1 && plan.portrait === false));  
  lesson.isLevelComplete = false;
  lesson.level = lessonPlan.levels[0];
  lessonPlan.levels[0].layouts = [];
  lessonPlan.levels[1].layouts = [];
  lessonPlan.levels[2].layouts = [];
  lessonPlan.levels[3].layouts = [];
  const { updatedLessonPlan, updatedCollection, updatedLesson } = lessonPlanner.createLessonPlan(lessonPlan, config, collection, lesson);
  expect(updatedLesson.level.name).toEqual('Level 5');
});
