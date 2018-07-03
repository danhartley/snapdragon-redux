import "babel-polyfill";

import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import './css/snapdragon-colours.css';
import './css/snapdragon.css';
import './css/snapdragon-media.css';
import './css/snapdragon-media768.css';
import './css/snapdragon-media1200.css';

import { store } from 'redux/store';

import { nextLesson } from 'ui/setup/next-lesson';
import { nextLayout } from 'ui/setup/next-layout';
import { nextItem } from 'ui/setup/next-item';

import { renderHeaders } from 'ui/screens/common/headers';
import { renderScore } from 'ui/progress/score';
import { renderCollections } from 'ui/screens/right/collections';
import { renderNavigation } from 'ui/screens/common/navigation';

import { lessonPlans } from 'snapdragon/lesson-plans';
import { subscription } from 'redux/subscriptions';
import { actions } from 'redux/actions/action-creators';
import { renderSnapdragon } from "./ui/screens/left/snapdragon";

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

    renderNavigation();

    actions.boundUpdateConfig(config);
    actions.boundToggleLesson(counter);

    subscription.add(renderCollections, 'counter', 'flow');
    subscription.add(renderSnapdragon, 'counter', 'flow');
    subscription.add(nextLesson, 'config', 'flow');
    subscription.add(nextLayout, 'counter', 'flow');
    subscription.add(nextItem, 'layout', 'flow');
    subscription.add(renderScore, 'score', 'flow');
    subscription.add(renderHeaders, 'counter', 'flow');

});