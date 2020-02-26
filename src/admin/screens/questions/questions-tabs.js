import { renderTemplate } from 'ui/helpers/templating';
import { addQuestion } from 'admin/screens/questions/add-question';
import { createQuestion } from 'admin/screens/questions/create-question';

import questionTabsTemplate from 'admin/screens/questions/questions-tabs-template.html';

export const renderQuestionTabs = (collection, species, parent) => {

    const init = async () => {

      const template = document.createElement('template');
            template.innerHTML = questionTabsTemplate;

      parent.innerHTML = '';

      renderTemplate({}, template.content, parent);

      const tabs = document.querySelector('.tabs');

      var instance = M.Tabs.init(tabs, {});

      const questionPanel = document.querySelector('.js-question-panel');
            questionPanel.innerHTML = '';

      const addQuestionTab = document.querySelector('#addQuestionTab');
            addQuestionTab.addEventListener('click', async e => {
            questionPanel.innerHTML = '';
            addQuestion(species, questionPanel);
            });

      const createQuestionTab = document.querySelector('#createQuestionTab');
            createQuestionTab.addEventListener('click', e => {
            questionPanel.innerHTML = '';
            createQuestion(collection, species, questionPanel);
            });    

            createQuestionTab.click();
    }

    init();
}