import * as R from 'ramda';

import { types } from 'redux/actions/action-types';
import { collection } from 'redux/reducers/species-reducers';
import { snapdragonCollections } from 'snapdragon-config/snapdragon-collections';
import { unextendedCollection } from 'test/test-collection';

import { state1 } from 'test/redux-test-collections/state-1';
import { state2 } from 'test/redux-test-collections/state-2';
import { state3 } from 'test/redux-test-collections/state-3';
import { state3Refresh } from 'test/redux-test-collections/state-3-refresh';
import { state4 } from 'test/redux-test-collections/state-4';
import { snapdragon } from 'test/redux-test-snapdragon/state-1';
import { lessonPlanner } from 'snapdragon-engine/lesson-planner';

const herbCollection = {
  "name": "Mint and Basil Family",
  "items": [
    {
      "id": 578478,
      "name": "Salvia officinalis"
    },
    {
      "id": 579652,
      "name": "Prunella vulgaris"
    },
    {
      "id": 579591,
      "name": "Hyssopus officinalis"
    },
    {
      "id": 579364,
      "name": "Ocimum basilicum"
    },
    {
      "id": 595655,
      "name": "Lamium purpureum"
    },
    {
      "id": 483849,
      "name": "Lavandula stoechas"
    }
  ],
  "itemIndex": 0,
  "currentRound": 1,
  "moduleSize": 2,
  "rounds": 3,
  lesson: { levels: [], level: {}}
}

test('collection should return default parameter state when there is no action type', () => {

  const action = { };  

const state = collection(snapdragonCollections, action);

  const received = {"currentRound": 1, "descriptions": null, "id": 0, "isNextRound": true,"rounds": 0};

  // expect(state).toEqual(received); // We now bring in all species...
});


test('collection should return correct itemIndex for action type NEXT_ITEM', () => {

  let action = { data: 0, type: types.NEXT_ITEM };
  let state = collection(herbCollection, action);
  expect(state.itemIndex).toBe(0);

  action = { data: 1, type: types.NEXT_ITEM };
  state = collection(state, action);
  expect(state.itemIndex).toBe(1);

  action = { data: 2, type: types.NEXT_ITEM };
  state = collection(state, action);
  expect(state.itemIndex).toBe(2);

});

test('collection should return correct itemIndex and currentRound over several rounds', () => {

  // round 1

  let action = { data: 0, type: types.NEXT_ITEM };
  let state = collection(herbCollection, action);

  expect(state.currentRound).toBe(1);
  expect(state.itemIndex).toBe(0);

  // round 2

  action = { data: 0, type: types.NEXT_ROUND };
  state = collection(state, action);

  expect(state.currentRound).toBe(2);
  expect(state.itemIndex).toBe(2);
  
  action = { data: 0, type: types.NEXT_ITEM };
  state = collection(state, action);
  
  expect(state.itemIndex).toBe(0);

  action = { data: 1, type: types.NEXT_ITEM };
  state = collection(state, action);
  expect(state.itemIndex).toBe(1);

  // round 3

  action = { data: 0, type: types.NEXT_ROUND };
  state = collection(state, action);

  expect(state.currentRound).toBe(3);
  expect(state.itemIndex).toBe(4);

  // round 1, reset

  action = { data: 0, type: types.NEXT_ROUND };
  state = collection(state, action);

  expect(state.currentRound).toBe(1);
  expect(state.itemIndex).toBe(0);
});

test('collection should return itemIndex of 0 and currentRound of 1 when moving to the next level', () => {
  
  let action = { data: undefined, type: types.NEXT_LEVEL };
  let state = collection(herbCollection, action);

  expect(state.currentRound).toBe(1);
  expect(state.itemIndex).toBe(0);
});

test('collection should return unextended (initial) collection when user selected', () => {
  let action = { data: unextendedCollection, type: types.SELECT_COLLECTION };
  let state = collection({}, action);
  expect(state).toEqual(unextendedCollection);
});

test('collection should return next item', () => {
  let config = {
    language: 'en',
    moduleSize: 2,
    isPortraitMode: false,
    isLandscapeMode: true,
    collection: {
      id: 3,
      items: [
        {}
      ], itemIndex: 0
    },
    mode: 'learn'
  };
  let sparrow =  { 
      name: 'Passer domesticus', 
      names:[{
        vernacularName: 'Sparrow',
        language: 'en'
    }]
  };
  let starling = {
    name: 'Sturnus vulgaris',
    names: [{
        vernacularName: 'Starling',
        language: 'en'
      }]
  };
  let birds = [ sparrow, starling ];
  let action = { data: birds, type: types.SELECT_COLLECTION };
  let state = collection({}, action);
  action = { data: { collection : { items: birds, itemIndex: 0 }, config }, type: types.UPDATE_COLLECTION };
  state = collection(state, action);  
  // expect(state.nextItem.name).toEqual('Passer domesticus');
});

