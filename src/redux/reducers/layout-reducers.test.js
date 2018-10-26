import * as R from 'ramda';

import { types } from 'redux/actions/action-types';
import { lessonPlan } from 'redux/reducers/layout-reducers';
import { snapdragon } from 'test/redux-test-snapdragon/state-1';
import { lessonPlanner } from 'syllabus/lesson-planner';

test('Level should move to the next when the previous one has completed', () => {
    let state = R.clone(snapdragon.lessonPlan);
    expect(state.levelName).toBe('Level 1');
    const { updatedLessonPlan, updatedCollection } = lessonPlanner.createLessonPlan(snapdragon.lessonPlan, snapdragon.config, snapdragon.collection);
    state = lessonPlan(updatedLessonPlan, { type: types.NEXT_LEVEL, data: 0 } );
    expect(state.levelName).toEqual('Level 2');
  });
