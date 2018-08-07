import "babel-polyfill";

import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import 'ui/css/snapdragon-colours.css';
import 'ui/css/snapdragon.css';
import 'ui/css/snapdragon-media.css';
import 'ui/css/snapdragon-media768.css';
import 'ui/css/snapdragon-media1200.css';

import { store } from 'redux/store';

import { nextLesson } from 'ui/setup/next-lesson';
import { nextLayout } from 'ui/setup/next-layout';
import { nextItem } from 'ui/setup/next-item';

import { renderHeaders } from 'ui/fixtures/headers';
import { renderScore } from 'ui/fixtures/score';
import { renderCollections } from 'ui/screens/home/collections';
import { renderHome } from 'ui/screens/home/home';
import { renderNavigation } from 'ui/fixtures/navigation';

import { lessonPlans } from 'snapdragon/lesson-plans';
import { subscription } from 'redux/subscriptions';
import { actions } from 'redux/actions/action-creators';
import { renderSnapdragon } from "./ui/screens/cards/snapdragon";

// import { kitchenGarden } from 'snapdragon/species-lessons';

// console.log(kitchenGarden);

setTimeout(()=>{

    const { config: currentConfig, counter: currentCounter } = store.getState();

    const config = { ...currentConfig };
    
    config.isPortraitMode = window.matchMedia("(max-width: 480px)").matches;

    if(!config.lesson) {
        config.lesson = config.isPortraitMode ? lessonPlans[2] : lessonPlans[0];
        config.lesson.level = config.lesson.levels[0];
        const levels = lessonPlans.filter(plan => plan.name === config.lesson.name)[0].levels;
        config.lesson.levels = levels;
    }

    const counter = currentCounter ? { ...currentCounter } : { index: null, lesson: 'inactive' };

    actions.boundUpdateConfig(config);
    actions.boundToggleLesson(counter);

    subscription.add(renderNavigation, 'config', 'flow');
    subscription.add(renderCollections, 'counter', 'flow');
    // subscription.add(renderHome, 'counter', 'flow');
    subscription.add(renderSnapdragon, 'counter', 'flow');
    subscription.add(nextLesson, 'config', 'flow');
    subscription.add(nextLayout, 'counter', 'flow');
    subscription.add(nextItem, 'layout', 'flow');
    subscription.add(renderScore, 'score', 'flow');
    subscription.add(renderHeaders, 'counter', 'flow');

});