test('collection should set allItems during review and reset items to this value when review complete (learn-again mode)', () => {

  let config = {
    language: 'en',
    moduleSize: 2,
    isPortraitMode: false,
    isLandscapeMode: true,
    collection: {
      id: 3
    },
    mode: 'learn'
  };
  let sparrow =  { 
      name: 'Passer domesticus', 
      names:[{
        vernacularName: 'Sparrow',
        language: 'en'
    }]
  };
  let starling = {
    name: 'Sturnus vulgaris',
    names: [{
        vernacularName: 'Starling',
        language: 'en'
      }]
  };
  let birds = [ sparrow, starling ];
  let action = { data: birds, type: types.SELECT_COLLECTION };
  let state = collection({}, action);
  config.mode = 'learn';
  action = { data: { collection: { items: birds, itemIndex: 0 }, config }, type: types.UPDATE_COLLECTION };
  state = collection(state, action);
  birds = state.items;
  config.mode = 'review';
  const itemsToReview = R.take(2, state.items);
  action = { data: { config, collection: { items: itemsToReview, allItems: state.items }}, type: types.UPDATE_COLLECTION };
  state = collection(state, action);
  expect(state.items).toEqual(itemsToReview);
  expect(state.allItems).toEqual(birds);
  config.mode = 'learn-again';
  action = { data: { items: state.items, config }, type: types.UPDATE_COLLECTION };
  state = collection(state, action);
  expect(state.items).toEqual(birds);
});

// Tests based on birds collection, state taken from running the app

test('collection state after user clicks on "Begin lesson" on home collections page', () => {
  let state = R.clone(state1);
  state = collection(state, { type: types.NEXT_ITEM, data: 0 } );
  expect(state.itemIndex).toEqual(0);
  expect(state.nextItem.name).toEqual('Passer domesticus');
  expect(state.layoutCounter).toEqual(1);
  expect(state.isNextRound).toEqual(false);
  expect(state.isLevelComplete).toEqual(false);
  expect(state.isLessonComplete).toEqual(false);
});

test('collection state after user clicks on "Continue" on any screen', () => {
  let state = R.clone(state2);
  state = collection(state, { type: types.NEXT_ITEM, data: 1 } );
  expect(state.itemIndex).toEqual(1);
  expect(state.nextItem.name).toEqual('Sturnus vulgaris');
  expect(state.layoutCounter).toEqual(2);
  expect(state.isNextRound).toEqual(false);
  expect(state.isLevelComplete).toEqual(false);
  expect(state.isLessonComplete).toEqual(false);
});

test('collection state after user clicks on "Continue lesson" on summary page', () => {
  let state = R.clone(state3);
  state = collection(state, { type: types.NEXT_ITEM, data: 0 } );
  expect(state.itemIndex).toEqual(0);
  expect(state.nextItem.name).toEqual('Passer domesticus');
  expect(state.layoutCounter).toEqual(5);
  expect(state.isNextRound).toEqual(true);
  expect(state.isLevelComplete).toEqual(false);
  expect(state.isLessonComplete).toEqual(false);
});

test('collection state after user completes a lesson', () => {
  let state = R.clone(state4);
  state = collection(state, { type: types.NEXT_ITEM, data: 0 } );
  expect(state.itemIndex).toEqual(0);
  expect(state.nextItem.name).toEqual('Passer domesticus');
  expect(state.layoutCounter).toEqual(5);
  expect(state.isNextRound).toEqual(true);
  expect(state.isLevelComplete).toEqual(true);
  expect(state.isLessonComplete).toEqual(false);
});

// after page refresh

test('collection state after user clicks on "Continue lesson" on summary page after page refresh', () => {  
  let state = R.clone(state3Refresh);
  state = collection(state, { type: types.NEXT_ITEM, data: 0 } );
  expect(state.itemIndex).toEqual(0);
  expect(state.nextItem.name).toEqual('Passer domesticus');
  expect(state.layoutCounter).toEqual(2);
  expect(state.isNextRound).toEqual(true);
  expect(state.isLevelComplete).toEqual(false);
  expect(state.isLessonComplete).toEqual(false);
});

test('Level should move to the next when the previous one has completed', () => {
  let state = R.clone(snapdragon.collection);
  expect(state.currentRound).toBe(2);
  expect(state.lesson.level.id).toBe(1);
  const { updatedLessonPlan, updatedCollection } = lessonPlanner.createLessonPlan(snapdragon.lessonPlan, snapdragon.config, snapdragon.collection);
  state = collection(updatedCollection, { type: types.NEXT_LEVEL, data: 0 } );
  expect(state.currentRound).toBe(1);
  expect(state.lesson.level.id).toBe(2);
});