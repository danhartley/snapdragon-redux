import * as R from 'ramda'

import { utils } from 'utils/utils';
import { store } from 'redux/store';
import * as SD from 'api/traits/trait-types';
import { imageSlider } from 'ui/screens/common/image-slider';
import { radioButonClickhandler } from 'ui/helpers/handlers';
import { itemProperties } from 'ui/helpers/data-checking';
import { taxa } from 'api/snapdragon/taxa';
import { lookALikes } from 'ui/screens/common/look-alikes';
import { getTraits } from 'api/traits/traits';
import * as traitTypes from 'api/traits/trait-types';
import { iconicTaxa, matchTaxon, matchTaxonKey } from 'api/snapdragon/iconic-taxa';
import { imageUseCases, prepImagesForCarousel } from 'ui/helpers/image-handlers';
import specimenCommonMatchTemplate from 'ui/screens/multichoice/visual-match-template.html';

export const renderSpecimenMatch = collection => {

    const item = collection.nextItem;

    const rank = matchTaxon(item.taxonomy, iconicTaxa).toLowerCase();

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

        descriptions = [ questionTxt ];
        
        const number = config.isPortraitMode ? 4 : 6;

        let itemPool = collection.allItems || collection.items;

        itemPool = R.clone(itemPool.filter(i => i.name !== item.name).filter(i => matchTaxonKey(i.taxonomy,[rank])));
        
        const names = R.take(number-1, utils.shuffleArray(itemPool.map(i => i.name)));
        names.push(item.name);
        
        const vernaculars = R.take(number-1, utils.shuffleArray(itemProperties.vernacularNamesForItems(itemPool, config)));
        vernaculars.push(itemProperties.getVernacularName(item, config));

        answers = layout.screens[1].type === 'binomial'
            ? utils.shuffleArray(names)
            : utils.shuffleArray(vernaculars);

        const questionValue = layout.screens[1].type === 'binomial'
                ? item.name
                : item.vernacularName;

        const vernacularName = layout.screens[1].type === 'binomial'
                ? ''
                : item.vernacularName;

        question = { question: questionValue, binomial: item.name, vernacular: vernacularName };

        scorehandler(descriptions, question, utils.shuffleArray(answers));
        
        if(config.isPortraitMode) {
            document.querySelector('.js-txt-question').innerHTML = questionTxt;
        } 
        
        if(config.isLandscapeMode) {
            const taxon = taxa.find(t => t.name === item.genus);
            identification = taxon ? `Genus: ${taxon.descriptions[0].identification}` : '';
            const traits = getTraits(enums);
        }
    }

    if(layout.screens.find(screen => screen.name === 'trait-property')) {

        let questionTxt;
        
        const speciesTraits = getTraits(enums).find(trait => trait.name === item.name);
        const typedSpeciesTraits = traitTypes.typedSpecies(enums, speciesTraits);
        if(!typedSpeciesTraits) return;
        const trait = R.take(1, utils.shuffleArray(typedSpeciesTraits))[0];
        
        if(!trait) return;
        const traitValue = trait.value || '';
        question = { question: traitValue, binomial: item.name };

        switch(trait.type) {
            case 'howEdible':                
                questionTxt = 'How edible is this species?';
                descriptions[0] = questionTxt;
                break;
            case 'capShape':
                questionTxt = config.isLandscapeMode ? 'How would you describe the pileus (cap) of this mushroom?' : 'How would you describe this pileus (cap)?';
                descriptions[0] = questionTxt;
                break;
            case 'hymeniumType':
                questionTxt = 'What is the hymenium type of this mushroom?';
                descriptions[0] = questionTxt;
                break;
            case 'ecoType':
                questionTxt = 'What is the ecological type of this mushroom?';
                descriptions[0] = questionTxt;
                break;
            case 'habitat':
                questionTxt = 'Where would you expect to find this species?';
                descriptions[0] = questionTxt;
                break;
            case 'thallusType':
                questionTxt = 'What is this lichen\'s thallus type?';
                descriptions[0] = questionTxt;
                break;
            default:
                questionTxt = config.isLandscapeMode ? `${trait.name}` : `${trait.name}`;
                descriptions[0] = questionTxt;
        }

        let traits = [ ];
        Object.keys(SD[trait.type]).forEach(key => {
            let value = SD[trait.type][key];
            if(key !== 'type' && key !== 'name') {
                traits.push(value);
            }            
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
                hint.innerHTML = `${item.vernacularName} (${item.name})`;
            });
        }

        if(trait.type === 'howEdible') {            
            lookALikes(collection, item, getTraits(enums), config);
        }
    }

    if(config.isPortraitMode) {

        const images = prepImagesForCarousel(item, config, imageUseCases.VISUAL_MATCH);

        const parent = document.querySelector('.js-species-card-images');

        if(!parent) return;

        imageSlider(config, images, parent, true);
    }
};