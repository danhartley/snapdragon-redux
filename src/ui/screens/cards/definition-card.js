import { store } from 'redux/store';
import { utils } from 'utils/utils';
import { DOM } from 'ui/dom';
import { actions } from 'redux/actions/action-creators';
import definitionCardTemplate from 'ui/screens/cards/definition-card-template.html';
import { renderTemplate } from 'ui/helpers/templating';
import { getGlossary } from 'api/glossary/glossary';

export const renderDefinitionCard = collection => {

    const { lessonPlan } = store.getState();

    const item = collection.nextItem;

    item.questionCount = lessonPlan.layouts.filter(layout => layout.type === 'test').length;
    item.layoutCount = lessonPlan.layouts.length;

    const template = document.createElement('template');

    template.innerHTML = definitionCardTemplate;

    const parent = DOM.rightBody;
    parent.innerHTML = '';

    const filteredTerms = getGlossary(collection.glossary).filter(term => term.level === 1);

    const glossary = utils.sortAlphabeticallyBy(filteredTerms, 'term');
    
    renderTemplate({ glossary }, template.content, parent);

    document.querySelector('.js-definition-card-btn').addEventListener('click', event => {
        actions.boundEndRevision(item);
    });
};