import { createStore } from 'redux';
import * as R from 'ramda';

import { utils } from 'utils/utils';
import './snapdragon.css';
import { renderNextItem } from 'ui/screens/next-item-ctrl';
import { renderScore } from 'ui/screens/score-ctrl';
import { renderProgress } from 'ui/screens/progress-ctrl';

import { renderSpecimen } from './ui/screens/specimen-ctrl';
import { renderSpecies } from 'ui/screens/species-ctrl';
import { renderTextEntry } from 'ui/screens/text-entry-ctrl';

import { store } from 'redux/store';

import { observeStore } from 'redux/observeStore';
import { renderNextLayout } from 'ui/screens/next-layout-ctrl';

observeStore(store, store => store.index, renderNextLayout);
observeStore(store, store => store.index, renderNextItem);

observeStore(store, store => store.item, renderSpecimen);
observeStore(store, store => store.item, renderSpecies);
observeStore(store, store => store.item, renderTextEntry);

observeStore(store, store => store.score, renderScore);

observeStore(store, store => store.index, renderProgress);
