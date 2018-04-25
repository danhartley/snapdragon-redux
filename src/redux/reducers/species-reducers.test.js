import { types } from 'redux/actions/action-types';
import { collection } from 'redux/reducers/species-reducers';
import { initialState } from 'redux/reducers/initial-state-for-reducers';


const herbs = {
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
  "rounds": 3
}

test('collection should return default parameter state when there is no action type', () => {

  const action = { };  
  const state = collection(initialState.collection, action);

  expect(state).toEqual(initialState.collection);
  expect(state.items.length).toEqual(initialState.collection.items.length);
});


test('collection should return correct itemIndex for action type NEXT_ITEM', () => {

  let action = { data: 0, type: types.NEXT_ITEM };
  let state = collection(herbs, action);
  expect(state.itemIndex).toBe(0);

  action = { data: 1, type: types.NEXT_ITEM };
  state = collection(state, action);
  expect(state.itemIndex).toBe(1);

  action = { data: 2, type: types.NEXT_ITEM };
  state = collection(state, action);
  expect(state.itemIndex).toBe(0);

});

test('collection should return correct itemIndex and currentRound over several rounds', () => {

  // round 1

  let action = { data: 0, type: types.NEXT_ITEM };
  let state = collection(herbs, action);

  expect(state.currentRound).toBe(1);
  expect(state.itemIndex).toBe(0);

  // round 2

  action = { data: 0, type: types.NEXT_ROUND };
  state = collection(state, action);

  expect(state.currentRound).toBe(2);
  expect(state.itemIndex).toBe(2);
  
  action = { data: 0, type: types.NEXT_ITEM };
  state = collection(state, action);
  
  expect(state.itemIndex).toBe(2);

  action = { data: 1, type: types.NEXT_ITEM };
  state = collection(state, action);
  expect(state.itemIndex).toBe(3);

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
  let state = collection(herbs, action);

  expect(state.currentRound).toBe(1);
  expect(state.itemIndex).toBe(0);
});