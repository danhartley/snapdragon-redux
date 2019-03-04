import { store } from 'redux/store';
import { DOM } from 'ui/dom';
import { renderTemplate } from 'ui/helpers/templating';
import mixedSpecimenQuestionTemplate from 'ui/screens/multichoice/landscape/mixed-specimen/left/mixed-specimen-question-template.html';

export const renderMixedSpecimenQuestion = collection => {

    const item = collection.nextItem;

    if(!item) return;

    const template = document.createElement('template');

    template.innerHTML = mixedSpecimenQuestionTemplate;

    const parent = DOM.leftBody;
    parent.innerHTML = '';

    renderTemplate({ }, template.content, parent);

};
