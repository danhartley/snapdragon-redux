import { createStore } from 'redux';
import * as R from 'ramda';

import './snapdragon.css';

import { utils } from 'utils/utils';
import { store } from 'redux/store';
import { observeStore } from 'redux/observeStore';

import { renderNextLayout } from 'ui/screens/next-layout-ctrl';
import { renderNextItem } from 'ui/screens/next-item-ctrl';
import { renderSpeciesCard } from 'ui/screens/species-card-ctrl';

import { renderSpecimen } from './ui/screens/specimen-ctrl';
import { renderSpecies } from 'ui/screens/species-cards-ctrl';
import { renderTextEntry } from 'ui/screens/text-entry-ctrl';
import { renderTile } from 'ui/screens/species-tiles-ctrl';

import { renderScore } from 'ui/screens/score-ctrl';
import { renderProgress } from 'ui/screens/progress-ctrl';

observeStore(store, store => store.index, renderNextLayout);
observeStore(store, store => store.index, renderNextItem);

observeStore(store, store => store.index, renderSpeciesCard);

// observeStore(store, store => store.item, renderSpecimen);
// observeStore(store, store => store.card, renderSpecies);
// observeStore(store, store => store.card, renderTextEntry);
// observeStore(store, store => store.card, renderTile);

observeStore(store, store => store.score, renderScore);

observeStore(store, store => store.index, renderProgress);
