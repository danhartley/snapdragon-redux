import { utils } from 'utils/utils';
import { store } from 'redux/store';
import { imageSlider } from 'ui/screens/common/image-slider';
import { radioButonClickhandler } from 'ui/helpers/handlers';
import visualMatchTemplate from 'ui/screens/multichoice/visual-match-template.html';
import { itemProperties } from '../../helpers/data-checking';

export const renderVisualMatch = collection => {

    const item = collection.nextItem;

    const { config, lessonPlan, layout } = store.getState();

    const template = document.createElement('template');

    template.innerHTML = visualMatchTemplate;

    const description1 = 'Can you identify the species?';
    const description2 = '';
    
    const answers = layout.screens[1].type === 'binomial' 
            ? itemProperties.itemNames(collection.items, collection.itemGroup)
            : itemProperties.vernacularNames(collection.items, config, collection.itemGroup);

    const questionValue = layout.screens[1].type === 'binomial'
            ? item.name
            : item.names.filter(names => names.language === config.language)[0].vernacularName;

    const vernacularName = layout.screens[1].type === 'binomial'
            ? ''
            : item.names.filter(names => names.language === config.language)[0].vernacularName;

    const question = { question: questionValue, binomial: item.name, vernacular: vernacularName };
    const questionFormat = { itemId: item.id, question, layoutCount: lessonPlan.layouts.length, points: layout.points };

    radioButonClickhandler(config, template, description1, description2, utils.shuffleArray(answers), '.js-rb-answer-btn', questionFormat);
    
    if(config.isPortraitMode) {
        imageSlider(item, document.querySelector('.js-species-card-images'), true);
    }
};