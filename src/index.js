import "babel-polyfill";

import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import { utils } from 'utils/utils';

import 'ui/css/snapdragon-colours.css';
import 'ui/css/snapdragon.css';
import 'ui/css/snapdragon-media.css';
import 'ui/css/snapdragon-media-display.css';
import 'ui/css/groups/test-card.css';
import 'ui/css/groups/species-card.css';
import 'ui/css/groups/modal.css';

import { store } from 'redux/store';
import { getIPLocation } from 'geo/geo';
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
import { persistor } from 'redux/store';

setTimeout( () => {

    try {

        
        const { config, counter: currentCounter, collection } = store.getState();

        config.isPortraitMode = window.matchMedia("(max-width: 767px)").matches;
        // config.isPortraitMode = window.matchMedia("(max-width: 1023px)").matches;
        config.isLandscapeMode = !config.isPortraitMode;

        const counter = currentCounter ? { ...currentCounter } : { index: null };

        const observableMonths = utils.getObservableMonths(new Date(), 3);

        config.guide.season.observableMonths = observableMonths;
        config.guide.season.type = 'months';

        actions.boundUpdateConfig(config);
        actions.boundToggleLesson(counter);

        subscription.add(renderHeaders, 'page', 'flow');
        subscription.add(renderNavigation, 'page', 'flow');
        subscription.add(renderHome, 'counter', 'flow');
        subscription.add(renderSpeciesGrid, 'counter', 'flow');
        subscription.add(nextLesson, 'counter', 'flow');
        subscription.add(nextLayout, 'counter', 'flow');
        subscription.add(nextItem, 'layout', 'flow');
        subscription.add(renderScore, 'score', 'flow');
        subscription.add(updateLanguage, 'config', 'localistation');

        async function getApproximateLocation() {
            
            try {
                const ipLocation = await getIPLocation(config);
                
                if(ipLocation.country_name) {
                    config.ipLocation = ipLocation;
                    config.guide.locationType = 'longLat';
                    config.guide.locationLongLat = ipLocation.country_name;
                    config.guide.place.name = ipLocation.country_name;            
                    config.collection.id = 2;
                } else {
                    config.guide.locationPlace = 'Earth';
                    config.guide.locationType = 'place';
                    config.guide.place = { id: 'any', name: 'Earth' };
                    config.collection.id = 1;
                }
            } catch(e) {            
                config.guide.locationPlace = 'Earth';
                config.guide.locationType = 'place';
                config.guide.place = { id: 'any', name: 'Earth' };
            }

            actions.boundUpdateConfig(config);
        }

        if(!config.guide.locationType) {
            getApproximateLocation();
        }
    }
    catch(e) {
        persistor.purge();
        window.location.reload(true);
    }
});