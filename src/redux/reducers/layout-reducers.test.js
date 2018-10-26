import * as R from 'ramda';

import { types } from 'redux/actions/action-types';
import { lessonPlan } from 'redux/reducers/layout-reducers';
import { state1 } from 'test/redux-test-lessonPlan/state-1';
import { snapdragon } from 'test/redux-test-snapdragon/state-1';

test('', () => {
    let state = R.clone(state1);
    state = lessonPlan(state, { type: types.NEXT_LESSON, data: { lessonPlan: null } } );
});

test.skip('next level', () => {
    let state = R.clone(snapdragon.lessonPlan);
    expect(state.levelName).toBe('Level 1');
    state = lessonPlan(state, { type: types.NEXT_LEVEL, data: 0 } );
    expect(state.levelName).toEqual('Level 2');
  });
