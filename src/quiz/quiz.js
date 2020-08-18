import "babel-polyfill";

import 'ui/css/snapdragon-colours.css';
import 'ui/css/snapdragon.css';
import 'ui/css/common.css';
import 'ui/css/groups/modal.css';
import 'ui/css/snapdragon-media.css';
import 'quiz/style.scss';

import { store } from 'redux/store';
import { actions } from 'redux/actions/action-creators';
import { subscription } from 'redux/subscriptions';
import { handleWindowResize } from 'index-helpers/media-helper';
import { logic } from 'quiz/quiz-logic';
import { quizDecks } from 'quiz/quiz-decks';
import { quizSettings } from 'quiz/quiz-settings';
import { quizSummary } from 'quiz/quiz-summary';
import { snapLog, logError, logAPIError } from 'ui/helpers/logging-handler';

const init = () => {

  setTimeout( async () => {
    
    window.snapLog = snapLog;

    handleWindowResize();
    
    subscription.add(quizDecks, 'decks', 'modal');
    subscription.add(quizSettings, 'decks', 'modal');
    subscription.add(quizSummary, 'decks', 'modal');
    
    const decks = await logic.getDeckSummaries();
    actions.boundUpdateDecks([ ...decks.filter(deck => deck.count > 0), { name: `${new Date().getTime()}`, count: 0 } ]);

    const { config } = store.getState();

    config.isPortraitMode = window.matchMedia("(max-width: 767px)").matches;
    config.isLandscapeMode = !config.isPortraitMode;

    actions.boundUpdateConfig(config);
  });
  
};

init();