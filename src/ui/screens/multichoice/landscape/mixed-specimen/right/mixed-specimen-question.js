import * as R from 'ramda';

import { utils } from 'utils/utils';
import { actions } from 'redux/actions/action-creators';
import { store } from 'redux/store';
import { returnIcon } from 'ui/helpers/icon-handler';
// import { renderIcon } from 'ui/helpers/icon-handler';
import { species } from 'api/species';
import { renderTestCardTemplate } from 'ui/screens/cards/test-card';
import { itemProperties } from 'ui/helpers/data-checking';
import { listenToImageSelection, listenToUserAnswer, renderMixedSpecimenImages } from 'ui/screens/multichoice/landscape/mixed-specimen/left/mixed-specimen-images';
import { renderTemplate } from 'ui/helpers/templating';
import mixedSpecimenQuestionTemplate from 'ui/screens/multichoice/landscape/mixed-specimen/right/mixed-specimen-question-template.html';

export const renderMixedSpecimenQuestion = (...args) => {

    const collection = R.clone(args[0]);
    const bonus = args[1]; 

    const { config, layout } = store.getState();

    const item = collection.nextItem;

    let question = 'Find the species';
    let help = '(Click on the matching photo.)';

    if(bonus) {
        question = bonus.overrides.question || question;
        help = bonus.overrides.help || help;
    }

    const parent = renderTestCardTemplate(collection, { vernacularName: item.vernacularName, binomial: item.name, question, help, term: '' });
    
    const template = document.createElement('template');

    template.innerHTML = mixedSpecimenQuestionTemplate;

    const instructions = `Identify & Select`;
    const binomial = item.name;

    renderTemplate({ instructions, binomial }, template.content, parent);

    // const icon = renderIcon(item.taxonomy, document);

    const listenToImageChangeHandler = images => {        
        let speciesToShow = '';
        const uniqueImages = [];
        utils.shuffleArray(images).forEach(image => {            
            const i = image;
            const vernacularName = itemProperties.getVernacularName(species.find(sp => sp.name === image.itemName), config);  
            const taxonIcon = returnIcon(species.find(sp => sp.name === image.itemName));
            if(!R.contains(image.itemName, uniqueImages)) {
                speciesToShow +=  `<li id="${image.itemName}">${taxonIcon}<span>${vernacularName}</span></li>`;
                uniqueImages.push(image.itemName);
            }
        });
        const speciesList = document.querySelector('.js-images-names-txt');
        if(speciesList) speciesList.innerHTML = speciesToShow;
    };

    listenToImageSelection(listenToImageChangeHandler);

    const continueLessonBtn = document.querySelector('.js-continue-lesson-btn');

    const pendingScore = {};

    listenToUserAnswer((score, scoreUpdateTimer) => {
        
        continueLessonBtn.disabled = false;
        pendingScore.score = score;
        pendingScore.scoreUpdateTimer = scoreUpdateTimer;

        // score.success ? icon.classList.add('answer-success') : icon.classList.add('answer-alert');
    });

    continueLessonBtn.addEventListener('click', () => {
        window.clearTimeout(pendingScore.scoreUpdateTimer);
        actions.boundUpdateScore(pendingScore.score);
    });

    document.querySelector('.js-help-txt').addEventListener('click', () => {
        const noOfImagesPerItem = layout.bonus ? 6 / collection.items.length : 1;
        const preselectedItems = layout.bonus ? collection.items : null;
        renderMixedSpecimenImages(collection, noOfImagesPerItem, preselectedItems);
    });    
};
