import { utils } from 'utils/utils';
import { DOM } from 'ui/dom';
import { store } from 'redux/store';
import { returnIcon } from 'ui/helpers/icon-handler';
import { species } from 'api/species';
import { renderQuestionHeader } from 'ui/screens/common/question-header';
import { itemProperties } from 'ui/helpers/data-checking';
import { listenToImageSelection, listenToUserAnswer, renderMixedSpecimenImages } from 'ui/screens/multichoice/landscape/mixed-specimen/right/mixed-specimen-images';
import { renderTemplate } from 'ui/helpers/templating';
import mixedSpecimenQuestionTemplate from 'ui/screens/multichoice/landscape/mixed-specimen/left/mixed-specimen-question-template.html';

export const renderMixedSpecimenQuestion = collection => {

    const { config } = store.getState();

    const item = collection.nextItem;

    if(!item) return;

    const template = document.createElement('template');

    template.innerHTML = mixedSpecimenQuestionTemplate;

    const parent = DOM.rightBody;
    parent.innerHTML = '';

    const itemVernacularName = itemProperties.getVernacularName(item, config);

    const instructions = `Click on the image of the ${itemVernacularName}`

    renderTemplate({ instructions }, template.content, parent);

    renderQuestionHeader(document.querySelector('.js-question-container'), item, itemVernacularName);

    listenToImageSelection(images => {
        const names = document.querySelector('.js-images-names-txt');      
        const getVernacularName = (itemName) => {
            const vernacularName = itemProperties.getVernacularName(species.find(sp => sp.name === itemName), config);
            return vernacularName;
        };
        const getIcon = (itemName) => {
            const icon = returnIcon(species.find(sp => sp.name === itemName));
            return icon;
        };
        const itemNames = images.map(image => `<li id="${image.itemName}">${getIcon(image.itemName)} ${getVernacularName(image.itemName)}</li>`);
        names.innerHTML = '';
        utils.shuffleArray(itemNames).forEach(name => {
            names.innerHTML += name;
        });
    });

    const continueLessonBtn = document.querySelector('.js-continue-lesson-btn');

    continueLessonBtn.addEventListener('click', () => {
        window.clearTimeout(scoreUpdateTimer);
    });

    let scoreUpdateTimer;

    listenToUserAnswer((score, scoreUpdateTimer) => {
        continueLessonBtn.disabled = false;
        scoreUpdateTimer = scoreUpdateTimer;

        document.querySelectorAll('.js-images-names-txt li').forEach(name => {
            if(name.id === score.answer && score.success) {
                name.querySelector('svg').classList.add('small-icon-success');
            }
        });
    });

    document.querySelector('.js-help-txt').addEventListener('click', () => {
        renderMixedSpecimenImages(collection) 
    });    
};
