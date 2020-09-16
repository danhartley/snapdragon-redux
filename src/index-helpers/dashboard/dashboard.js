import { store } from 'redux/store';
import { subscription } from 'redux/subscriptions';
import { renderVocabtestScore } from 'index-helpers/dashboard/vocab-test';
import { renderTemplate } from 'ui/helpers/templating';
import { renderDeckScore } from 'index-helpers/dashboard/observational-test';
import { renderLessonQuizScores } from 'index-helpers/dashboard/lesson-quiz';
import { renderLessonQuizHistoryScores } from 'index-helpers/dashboard/lesson-quiz-history';

import dashboardTemplate from 'index-helpers/dashboard/dashboard-template.html';

export const renderDashboard = () => {

  const template = document.createElement('template');
        template.innerHTML = dashboardTemplate;

  const parent = document.querySelector('.js-main-lesson-body');
        parent.innerHTML = '';

  renderTemplate({}, template.content, parent);

  subscription.add(renderVocabtestScore, 'quickFire', 'flow');
  subscription.add(renderDeckScore, 'deckScore', 'flow');
  subscription.add(renderLessonQuizScores, 'score', 'flow');
  subscription.add(renderLessonQuizHistoryScores, 'history', 'flow');

  const { config, quickFire, deckScore, score, history } = store.getState();

  if(config.isPortraitMode) {
    renderVocabtestScore(quickFire);
    renderDeckScore(deckScore);
    renderLessonQuizScores(score);
    // renderLessonQuizHistoryScores(history);
  }
};