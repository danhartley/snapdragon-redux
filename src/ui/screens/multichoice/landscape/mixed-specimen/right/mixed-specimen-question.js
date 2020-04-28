import * as R from 'ramda';

import { lessonStateHandler } from 'ui/screens/lists/lesson-state-handler';
import { utils } from 'utils/utils';
import { store } from 'redux/store';
import { returnIcon } from 'ui/helpers/icon-handler';
import { firestore } from 'api/firebase/firestore';
import { bindScore } from 'ui/helpers//score-handler';
import { renderTestCardTemplate } from 'ui/screens/cards/test-card';
import { itemProperties } from 'ui/helpers/data-checking';
import { listenToImageSelection, listenToUserAnswer, renderMixedSpecimenImages } from 'ui/screens/multichoice/landscape/mixed-specimen/left/mixed-specimen-images';
import { renderMixedSpecimenImagesAndQuestion } from 'ui/screens/multichoice/portrait/mixed-specimen/mixed-specimen-combined';
import { renderTemplate } from 'ui/helpers/templating';

import mixedSpecimenQuestionTemplate from 'ui/screens/multichoice/landscape/mixed-specimen/right/mixed-specimen-question-template.html';

export const renderMixedSpecimenQuestion = (collection, bonusLayout) => {

    const { config, layout, userAction } = store.getState();

    // if(lessonStateHandler.overrideLesson(userAction, config)) { return; }

    renderMixedSpecimenImagesAndQuestion(collection);
    
    return;

    const item = R.clone(collection.nextItem);

    let question = config.isPortraitMode ? 'Slide to ID this species' : 'Identify this species';
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

    const subheader = document.querySelector('.mixed-specimen-container > div > span:nth-child(1)');
          subheader.innerHTML = `Click the picture of <span>${item.vernacularName} </span> from among those on the left.`;

    const listenToImageChangeHandler = async images => {        

        const uniqueSpecies = [ ...new Set(utils.shuffleArray(images).map(i => i.itemName)) ];

        const speciesList = document.querySelector('.js-images-names-txt');

        if(!speciesList) return;

        speciesList.innerHTML = "";

        const speciesItems = await Promise.all(uniqueSpecies.map(async species => {

            const imageItem = await firestore.getSpeciesByName(species);
            const vernacularName = itemProperties.getVernacularName(imageItem, config);
            const taxonIcon = returnIcon(imageItem);

            return `<li id="${species}">${taxonIcon}<span>${vernacularName}</span><span class="binomial margin-left">${imageItem.name}</li>`;
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
        bindScore(pendingScore.score);        
    });

    document.querySelector('.js-help-txt').addEventListener('click', () => {
        const noOfImagesPerItem = layout.bonus ? 6 / collection.items.length : 1;
        const preselectedItems = layout.bonus ? collection.items : null;
        // renderMixedSpecimenImages(collection, noOfImagesPerItem, preselectedItems, true);
    });    
};
