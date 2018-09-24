import { utils } from 'utils/utils';
import { store } from 'redux/store';
import { imageSlider } from 'ui/screens/common/image-slider';
import { radioButonClickhandler } from 'ui/helpers/handlers';
import { itemProperties } from '../../helpers/data-checking';
import { taxa } from 'api/snapdragon/taxa';
import { fungiTraits } from 'api/traits/fungi-traits';
import visualMatchTemplate from 'ui/screens/multichoice/visual-match-template.html';

export const renderVisualMatch = collection => {

    const item = collection.nextItem;

    const { config, lessonPlan, layout } = store.getState();

    const template = document.createElement('template');

    template.innerHTML = visualMatchTemplate;

    let identification;

    if(config.isLandscapeMode) {
        const taxon = taxa.find(t => t.name === item.genus);
        identification = taxon ? `Genus: ${taxon.descriptions[0].identification}` : '';
        item.keyTrait = `How edible: ${itemProperties.getActiveTrait(fungiTraits, item.name, config.language, [{ name: 'how edible', formatter: trait => trait.value }])}`;
    }

    const descriptions = [
        'Can you identify the species?',
        identification,
        item.keyTrait
    ];
    
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

    radioButonClickhandler(config, template, descriptions, utils.shuffleArray(answers), '.js-rb-answer-btn', questionFormat);
    
    if(config.isPortraitMode) {
        imageSlider(item, document.querySelector('.js-species-card-images'), true);
    }
};