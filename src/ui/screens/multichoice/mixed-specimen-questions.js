import { DOM } from 'ui/dom';
import { store } from 'redux/store';
import { elem } from 'ui/helpers/class-behaviour';
import { actions } from 'redux/actions/action-creators';
import { renderTemplate } from 'ui/helpers/templating';
import mixedSpecimenTemplate from 'ui/screens/multichoice/mixed-specimen-questions-template.html';
import questionTemple from 'ui/screens/common/question-template.html';
import { screenShare } from 'ui/screens/multichoice/mixed-specimen-shared';
import { simpleScoreHandler } from 'ui/helpers/handlers';

export const renderMixedSpecimenQuestions = collection => {

    const item = collection.nextItem;

    if(!item) return;

    const { config, lessonPlan, layout, score } = store.getState();

    const template = document.createElement('template');

    template.innerHTML = mixedSpecimenTemplate;

    const images = screenShare.getRandomImages(item);

    const question1 = `Can you identify which of the 4 species on the left is ${item.name}? (Click on an image to view more examples.)`;
    const question2 = `Click on the matching image below.`;

    let parent = DOM.rightBody;
    parent.innerHTML = '';

    renderTemplate({ images, question1, question2 }, template.content, parent);

    template.innerHTML = questionTemple;

    parent = document.querySelector('.right-body .snapdragon-container');

    const context = { question: 'Find the species' };

    renderTemplate( context, template.content, parent);

    const renderAnswer = (score, scoreUpdateTimer) => {
        const answer = document.querySelector('.js-answer');
        answer.innerHTML = 'Continue';
        answer.style.display = 'block';
        answer.style.cursor = 'pointer';    
        answer.addEventListener('click', () => {
            window.clearTimeout(scoreUpdateTimer);
            actions.boundUpdateScore(score);
        });
        document.querySelector('.js-question').style.display = 'none';
    }

    const scoreHandler = (score, question, answer, config) => {
        const _score = { ...score, itemId: item.id, question, answer, binomial: item.name, questionCount: lessonPlan.questionCount, layoutCount: lessonPlan.layoutCount, points: layout.points};
        simpleScoreHandler(_score, config, renderAnswer);
    };

    const imageLayers = document.querySelectorAll('.question-images .layer');

    imageLayers.forEach((imageLayer) => {
        imageLayer.addEventListener('click', event => {
            const selectedIndex = imageLayer.children[0].innerHTML;
            const selectedName = event.target.dataset.itemname || event.target.parentElement.dataset.itemname;
            const isCorrectAnswer = selectedName === item.name;
            imageLayer.children[0].innerHTML = selectedName;
            imageLayer.setAttribute('style', 'font-size: 1em;');
            if(isCorrectAnswer) {
                elem.addClassToSelected(imageLayers, imageLayer, ['snap-success', 'snap-alert'], 'snap-success' );
            } else {
                elem.addClassToSelected(imageLayers, imageLayer, ['snap-success', 'snap-alert'], 'snap-alert' );
            }
            screenShare.selectImage(selectedIndex, selectedName, isCorrectAnswer);
            const question = item.name;
            const answer = selectedName;
            scoreHandler(score, question, answer, config);
        });
    });
};
