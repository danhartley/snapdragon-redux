import { types } from 'redux/actions/action-types';
import { collection } from 'redux/reducers/species-reducers';
import { initialState } from 'redux/reducers/initial-state-for-reducers';

test('collection should return default parameter state when there is no action type', () => {

  const action = { };  
  const state = collection(initialState.collection, action);

  expect(state).toEqual(initialState.collection);
});


test('collection should return correct itemIndex for action type NEXT_ITEM', () => {

  let action = { data: 0, type: types.NEXT_ITEM };
  let state = collection(initialState.collection, action);
  expect(state.itemIndex).toBe(0);

  action = { data: 1, type: types.NEXT_ITEM };
  state = collection(initialState.collection, action);
  expect(state.itemIndex).toBe(1);

  action = { data: 2, type: types.NEXT_ITEM };
  state = collection(initialState.collection, action);
  expect(state.itemIndex).toBe(0);

});

test('collection should return correct itemIndex and currentRound over several rounds', () => {

  // round 1

  let action = { data: 0, type: types.NEXT_ROUND };
  let state = collection(initialState.collection, action);

  expect(state.currentRound).toBe(1);
  expect(state.itemIndex).toBe(2);

  action = { data: 0, type: types.NEXT_ITEM };
  state = collection(state, action);
  expect(state.itemIndex).toBe(2);

  action = { data: 1, type: types.NEXT_ITEM };
  state = collection(state, action);
  expect(state.itemIndex).toBe(3);

  // round 2

  action = { data: 0, type: types.NEXT_ROUND };
  state = collection(state, action);

  expect(state.currentRound).toBe(2);
  expect(state.itemIndex).toBe(4);
});
