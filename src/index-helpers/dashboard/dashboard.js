import { store } from 'redux/store';
import { subscription } from 'redux/subscriptions';
import { renderVocabTestScore } from 'index-helpers/dashboard/vocab-test';
import { renderVocabTestHistoryScore } from 'index-helpers/dashboard/vocab-test-history';
import { renderTemplate } from 'ui/helpers/templating';
import { renderDeckScore } from 'index-helpers/dashboard/observational-test';
import { renderLessonQuizScores } from 'index-helpers/dashboard/lesson-quiz';
import { renderLessonQuizHistoryScores } from 'index-helpers/dashboard/lesson-quiz-history';
import { renderInatAutocomplete } from 'ui/screens/common/inat/inat-autocomplete-widget';

import dashboardTemplate from 'index-helpers/dashboard/dashboard-template.html';

export const renderDashboard = () => {

  const template = document.createElement('template');
        template.innerHTML = dashboardTemplate;

  const parent = document.querySelector('.js-main-lesson-body');
        parent.innerHTML = '';

  renderTemplate({}, template.content, parent);

  subscription.add(renderVocabTestScore, 'quickFire', 'flow');
  subscription.add(renderVocabTestHistoryScore, 'quickFireHistory', 'flow');
  subscription.add(renderDeckScore, 'deckScore', 'flow');
  subscription.add(renderLessonQuizScores, 'score', 'flow');
  subscription.add(renderLessonQuizHistoryScores, 'history', 'flow');

  const { config, quickFire, quickFireHistory, deckScore, score, history } = store.getState();

  renderVocabTestScore(quickFire);
  renderVocabTestHistoryScore(quickFireHistory);
  renderDeckScore(deckScore);
  renderLessonQuizScores(score);
  renderLessonQuizHistoryScores(history);

  renderInatAutocomplete(document.querySelector('.inat-autocomplete-container'));
};