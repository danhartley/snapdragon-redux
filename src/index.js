import { createStore } from 'redux';
import * as R from 'ramda';

import { utils } from 'utils/utils';
import './snapdragon.css';
import { renderNext } from 'ui/screens/next-screen-ctrl';
import { renderScore } from 'ui/screens/score-ctrl';
import { renderProgress } from 'ui/screens/progress-ctrl';

import { store } from 'redux/store';

// actions.boundNewScreen({ item: utils.nextItem(items, 0) });

import { observeStore } from 'redux/observeStore';

const selectScore = store => store.score;
observeStore(store, selectScore, renderScore);