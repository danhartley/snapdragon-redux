import './snapdragon.css';

import { store } from 'redux/store';
import { observeStore } from 'redux/observe-store';

import { renderNextLayout } from 'ui/events/next-layout-event';
import { renderNextItem } from 'ui/events/next-item-event';

import { renderScore } from 'ui/progress/score';

// events

observeStore(store, store => store.index, renderNextLayout, 'render-next-layout');
observeStore(store, store => store.layout, renderNextItem, 'render-next-item');

// progress

observeStore(store, store => store.score, renderScore, 'score');

