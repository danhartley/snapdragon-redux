import './snapdragon.css';
import './snapdragon-media1024.css';
import './snapdragon-media1200.css';

import { store } from 'redux/store';
import { observeStore } from 'redux/observe-store';

import { renderNextLayout } from 'ui/events/next-layout-event';
import { renderNextItem } from 'ui/events/next-item-event';
import { prepareLesson } from 'ui/events/next-lesson-event.js';

import { renderScore } from 'ui/progress/score';

// events

observeStore(store, store => store.lesson, prepareLesson, 'prepare-next-lesson');
observeStore(store, store => store.index, renderNextLayout, 'render-next-layout');
observeStore(store, store => store.layout, renderNextItem, 'render-next-item');

// progress

observeStore(store, store => store.score, renderScore, 'score');

