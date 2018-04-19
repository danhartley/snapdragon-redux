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
  