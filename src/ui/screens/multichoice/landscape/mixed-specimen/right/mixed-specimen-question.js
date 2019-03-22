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

    const parent = renderTestCardTemplate(collection, { vernacularName: item.vernacularName, binomial: item.binomial, question: 'Find the species', help: '(Click on the matching photo.)' });
    
    const template = document.createElement('template');

    template.innerHTML = mixedSpecimenQuestionTemplate;

    const instructions = `Identify & Select`;
    const binomial = item.name;

    renderTemplate({ instructions, binomial }, template.content, parent);

    const icon = renderIcon(item, document);

    const speciesShown = document.querySelector('.js-images-names-txt');

    listenToImageSelection(images => {        
        const getVernacularName = (itemName) => {
            const vernacularName = itemProperties.getVernacularName(species.find(sp => sp.name === itemName), config);
            return vernacularName;
        };
        const getIcon = (itemName) => {
            const icon = returnIcon(species.find(sp => sp.name === itemName));
            return icon;
        };
        const itemNames = images.map(image => `<li id="${image.itemName}">${getIcon(image.itemName)} <span>${getVernacularName(image.itemName)}</span></li>`);
        speciesShown.innerHTML = '';
        utils.shuffleArray(itemNames).forEach(name => {
            speciesShown.innerHTML += name;
        });
    });

    const continueLessonBtn = document.querySelector('.js-continue-lesson-btn');

    const pendingScore = {};

    listenToUserAnswer((score, scoreUpdateTimer) => {
        
        continueLessonBtn.disabled = false;
        pendingScore.score = score;
        pendingScore.scoreUpdateTimer = scoreUpdateTimer;

        score.success ? icon.classList.add('answer-success') : icon.classList.add('answer-alert');

        // Array.from(speciesShown.querySelectorAll('li')).filter(species => species.id !== score.question && species.id !== score.answer).forEach(s => s.style.color = 'gray');
    });

    continueLessonBtn.addEventListener('click', () => {
        window.clearTimeout(pendingScore.scoreUpdateTimer);
        actions.boundUpdateScore(pendingScore.score);
    });

    document.querySelector('.js-help-txt').addEventListener('click', () => {
        renderMixedSpecimenImages(collection) 
    });    
};
