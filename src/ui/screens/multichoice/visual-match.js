import * as R from 'ramda';

import { store } from 'redux/store';
import { renderTemplate } from 'ui/helpers/templating';
import { imageSlider } from 'ui/screens/common/image-slider';
import { radioButonClickhandler } from 'ui/helpers/handlers';
import visualMatchTemplate from 'ui/screens/multichoice/visual-match-template.html';
import rbGroupTemplate from 'ui/screens/multichoice/radiobutton-group-template.html';
import updateBtnTemplate from 'ui/screens/multichoice/update-btn-template.html';

export const renderVisualMatch = collection => {

    const item = collection.nextItem;

    const { config, lessonPlan, layout } = store.getState();

    const template = document.createElement('template');

    template.innerHTML = visualMatchTemplate;

    const description1 = 'Can you identify the species?';
    const description2 = '';
    const itemGroup = [0,1,2,3]; //collection.itemGroup
    const answers = collection.items.filter((item, index) => R.contains(index, itemGroup)).map(item => item.name);

    // const rbGroup = document.createElement('template');

    // rbGroup.innerHTML = rbGroupTemplate;

    // renderTemplate({}, rbGroup.content, document.querySelector('.js-rb-group'));

    // const updateBtn = document.createElement('template');

    // updateBtn.innerHTML = updateBtnTemplate;

    // renderTemplate({}, updateBtn.content, document.querySelector('.js-update-btn'));

    const question = { question: item.name, binomial: item.name };
    const questionFormat = { itemId: item.id, question, layoutCount: lessonPlan.layouts.length, points: layout.points };

    radioButonClickhandler(config, template, description1, description2, answers, '.js-rb-answer-btn', questionFormat);
    
    imageSlider(item, document.querySelector('.js-species-card-images'), true);
};