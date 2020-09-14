// import { Workbox } from 'workbox-window';
import "babel-polyfill";

import 'bootstrap/dist/css/bootstrap.min.css';

import 'ui/css/snapdragon-colours.css';
import 'ui/css/snapdragon.css';
import 'ui/css/common.css';
import 'ui/css/species-list.css';
import 'ui/css/snapdragon-media.css';
import 'ui/css/non-main.css';
import 'quiz/style.scss';
import 'ui/css/groups/create-guide.css';
import 'ui/css/groups/modal.css';
import 'ui/css/groups/species-card.css';
import 'ui/css/groups/test-card.css';

import { utils } from 'utils/utils';
import { store, persistor } from 'redux/store';
import { nextLesson } from 'ui/setup/next-lesson';
import { nextLayout } from 'ui/setup/next-layout';
import { nextItem } from 'ui/setup/next-item';
import { renderHeaders } from 'ui/fixtures/headers';
import { renderScore } from 'ui/fixtures/score';
import { renderHome } from 'ui/screens/home/home';
import { renderNavigation, renderLoginChanges } from 'ui/fixtures/navigation';
import { subscription } from 'redux/subscriptions';
import { actions } from 'redux/actions/action-creators';
import { traitValuesHandler } from 'api/traits/trait-types';
import { initialiseConfig } from 'ui/helpers/location-helper';
import { firestore } from 'api/firebase/firestore';
import { renderLoggedIn } from 'ui/fixtures/login';
import { cookieHandler } from 'ui/helpers/cookie-handler';
import { lessonModalHandler } from 'ui/screens/cards/test-card-modal-handler';
import { loadMainHTML, handleWindowResize, loadModalHTML } from 'index-helpers/media-helper';
import { snapLog, logError, logAPIError } from 'ui/helpers/logging-handler';
import * as Sentry from '@sentry/browser';
import LogRocket from 'logrocket';

const onLoadHandler = () => {

  // loadMainHTML();
  loadModalHTML();

  setTimeout( async () => {

    Sentry.init({ dsn: 'https://9d9d8654a6a345a3af09df89cb615bde@o136894.ingest.sentry.io/302756' });

    handleWindowResize(); 

    // const purgeData = cookieHandler.hasUserBeenAwayTooLong();

    // if(purgeData) {
    //     persistor.purge();
    //     window.location.reload(true);
    // } else {
    //   const lastVisitedCookie = cookieHandler.setLastVisitedCookie(Date());
    // }

    const lastVisitedCookie = cookieHandler.setLastVisitedCookie(Date());

    let lessonPlan;

    try {

        const { config, counter: currentCounter, lessonPlan: statePlans, collections } = store.getState();

        lessonPlan = statePlans;

        config.isPortraitMode = window.matchMedia("(max-width: 767px)").matches;
        config.isLandscapeMode = !config.isPortraitMode;

        const counter = currentCounter ? { ...currentCounter } : { index: null, isLessonPaused: true };

        actions.boundUpdateConfig(config);
        actions.boundStopStartLesson(counter);

        if(collections && collections.length === 0) {
            const cloudCollections = await firestore.getCollections();
            actions.boundUpdateCollections(cloudCollections);
        }

        subscription.add(renderHeaders, 'collection', 'flow');
        renderNavigation();
        subscription.add(renderNavigation, 'collection', 'flow');
        renderLoginChanges();
        subscription.add(renderLoginChanges, 'user', 'flow');
        subscription.add(renderLoggedIn, 'user', 'flow');
        subscription.add(renderHome, 'counter', 'flow'); // avoid adding as listener on page refresh
        subscription.add(renderScore, 'score', 'flow');
                
        subscription.add(nextItem, 'layout', 'quiz');
        subscription.add(nextLesson, 'counter', 'quiz');
        subscription.add(nextLayout, 'counter', 'quiz');
        
        subscription.add(traitValuesHandler, 'config', 'localisation');

        const updateConfig = async () => {
            const initialisedConfig = await initialiseConfig(config);
            actions.boundUpdateConfig(initialisedConfig);
        };

        if(!config.guide.locationType) {
            updateConfig();
        }

        let glossary = await firestore.getDefinitionsByTaxa(['common', 'plantae', 'aves', 'fungi', 'insecta']);
            glossary = utils.sortAlphabeticallyBy(glossary, 'term');
        actions.boundCreateGlossary(glossary);
        
        lessonModalHandler.onCloseModal();

    }
    catch(e) {
        console.log('home page error: ', e)
        // persistor.purge();
        // window.location.reload(true);        
    }
  });

  window.snapLog = snapLog;
  window.logError = logError;
  window.logAPIError = logAPIError;

  const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.GOOGLE_API_MAPS_KEY}&libraries=places`;
  document.body.appendChild(script);

  LogRocket.init('qysfum/learn-the-planet');

  if ('serviceWorker' in navigator) {
    window.addEventListener('load', async () => {
      // navigator.serviceWorker.register('./sw.js').then(async ()=>{
        // console.log('service worker registered');
        // Imports the module source file with ES2015+ syntax
        const { Workbox } = await import('workbox-window/Workbox.mjs');
        const wb = new Workbox('./sw.js');
        wb.addEventListener('waiting', (event) => {
          console.log(`A new service worker has installed, but it can't activate` +
              `until all tabs running the current version have fully unloaded.`);
        });
        wb.addEventListener('activated', (event) => {
          // `event.isUpdate` will be true if another version of the service
          // worker was controlling the page when this version was registered.
          if (!event.isUpdate) {
            console.log('Service worker activated for the first time!');
        
            // If your service worker is configured to precache assets, those
            // assets should all be available now.
          }          
        });
        wb.register();
      // });
    });
  }
};

onLoadHandler();