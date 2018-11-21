import * as R from 'ramda';

import { lessonPlanner } from 'syllabus/lesson-planner';
import { extendedCollection as _collection } from 'test/test-collection';
import { lessonPlans } from 'snapdragon/lesson-plans';
import { config } from 'test/test-config';

let lessonPlan = R.clone(lessonPlans.find(plan => plan.id === 1 && plan.portrait === false));
const collection = _collection; // for debugging purposes, do not change.

test('createLessonPlan returns initial plan and collection for landscape mode with moduleSize 4 (overrides config)', () => {        
    const { updatedLessonPlan, updatedCollection } = lessonPlanner.createLessonPlan(lessonPlan, config, collection);    
    let revisedScreens = [];
    updatedLessonPlan.layouts.map(l => l.screens.map(s => revisedScreens.push(s)));
    expect(updatedLessonPlan.layouts.length).toEqual(13);
    expect(updatedLessonPlan.layoutCount).toEqual(13); // 3 (layouts) * 4 (module size) + 1 (summary)
    expect(revisedScreens.length).toEqual(26); // 2 * layouts (2 screens per layout in landscape mode)
});

test('createLessonPlan returns initial plan and collection for Lesson 1 for landscape mode with moduleSize 2 (overrides config)', () => {    
    collection.moduleSize = 2;
    const { updatedLessonPlan, updatedCollection } = lessonPlanner.createLessonPlan(lessonPlan, config, collection);
    let revisedScreens = [];
    updatedLessonPlan.layouts.map(l => l.screens.map(s => revisedScreens.push(s)));
    expect(updatedLessonPlan.layoutCount).toEqual(7); // 3 (layouts) * 2 (module size) + 1 (summary)
    expect(revisedScreens.length).toEqual(14); // 2 * layouts (2 screens per layout in landscape mode)
});

test('createLessonPlan returns next level when level complete', () => {        
  collection.isLevelComplete = true;
  expect(collection.lesson.level.name).toEqual('Level 1');
  const { updatedLessonPlan, updatedCollection } = lessonPlanner.createLessonPlan(lessonPlan, config, collection);
  expect(updatedCollection.lessonName).toEqual('Lesson 1');
  expect(updatedCollection.levelName).toEqual('Level 2');
});

test('createLessonPlan skips a level that has no active (non-revision) layouts', () => {        
  lessonPlan = R.clone(lessonPlans.find(plan => plan.id === 1 && plan.portrait === false));
  collection.isLevelComplete = true;
  collection.lesson.level = lessonPlan.levels[0];
  lessonPlan.levels[1].layouts = [];
  lessonPlan.levels[1].wildcardLayouts = [];
  const { updatedLessonPlan, updatedCollection } = lessonPlanner.createLessonPlan(lessonPlan, config, collection);
  expect(updatedCollection.levelName).toEqual('Level 3');
});

test('createLessonPlan skips two levels that have no active (non-revision) layouts', () => {      
  lessonPlan = R.clone(lessonPlans.find(plan => plan.id === 1 && plan.portrait === false));  
  collection.isLevelComplete = true;
  collection.lesson.level = lessonPlan.levels[0];
  lessonPlan.levels[1].layouts = [];
  lessonPlan.levels[2].layouts = [];
  lessonPlan.levels[1].wildcardLayouts = [];
  lessonPlan.levels[2].wildcardLayouts = [];
  const { updatedLessonPlan, updatedCollection } = lessonPlanner.createLessonPlan(lessonPlan, config, collection);
  expect(updatedCollection.levelName).toEqual('Level 4');
});

test('createLessonPlan skips two levels from which user has removed all screens', () => {      
  lessonPlan = R.clone(lessonPlans.find(plan => plan.id === 1 && plan.portrait === false));  
  collection.isLevelComplete = false;
  collection.lesson.level = lessonPlan.levels[0];
  lessonPlan.levels[0].layouts = [];
  lessonPlan.levels[1].layouts = [];
  lessonPlan.levels[0].wildcardLayouts = [];
  lessonPlan.levels[1].wildcardLayouts = [];
  const { updatedLessonPlan, updatedCollection } = lessonPlanner.createLessonPlan(lessonPlan, config, collection);
  expect(updatedCollection.levelName).toEqual('Level 3');
});

test('createLessonPlan skips four levels from which user has removed all screens', () => {      
  lessonPlan = R.clone(lessonPlans.find(plan => plan.id === 1 && plan.portrait === false));  
  collection.isLevelComplete = false;
  collection.lesson.level = lessonPlan.levels[0];
  lessonPlan.levels[0].layouts = [];
  lessonPlan.levels[1].layouts = [];
  lessonPlan.levels[2].layouts = [];
  lessonPlan.levels[3].layouts = [];
  lessonPlan.levels[0].wildcardLayouts = [];
  lessonPlan.levels[1].wildcardLayouts = [];
  lessonPlan.levels[2].wildcardLayouts = [];
  lessonPlan.levels[3].wildcardLayouts = [];
  const { updatedLessonPlan, updatedCollection } = lessonPlanner.createLessonPlan(lessonPlan, config, collection);
  expect(updatedCollection.levelName).toEqual('Level 5');
});
