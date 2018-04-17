import './snapdragon.css';
import './snapdragon-media1024.css';
import './snapdragon-media1200.css';

import { store } from 'redux/store';
import { observeStore } from 'redux/observe-store';

import { nextLayout } from 'ui/setup/next-layout';
import { nextItem } from 'ui/setup/next-item';
import { nextLesson } from 'ui/setup/next-lesson';

import { renderScore } from 'ui/progress/score';

// setup

observeStore(store, store => store.lesson, nextLesson, 'next-lesson');
observeStore(store, store => store.index, nextLayout, 'next-layout');
observeStore(store, store => store.layout, nextItem, 'next-item');

// progress

observeStore(store, store => store.score, renderScore, 'score');

