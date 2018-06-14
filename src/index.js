import "babel-polyfill";

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

import { lessonPlans } from 'snapdragon/lesson-plans';
import { config } from 'syllabus/lesson-config';

import { renderMenu } from 'ui/screens/common/menu';
import { DOM } from 'ui/dom';

// use case test

const renderWelcome = () => {
    console.log('welcome!');
};

const returningUser = localStorage.getItem('returningUser') ? new Boolean(localStorage.getItem('returningUser')) : false;
returningUser ? renderWelcome() : localStorage.setItem('returningUser', true);

// capture device and config defaults

config.isPortraitMode = window.matchMedia("(max-width: 480px)").matches;
config.lesson = config.isPortraitMode ? lessonPlans[2] : lessonPlans[0];
config.lesson.level = config.lesson.levels[0];
const levels = lessonPlans.filter(plan => plan.name === config.lesson.name)[0].levels;
config.lesson.levels = levels;

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
renderHeaders();

// global listener

// observeStore(store, store => store.score, listening, 'score');

// menu

DOM.menuIcon.addEventListener('click', () => {
    renderMenu();
});