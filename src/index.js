import { createStore } from 'redux';
import * as R from 'ramda';

import './snapdragon.css';

import { utils } from 'utils/utils';
import { store } from 'redux/store';
import { observeStore } from 'redux/observeStore';

import { renderNextLayout } from 'ui/screens/next-layout-ctrl';
import { renderNextItem } from 'ui/screens/next-item-ctrl';
import { renderSpeciesCard } from 'ui/screens/species-card-ctrl';

import { renderScore } from 'ui/screens/score-ctrl';
import { renderProgress } from 'ui/screens/progress-ctrl';

observeStore(store, store => store.index, renderNextLayout);
observeStore(store, store => store.index, renderNextItem);

observeStore(store, store => store.index, renderSpeciesCard);

observeStore(store, store => store.score, renderScore);

observeStore(store, store => store.index, renderProgress);
