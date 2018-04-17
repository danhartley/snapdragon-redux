import { types } from 'redux/actions/action-types';
import { helpers } from 'redux/reducers/helpers-for-reducers';
import { item } from 'redux/reducers/species-reducers';

test.skip('should return at least one lesson module with two items', () => {
  const collection = [ {id: 1}, {id: 2}, {id: 3}, {id: 4} ];
  const moduleSize = 2;
  const lessonItems = helpers.createLessonModule(collection, moduleSize);
  expect(lessonItems.length).toBe(2);
});


