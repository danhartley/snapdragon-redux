import { types } from 'redux/actions/action-types';
import { score, history } from 'redux/reducers/progress-reducers';

test('score state should reflect correct answer', () => {

    const stateBefore = {
      total: 10,
      correct: 9,
      taxon: 'name',
      binomial: 'Anagallis arvensis',
      answer: '',
      success: false,
      wrong: 0,
      question: 'Anagallis arvensis',
      fails: [],
      passes: []
    }
  
    const stateAfter = {
      total: 11,
      correct: 10,
      taxon: 'name',
      binomial: 'Anagallis arvensis',
      question: 'Anagallis arvensis',
      answer: 'Anagallis arvensis',
      success: true,
      wrong: 0,
      fails: [],
      passes: [{ taxon: 'name', binomial: 'Anagallis arvensis', question: 'Anagallis arvensis', answer: 'Anagallis arvensis'}]
    }
  
    const action = {
      type: types.UPDATE_SCORE,
      data: {
        taxon: 'name',
        binomial: 'Anagallis arvensis',
        question: 'Anagallis arvensis',
        answer: 'Anagallis arvensis',
        success: true
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
      wrong: 0,
      question: '',
      fails: [],
      passes: []
    }
  
    const stateAfter = {
      total: 11,
      correct: 9,
      taxon: 'name',
      binomial: 'Anagallis arvensis',
      question: 'Anagallis arvensis',
      answer: 'Malva sylvestris',
      success: false,
      wrong: 1,
      fails: [{ taxon: 'name', binomial: 'Anagallis arvensis', question: 'Anagallis arvensis', answer: 'Malva sylvestris'}],
      passes: []
    }
  
    Object.freeze(stateBefore);
    Object.freeze(action);
  
    const action = {
      type: types.UPDATE_SCORE,
      data: {
        taxon: 'name',
        binomial: 'Anagallis arvensis',
        question: 'Anagallis arvensis',
        answer: 'Malva sylvestris',
        success: false
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
    const score1 = { total: 6, correct: 6, wrong: 0, fails:[], passes:[1,2,3,4,5,6], question: 'question1'};
    const action1 = {
      type: types.UPDATE_HISTORY,
      data: score1
    };
    Object.freeze(state1);
    Object.freeze(action1);
    const state2 = history(state1, action1);
    expect(state2.total).toEqual(6);
    expect(state2.correct).toEqual(6);
    
    const score2 = { total: 6, correct: 0, wrong: 6, fails:[1,2,3,4,5,6], passes:[], question: 'question2'};
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
    
    const score3 = { total: 6, correct: 0, wrong: 6, fails:[1,2,3,4,5,6], passes:[], question: 'question2'};
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