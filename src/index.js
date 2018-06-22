import "babel-polyfill";

import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import './snapdragon.css';
import './snapdragon-media.css';
import './snapdragon-media768.css';
import './snapdragon-media1200.css';

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

    const { config: currentConfig } = store.getState();

    const config = { ...currentConfig };

    config.isPortraitMode = window.matchMedia("(max-width: 480px)").matches;

    if(!config.lesson) {
        config.lesson = config.isPortraitMode ? lessonPlans[2] : lessonPlans[0];
        config.lesson.level = config.lesson.levels[0];
        const levels = lessonPlans.filter(plan => plan.name === config.lesson.name)[0].levels;
        config.lesson.levels = levels;
        config.lessonName = config.lesson.name;
        config.levelName = config.lesson.level.name;
    }

    renderHeaders();
    renderNavigation();

    actions.boundUpdateConfig(config);
    actions.boundToggleLesson({ lesson: 'inactive' });

    subscription.add(renderCollections, 'counter', 'flow');
    subscription.add(renderSnapdragon, 'counter', 'flow');
    subscription.add(nextLesson, 'config', 'flow');
    subscription.add(nextLayout, 'counter', 'flow');
    subscription.add(nextItem, 'layout', 'flow');
    subscription.add(renderScore, 'score', 'flow');
    subscription.add(renderHeaders, 'layout', 'flow');

});