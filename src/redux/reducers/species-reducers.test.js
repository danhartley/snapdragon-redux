import { helpers } from 'redux/reducers/helpers-for-reducers';
import { score, item } from 'redux/reducers/species-reducers';
import { types } from 'redux/actions/action-types';

it('score state should reflect correct answer', () => {

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
    type: types.MARK_ANSWER,
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

it('score state should reflect incorrect answer', () => {

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
    type: types.MARK_ANSWER,
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

it('score state should return the next item', () => {

  const stateBefore = { };

  const stateAfter =  { id: 1 };

  const action = {
    type: types.NEXT_ITEM,
    data: { id: 1 }
  };

  Object.freeze(stateBefore);
  Object.freeze(action);

  expect(item(stateBefore, action).id).toEqual(stateAfter.id);
});

it('multipleNames returns given number of choices', () => {
  expect(helpers.generateMultipleChoices([1,2,3,4,5,6],6).length).toBe(6);
});

it('multipleNames returns a collection of arrays', () => {
  const items = [{id:1},{id:2},{id:3},{id:4}];
  const answersCollection = helpers.generateMultipleChoices(items, 4);
  expect(answersCollection.map(answer => answer.items.length)).toEqual([4,4,4,4]);
});


