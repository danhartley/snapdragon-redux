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
import { renderSpeciesCollection } from 'ui/screens/common/species';
import { renderNavigation } from 'ui/screens/common/navigation';

import { lessonPlans } from 'snapdragon/lesson-plans';

// use case test

const renderWelcome = () => {
    // console.log('Welcome back, Dan!');
};

const returningUser = localStorage.getItem('returningUser') ? new Boolean(localStorage.getItem('returningUser')) : false;
returningUser ? renderWelcome() : localStorage.setItem('returningUser', true);

import { actions } from 'redux/actions/action-creators';

setTimeout(()=>{

    const { config: currentConfig } = store.getState();

    const config = { ...currentConfig };

    config.isPortraitMode = window.matchMedia("(max-width: 480px)").matches;

    if(!config.lesson) {
        config.lesson = config.isPortraitMode ? lessonPlans[2] : lessonPlans[0];
        config.lesson.level = config.lesson.levels[0];
        const levels = lessonPlans.filter(plan => plan.name === config.lesson.name)[0].levels;
        config.lesson.levels = levels;
    }

    actions.boundUpdateConfig(config);

    renderHeaders();
    renderNavigation();

    observeStore(store, store => store.config, nextLesson, 'config', 'next-lesson');
    observeStore(store, store => store.index, nextLayout, 'index', 'next-layout');
    observeStore(store, store => store.layout, nextItem, 'layout', 'next-item');
    observeStore(store, store => store.layout, renderHeaders, 'layout', 'render-headers');
    observeStore(store, store => store.score, renderScore, 'score', 'score');
    
    // should be removeable
    observeStore(store, store => store.collection, renderSpeciesCollection, 'collection', 'species-collection');
});