import "babel-polyfill";

import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import 'ui/css/snapdragon-colours.css';
import 'ui/css/snapdragon.css';
import 'ui/css/groups/test-card.css';
import 'ui/css/groups/species-card.css';
import 'ui/css/groups/modal.css';
import 'ui/css/snapdragon-media.css';

import { store } from 'redux/store';
import { nextLesson } from 'ui/setup/next-lesson';
import { nextLayout } from 'ui/setup/next-layout';
import { nextItem } from 'ui/setup/next-item';
import { renderHeaders } from 'ui/fixtures/headers';
import { renderScore } from 'ui/fixtures/score';
import { renderHome } from 'ui/screens/home/home';
import { renderLessons } from 'ui/screens/lists/lesson-list';
import { renderNavigation } from 'ui/fixtures/navigation';
import { subscription } from 'redux/subscriptions';
import { actions } from 'redux/actions/action-creators';
import { updateLanguage } from 'api/traits/trait-types';
import { initialiseConfig } from 'ui/helpers/location-helper';

setTimeout( () => {

    let lessonPlan;

    try {

        // console.log('index.js')
        
        const { config, counter: currentCounter, lessonPlan: statePlans } = store.getState();

        lessonPlan = statePlans;

        config.isPortraitMode = window.matchMedia("(max-width: 767px)").matches;
        config.isLandscapeMode = !config.isPortraitMode;

        const counter = currentCounter ? { ...currentCounter } : { index: null, isLessonPaused: false };

        actions.boundUpdateConfig(config);
        actions.boundStopStartLesson(counter);

        subscription.add(renderHeaders, 'collection', 'flow');
        renderNavigation();
        // subscription.add(renderNavigation, 'collection', 'flow');

        subscription.add(renderHome, 'counter', 'flow'); // avoid adding as listener on page refresh
                
        subscription.add(nextLesson, 'counter', 'flow');
        subscription.add(nextLayout, 'counter', 'flow');
        subscription.add(nextItem, 'layout', 'flow');
        subscription.add(renderScore, 'score', 'flow');
        subscription.add(updateLanguage, 'config', 'localisation');

        const updateConfig = async () => {
            const initialisedConfig = await initialiseConfig(config);
            actions.boundUpdateConfig(initialisedConfig);
        };

        if(!config.guide.locationType) {
            updateConfig();
        }
    }
    catch(e) {
        console.log(e)
        // persistor.purge();
        // window.location.reload(true);        
    }
});