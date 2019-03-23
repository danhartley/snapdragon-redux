import { utils } from 'utils/utils';
import { actions } from 'redux/actions/action-creators';
import { store } from 'redux/store';
import { returnIcon } from 'ui/helpers/icon-handler';
import { renderIcon } from 'ui/helpers/icon-handler';
import { species } from 'api/species';
import { renderTestCardTemplate } from 'ui/screens/common/test-card';
import { itemProperties } from 'ui/helpers/data-checking';
import { listenToImageSelection, listenToUserAnswer, renderMixedSpecimenImages } from 'ui/screens/multichoice/landscape/mixed-specimen/left/mixed-specimen-images';
import { renderTemplate } from 'ui/helpers/templating';
import mixedSpecimenQuestionTemplate from 'ui/screens/multichoice/landscape/mixed-specimen/right/mixed-specimen-question-template.html';

export const renderMixedSpecimenQuestion = collection => {

    const { config } = store.getState();

    const item = collection.nextItem;

    if(!item) return;

    const parent = renderTestCardTemplate(collection, { vernacularName: item.vernacularName, binomial: item.name, question: 'Find the species', help: '(Click on the matching photo.)' });
    
    const template = document.createElement('template');

    template.innerHTML = mixedSpecimenQuestionTemplate;

    const instructions = `Identify & Select`;
    const binomial = item.name;

    renderTemplate({ instructions, binomial }, template.content, parent);

    const icon = renderIcon(item, document);

    const speciesShown = document.querySelector('.js-images-names-txt');

    if(!speciesShown) return;

    const listenToImageChangeHandler = images => {        
        let speciesToShow = '';        
        utils.shuffleArray(images).forEach(image => {            
            const i = image;
            const vernacularName = itemProperties.getVernacularName(species.find(sp => sp.name === image.itemName), config);  
            const taxonIcon = returnIcon(species.find(sp => sp.name === image.itemName));            
            speciesToShow +=  `<li id="${image.itemName}">${taxonIcon}<span>${vernacularName}</span></li>`;
        });
        document.querySelector('.js-images-names-txt').innerHTML = speciesToShow;
    };

    listenToImageSelection(listenToImageChangeHandler);

    const continueLessonBtn = document.querySelector('.js-continue-lesson-btn');

    const pendingScore = {};

    listenToUserAnswer((score, scoreUpdateTimer) => {
        
        continueLessonBtn.disabled = false;
        pendingScore.score = score;
        pendingScore.scoreUpdateTimer = scoreUpdateTimer;

        score.success ? icon.classList.add('answer-success') : icon.classList.add('answer-alert');
    });

    continueLessonBtn.addEventListener('click', () => {
        window.clearTimeout(pendingScore.scoreUpdateTimer);
        actions.boundUpdateScore(pendingScore.score);
    });

    document.querySelector('.js-help-txt').addEventListener('click', () => {
        renderMixedSpecimenImages(collection) 
    });    
};
