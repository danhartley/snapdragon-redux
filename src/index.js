
import {$,jQuery} from 'jquery';
import PopperJs from 'popper.js';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import './snapdragon.css';
import './snapdragon-media1024.css';
import './snapdragon-media1200.css';

import { store } from 'redux/store';
import { observeStore } from 'redux/observe-store';

import { nextLesson } from 'ui/setup/next-lesson';
import { nextLayout } from 'ui/setup/next-layout';
import { nextItem } from 'ui/setup/next-item';

import { renderScore } from 'ui/progress/score';
import { listening } from 'ui/screens/common/listener';

// setup

observeStore(store, store => store.config, nextLesson, 'config', 'next-lesson');
observeStore(store, store => store.index, nextLayout, 'index', 'next-layout');
observeStore(store, store => store.layout, nextItem, 'layout', 'next-item');

// progress

store.subscribe(()=>{
    console.log('index: ', store.getState().index);
});
observeStore(store, store => store.score, renderScore, 'score');

// home page

import { renderSnapdragon } from 'ui/screens/right/snapdragon';
import { renderCollections } from 'ui/screens/left/collections';

renderCollections();
renderSnapdragon();

// global listener

listening();

