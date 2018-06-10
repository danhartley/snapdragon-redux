import "babel-polyfill";

import {$,jQuery} from 'jquery';
import PopperJs from 'popper.js';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import './snapdragon.css';
import './snapdragon-media.css';
import './snapdragon-media1024.css';
import './snapdragon-media1200.css';

import { store } from 'redux/store';
import { observeStore } from 'redux/observe-store';

import { nextLesson } from 'ui/setup/next-lesson';
import { nextLayout } from 'ui/setup/next-layout';
import { nextItem } from 'ui/setup/next-item';

import { renderHeaders } from 'ui/screens/common/headers';
import { renderScore } from 'ui/progress/score';
// import { listening } from 'ui/screens/common/listener';

import { lessonPlans } from 'snapdragon/lesson-plans';
import { config } from 'syllabus/lesson-config';

import { renderMenu } from 'ui/screens/common/menu';
import { DOM } from 'ui/dom';

// capture device

config.isPortraitMode = window.matchMedia("(max-width: 480px)").matches;
config.lesson = config.isPortraitMode ? lessonPlans[2] : lessonPlans[0];
config.lesson.level = config.lesson.levels[0];

// setup

observeStore(store, store => store.config, nextLesson, 'config', 'next-lesson');
observeStore(store, store => store.index, nextLayout, 'index', 'next-layout');
observeStore(store, store => store.layout, nextItem, 'layout', 'next-item');

// headers

observeStore(store, store => store.layout, renderHeaders, 'layout', 'render-headers');

// progress

observeStore(store, store => store.score, renderScore, 'score');

// home page

import { renderSnapdragon } from 'ui/screens/right/snapdragon';
import { renderCollections } from 'ui/screens/left/collections';

renderCollections();
renderSnapdragon();

// global listener

// observeStore(store, store => store.score, listening, 'score');

// menu

DOM.menuIcon.addEventListener('click', () => {
    renderMenu();
});