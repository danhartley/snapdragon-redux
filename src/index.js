import "babel-polyfill";

import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import 'ui/css/snapdragon-colours.css';
import 'ui/css/snapdragon.css';
import 'ui/css/snapdragon-media.css';
import 'ui/css/snapdragon-media768.css';
import 'ui/css/snapdragon-media1200.css';
import 'ui/css/snapdragon-media-display.css';

import { store } from 'redux/store';

import { nextLesson } from 'ui/setup/next-lesson';
import { nextLayout } from 'ui/setup/next-layout';
import { nextItem } from 'ui/setup/next-item';

import { renderHeaders } from 'ui/fixtures/headers';
import { renderScore } from 'ui/fixtures/score';
// import { renderCollections } from 'ui/screens/home/collections';
import { renderHome } from 'ui/screens/home/home';
import { renderNavigation } from 'ui/fixtures/navigation';

import { subscription } from 'redux/subscriptions';
import { actions } from 'redux/actions/action-creators';
import { renderSpeciesGrid } from "./ui/screens/home/species-grid";
// import { renderSnapdragon } from "./ui/screens/home/snapdragon";

// import { screenShare } from 'ui/screens/multichoice/mixed-specimen-shared';

import { updateLanguage } from 'api/traits/trait-types';

setTimeout( () => {

    const { config, counter: currentCounter, collection } = store.getState();

    config.isPortraitMode = window.matchMedia("(max-width: 767px)").matches;
    config.isLandscapeMode = !config.isPortraitMode;

    const counter = currentCounter ? { ...currentCounter } : { index: null };

    actions.boundUpdateConfig(config);
    actions.boundToggleLesson(counter);

    subscription.add(renderHeaders, 'page', 'flow');
    subscription.add(renderNavigation, 'page', 'flow');
    subscription.add(renderHome, 'counter', 'flow');
    // subscription.add(renderCollections, 'counter', 'flow');
    // if(!config.isPortraitMode && (collection && !collection.name)) {
    //     subscription.add(renderSnapdragon, 'counter', 'flow');
    // }

    subscription.add(renderSpeciesGrid, 'counter', 'flow');
    subscription.add(nextLesson, 'counter', 'flow');
    subscription.add(nextLayout, 'counter', 'flow');
    subscription.add(nextItem, 'layout', 'flow');
    
    subscription.add(renderScore, 'score', 'flow');
    
    // subscription.add(screenShare.randomiseItems, 'collection', 'flow');
    subscription.add(updateLanguage, 'config', 'localistation');
});