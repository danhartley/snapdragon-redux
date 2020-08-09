import "babel-polyfill";

import 'ui/css/snapdragon-colours.css';
import 'ui/css/snapdragon.css';
import 'ui/css/common.css';
import 'ui/css/groups/modal.css';
import 'ui/css/snapdragon-media.css';
import 'quiz/style.scss';

import { actions } from 'redux/actions/action-creators';
import { subscription } from 'redux/subscriptions';
import { handleWindowResize } from 'media-helper';
import { logic } from 'quiz/quiz-logic';
import { quizStart } from 'quiz/quiz-start';
import { snapLog, logError, logAPIError } from 'ui/helpers/logging-handler';

const init = async () => {

  window.snapLog = snapLog;

  handleWindowResize();
  
  subscription.add(quizStart, 'decks', 'modal');

  actions.boundUpdateDecks(await logic.getDeckNames());
  
};

init();