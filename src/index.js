import "babel-polyfill";

import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import 'ui/css/snapdragon-colours.css';
import 'ui/css/snapdragon.css';
import 'ui/css/snapdragon-media.css';
import 'ui/css/groups/test-card.css';
import 'ui/css/groups/species-card.css';
import 'ui/css/groups/modal.css';
import 'ui/css/groups/media-heights.css';

import { store } from 'redux/store';
import { nextLesson } from 'ui/setup/next-lesson';
import { nextLayout } from 'ui/setup/next-layout';
import { nextItem } from 'ui/setup/next-item';
import { renderHeaders } from 'ui/fixtures/headers';
import { renderScore } from 'ui/fixtures/score';
import { renderHome } from 'ui/screens/home/home';
import { renderNavigation } from 'ui/fixtures/navigation';
import { subscription } from 'redux/subscriptions';
import { actions } from 'redux/actions/action-creators';
import { renderSpeciesGrid } from 'ui/screens/home/species-grid';
import { updateLanguage } from 'api/traits/trait-types';
import { initialiseConfig } from 'ui/helpers/location-helper';

setTimeout( () => {

    let lessonPlan;

    try {
        
        const { config, counter: currentCounter, lessonPlan: statePlans } = store.getState();

        lessonPlan = statePlans;

        config.isPortraitMode = window.matchMedia("(max-width: 767px)").matches;
        config.isLandscapeMode = !config.isPortraitMode;

        const counter = currentCounter ? { ...currentCounter } : { index: null };

        actions.boundUpdateConfig(config);
        actions.boundToggleLesson(counter);

        subscription.add(renderHeaders, 'page', 'flow');
        subscription.add(renderNavigation, 'page', 'flow');
        subscription.add(renderHome, 'counter', 'flow');
        // subscription.add(renderSpeciesGrid, 'counter', 'flow');
        subscription.add(nextLesson, 'counter', 'flow');
        subscription.add(nextLayout, 'counter', 'flow');
        subscription.add(nextItem, 'layout', 'flow');
        subscription.add(renderScore, 'score', 'flow');
        // subscription.add(updateLanguage, 'config', 'localisation');

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

    async function getHelloWorld() {
        const url = `https://us-central1-snapdragon-api.cloudfunctions.net/function-1`;
        const result = await fetch(url);
        // console.log(result);    
    }

    // getHelloWorld();

    // '### FIREBASE API KEY ###'
    // const apiKey = 'AIzaSyBVLz0wVrYZ9JhJMobCFgSB-Edh6EnP0Yk';

    // '### FIREBASE AUTH DOMAIN ###'
    // const authDomain = 'https://snapdragon-222014.web.app/';

    // '### CLOUD FIRESTORE PROJECT ID ###'
    // const projectId = 'snapdragon-222014';

    // Initialize Cloud Firestore through Firebase
    // firebase.initializeApp({
    //     apiKey,
    //     authDomain,
    //     projectId
    // });
    
    // var db = firebase.firestore();
});