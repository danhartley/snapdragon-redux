import './snapdragon.css';

import { utils } from 'utils/utils';
import { store } from 'redux/store';
import { observeStore } from 'redux/observeStore';

import { renderNextLayout } from 'ui/events/next-layout-event';
import { renderNextItem } from 'ui/events/next-item-event';

import { renderSpeciesCardRight } from 'ui/screens/right/species-card-right';

import { renderScore } from 'ui/progress/score';
// import { renderSpeciesSummary } from 'ui/progress/species-summary';
// import { renderHistory } from 'ui/progress/history';

// events

observeStore(store, store => store.index, renderNextLayout);
observeStore(store, store => store.index, renderNextItem);

// first screen

observeStore(store, store => store.index, renderSpeciesCardRight);

// progress

observeStore(store, store => store.score, renderScore);
// observeStore(store, store => store.index, renderSpeciesSummary);
// observeStore(store, store => store.history, renderHistory);
