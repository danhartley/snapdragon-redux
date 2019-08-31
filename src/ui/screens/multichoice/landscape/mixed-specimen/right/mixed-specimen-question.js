import * as R from 'ramda';

import { utils } from 'utils/utils';
import { actions } from 'redux/actions/action-creators';
import { store } from 'redux/store';
import { returnIcon } from 'ui/helpers/icon-handler';
import { firestore } from 'api/firebase/firestore';
import { renderTestCardTemplate } from 'ui/screens/cards/test-card';
import { itemProperties } from 'ui/helpers/data-checking';
import { listenToImageSelection, listenToUserAnswer, renderMixedSpecimenImages } from 'ui/screens/multichoice/landscape/mixed-specimen/left/mixed-specimen-images';
import { renderTemplate } from 'ui/helpers/templating';

import mixedSpecimenQuestionTemplate from 'ui/screens/multichoice/landscape/mixed-specimen/right/mixed-specimen-question-template.html';

export const renderMixedSpecimenQuestion = (collection, bonusLayout) => {

    const { config, layout } = store.getState();

    const item = R.clone(collection.nextItem);

    let question = 'Find the species';
    let help = '(Click on the matching photo.)';

    if(bonusLayout) {
        question = bonusLayout.overrides.question || question;
        help = bonusLayout.overrides.help || help;
    }

    const parent = renderTestCardTemplate(collection, { vernacularName: item.vernacularName, binomial: item.name, question, help, term: '' });
    
    const template = document.createElement('template');

    template.innerHTML = mixedSpecimenQuestionTemplate;

    const instructions = `Identify & Select`;
    const binomial = item.name;

    renderTemplate({ instructions, binomial }, template.content, parent);

    const listenToImageChangeHandler = async images => {        

        let speciesList, unorderedImages;

        unorderedImages = utils.shuffleArray(images);

        speciesList = document.querySelector('.js-images-names-txt');

        if(!speciesList) return;

        speciesList.innerHTML = "";

        const speciesItems = await Promise.all(unorderedImages.map(async image => {

            const imageItem = await firestore.getSpeciesByName(image.itemName);
            const vernacularName = itemProperties.getVernacularName(imageItem, config);
            const taxonIcon = returnIcon(imageItem);

            return `<li id="${image.itemName}">${taxonIcon}<span>${vernacularName}</span></li>`;
        }));

        speciesList.innerHTML = speciesItems.join('');
    };

    listenToImageSelection(listenToImageChangeHandler);

    const continueLessonBtn = document.querySelector('.js-continue-lesson-btn');

    const pendingScore = {};

    listenToUserAnswer((score, scoreUpdateTimer) => {
        
        continueLessonBtn.disabled = false;
        pendingScore.score = score;
        pendingScore.scoreUpdateTimer = scoreUpdateTimer;
    });

    continueLessonBtn.addEventListener('click', () => {
        window.clearTimeout(pendingScore.scoreUpdateTimer);
        actions.boundUpdateScore(pendingScore.score);
    });

    document.querySelector('.js-help-txt').addEventListener('click', () => {
        const noOfImagesPerItem = layout.bonusLayout ? 6 / collection.items.length : 1;
        const preselectedItems = layout.bonusLayout ? collection.items : null;
        renderMixedSpecimenImages(collection, noOfImagesPerItem, preselectedItems);
    });    
};
