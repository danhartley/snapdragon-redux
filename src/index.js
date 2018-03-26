import { createStore } from 'redux';
import * as R from 'ramda';

import { utils } from 'utils/utils';
import './snapdragon.css';
import { renderNext } from 'ui/screens/next-screen-ctrl';
import { renderScore } from 'ui/screens/score-ctrl';
import { renderProgress } from 'ui/screens/progress-ctrl';
import { renderSpecies } from 'ui/screens/species-ctrl';
import { renderTextEntry } from 'ui/screens/text-entry-ctrl';

import { store } from 'redux/store';

import { observeStore } from 'redux/observeStore';
import { renderSpecimen } from './ui/screens/specimen-ctrl';

observeStore(store, store => store.score, renderScore);
observeStore(store, store => store.score, renderNext);

observeStore(store, store => store.item, renderSpecies);
observeStore(store, store => store.item, renderTextEntry);
observeStore(store, store => store.item, renderSpecimen);
observeStore(store, store => store.item, renderProgress);
