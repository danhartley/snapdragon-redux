import { types } from 'redux/actions/action-types';
import { helpers } from 'redux/reducers/helpers-for-reducers';
import { item } from 'redux/reducers/species-reducers';

test('multipleNames returns given number of choices', () => {
  expect(helpers.generateMultipleChoices([1,2,3,4,5,6],6).length).toBe(6);
});

test('multipleNames returns a collection of arrays', () => {
  const items = [{id:1},{id:2},{id:3},{id:4}];
  const answersCollection = helpers.generateMultipleChoices(items, 4);
  expect(answersCollection.map(answer => answer.items.length)).toEqual([4,4,4,4]);
});


