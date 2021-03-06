import { types } from 'redux/actions/action-types';
import { score, history } from 'redux/reducers/progress-reducers';
import { progressState } from 'redux/reducers/initial-state/initial-progress-state';

const newCollectionScoreState = ({
  type = types.SELECT_COLLECTION,
  data = progressState.resetScore(),
} = {}) => ({
  type, data
});

test('score state should reflect correct answer', () => {

  const stateBefore = {
    total: 10,
    correct: 9,
    taxon: 'name',
    binomial: 'Anagallis arvensis',
    answer: '',
    success: false,
    incorrect: 0,
    question: 'Anagallis arvensis',
    fails: [],
    passes: [],
    answers: [],
    statement: '', 
  }

  const stateAfter = {"answer": "Anagallis arvensis", "answers": [], "binomial": "Anagallis arvensis", "correct": 10, "fails": [], "failsTotals": {"1": 0}, "incorrect": 0, "itemId": 1, "passes": [{"answer": "Anagallis arvensis", "answers": [], "binomial": "Anagallis arvensis", "index": 10, "itemId": 1, "question": "Anagallis arvensis", "statement": "", "taxon": "name","success": true}], "passesTotals": {"1": 1}, "question": "Anagallis arvensis", "questionTotal": 1, "statement": "", "success": true, "taxon": "name", "total": 11, "totalFailPoints": 0, "totalPassPoints": 0, "totalPoints": 0, success: true};

  const action = {
    type: types.UPDATE_SCORE,
    data: {
      taxon: 'name',
      binomial: 'Anagallis arvensis',
      question: 'Anagallis arvensis',
      answer: 'Anagallis arvensis',
      success: true,
      itemId: 1
    }
  }

  Object.freeze(stateBefore);
  Object.freeze(action);

  expect(score(stateBefore, action)).toEqual(stateAfter);
});
  
test('score state should reflect incorrect answer', () => {

  const stateBefore = {
    total: 10,
    correct: 9,
    taxon: 'name',
    binomial: 'Anagallis arvensis',
    answer: '',
    success: false,
    incorrect: 0,
    question: '',
    fails: [],
    passes: [],
    statement: "",
    answers: []
  }

  const stateAfter = {"answer": "Malva sylvestris", "answers": [], "binomial": "Anagallis arvensis", "correct": 9, "fails": [{"answer": "Malva sylvestris", "answers": [], "binomial": "Anagallis arvensis", "index": 10, "itemId": 1, "question": "Anagallis arvensis", "statement": "", "taxon": "name", "success": false}], "failsTotals": {"1": 1}, "incorrect": 1, "itemId": 1, "passes": [], "passesTotals": {"1": 0}, "question": "Anagallis arvensis", "questionTotal": 1, "statement": "", "success": false, "taxon": "name", "total": 11, "totalFailPoints": 0, "totalPassPoints": 0, "totalPoints": 0};
  

  Object.freeze(stateBefore);
  Object.freeze(action);

  const action = {
    type: types.UPDATE_SCORE,
    data: {
      taxon: 'name',
      binomial: 'Anagallis arvensis',
      question: 'Anagallis arvensis',
      answer: 'Malva sylvestris',
      "questionTotal": 1,
      success: false,        
      itemId: 1        
    }
  }

  expect(score(stateBefore, action)).toEqual(stateAfter);
});

test('score state should return the next item', () => {

  const stateBefore = { };

  const stateAfter =  { id: 1 };

  const action = {
    type: types.NEXT_ITEM,
    data: { id: 1 }
  };

  Object.freeze(stateBefore);
  Object.freeze(action);

  //expect(item(stateBefore, action).id).toEqual(stateAfter.id);
});

test('history should reflect total scores to date', () => {
  const state1 = null;
  const score1 = { total: 6, correct: 6, incorrect: 0, fails:[], passes:[1,2,3,4,5,6], question: 'question1'};
  const action1 = {
    type: types.UPDATE_HISTORY,
    data: score1
  };
  Object.freeze(state1);
  Object.freeze(action1);
  const state2 = history(state1, action1);
  expect(state2.total).toEqual(6);
  expect(state2.correct).toEqual(6);
  
  const score2 = { total: 6, correct: 0, incorrect: 6, fails:[1,2,3,4,5,6], passes:[], question: 'question2'};
  const action2 = {
    type: types.UPDATE_HISTORY,
    data: score2
  };
  Object.freeze(action2);
  Object.freeze(state2);
  const state3 = history(state2, action2);
  expect(state3.total).toEqual(12);
  expect(state3.correct).toEqual(6);
  expect(state3.scores.length).toEqual(2);

  // after user returns to page, or page refresh, etc. and state rehydrated from localStorage
  
  const score3 = { total: 6, correct: 0, incorrect: 6, fails:[1,2,3,4,5,6], passes:[], question: 'question2'};
  const action3 = {
    type: types.UPDATE_HISTORY,
    data: score3
  };
  Object.freeze(action3);
  Object.freeze(state3);
  const state4 = history(state3, action3);
  expect(state4.total).toEqual(12);
  expect(state4.correct).toEqual(6);
  expect(state4.scores.length).toEqual(2);
});

test('test resetScore for new collection', () => {

  const defaultState = progressState.resetScore();
  const newScore = progressState.resetScore();
  const action = newCollectionScoreState();
  const state = score(defaultState, { action: { type: '' }} );

  expect(score(state, action)).toEqual(newScore);
});

