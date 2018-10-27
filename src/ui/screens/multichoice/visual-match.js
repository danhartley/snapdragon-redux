import * as R from 'ramda'

import { utils } from 'utils/utils';
import { store } from 'redux/store';
import * as SD from 'api/traits/trait-types';
import { imageSlider } from 'ui/screens/common/image-slider';
import { radioButonClickhandler } from 'ui/helpers/handlers';
import { itemProperties } from 'ui/helpers/data-checking';
import { taxa } from 'api/snapdragon/taxa';
import { lookALikes } from 'ui/screens/common/look-alikes';
import { getFungiTraits } from 'api/traits/fungi-traits';
import specimenCommonMatchTemplate from 'ui/screens/multichoice/visual-match-template.html';

export const renderSpecimenMatch = collection => {

    const item = collection.nextItem;

    const { config, lessonPlan, layout, enums } = store.getState();

    const template = document.createElement('template');

    template.innerHTML = specimenCommonMatchTemplate;

    let question, answers, descriptions = [];

    const scorehandler = (descriptions, question, answers) => {        
        const questionFormat = { itemId: item.id, question, layoutCount: lessonPlan.layouts.length, points: layout.points };
        radioButonClickhandler(config, template, descriptions, answers, '.js-rb-answer-btn', questionFormat);
    }

    if(layout.screens.find(screen => screen.name === 'visual-match')) {

        let identification;
        let questionTxt = 'Can you identify this species?';

        if(config.isLandscapeMode) {
            const taxon = taxa.find(t => t.name === item.genus);
            identification = taxon ? `Genus: ${taxon.descriptions[0].identification}` : '';
            item.keyTrait = `${utils.capitaliseFirst(enums.name.HOW_EDIBLE)}: ${itemProperties.getActiveTrait(getFungiTraits(enums), item.name, [{ name: enums.name.HOW_EDIBLE, formatter: trait => trait.value }])}`;
        }

        descriptions = [
            questionTxt,
            '',
            identification,
            item.keyTrait
        ];
        
        const number = config.isPortraitMode ? 4 : 6;

        answers = layout.screens[1].type === 'binomial' 
                ? itemProperties.answersFromList(itemProperties.itemNamesForGroups(collection.items), item.name, number)
                : itemProperties.answersFromList(itemProperties.vernacularNamesForGroups(collection.items, config), item.vernacularName, number);

        const questionValue = layout.screens[1].type === 'binomial'
                ? item.name
                : itemProperties.vernacularName(item, config);

        const vernacularName = layout.screens[1].type === 'binomial'
                ? ''
                : itemProperties.vernacularName(item, config);

        question = { question: questionValue, binomial: item.name, vernacular: vernacularName };

        scorehandler(descriptions, question, utils.shuffleArray(answers));
        
        if(config.isPortraitMode) {
            document.querySelector('.js-txt-question').innerHTML = questionTxt;
        }
    }

    if(layout.screens.find(screen => screen.name === 'trait-property')) {

        const screen = layout.screens.find(screen => screen.name === 'trait-property');

        let traitName;

        let questionTxt;

        switch(screen.trait) {
            case 'howEdible':
                traitName = 'how edible';
                questionTxt = 'How edible is this mushroom?';
                descriptions[0] = questionTxt;
                descriptions[1] = 'Click on an image to open the picture gallery.'
                descriptions[2] = '';
                descriptions[3] = 'Stuck? Click here to reveal the name of this mushroom.';
                break;
            case 'capShape':
                traitName = 'cap shape';
                questionTxt = config.isLandscapeMode ? 'How would you describe the pileus (cap) of this mushroom?' : 'How would you describe this pileus (cap)?';
                descriptions[0] = questionTxt;
                descriptions[1] = 'Click on an image to open the picture gallery.'
                descriptions[2] = '';
                descriptions[3] = 'Stuck? Click here to reveal the name of this mushroom.';
                break;
        }
                
        const traitValue = getFungiTraits(enums).find(trait => trait.name === item.name).traits.find(trait => trait.name === traitName).value;
        question = { question: traitValue, binomial: item.name };

        let traits = [];
        Object.keys(SD[screen.trait]).forEach(key => {
            let value = SD[screen.trait][key];
            traits.push(value);
          });

        if(config.isLandscapeMode) {
            const filteredTraits = R.take(4, traits.filter(trait => trait.toUpperCase() !== traitValue.toUpperCase()));            
            traits = utils.shuffleArray(filteredTraits);
        } else {
            const filteredTraits = R.take(3, traits.filter(trait => trait.toUpperCase() !== traitValue.toUpperCase()));
            traits = utils.shuffleArray(filteredTraits);
        }

        traits.push(traitValue);

        answers = traits.filter(utils.onlyUnique);

        scorehandler(descriptions, question, utils.shuffleArray(answers));

        if(config.isPortraitMode) {
            document.querySelector('.js-txt-question').innerHTML = questionTxt;
        }

        const hint = document.querySelector('.js-clickable-description');
        if(hint) {
            hint.classList.add('clickable');
            hint.addEventListener('click', () =>{
                hint.innerHTML = `${itemProperties.vernacularName(item, config)} (${item.name})`;
            });
        }

        if(screen.trait === 'howEdible') {            
            lookALikes(collection, item, getFungiTraits(enums), config);
        }
    }

    if(config.isPortraitMode) {

        const images = item.images.map((img, index) => { 
            return { index: index + 1, src: img, itemName: item.name };
        } );
    
        const parent = document.querySelector('.js-species-card-images');

        if(!parent) return;

        imageSlider(config, images, parent, true);
    }
};