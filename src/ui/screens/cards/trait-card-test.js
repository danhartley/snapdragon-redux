import { contains } from 'ramda';

import autocomplete from 'autocompleter';

import { actions } from 'redux/actions/action-creators';
import { itemProperties } from 'ui/helpers/data-checking';
import { renderTemplate } from 'ui/helpers/templating';
import { firestore } from 'api/firebase/firestore';
import { utils } from 'utils/utils';

import testTemplate from 'ui/screens/cards/trait-card-test-template.html';

export const renderTraitCardTest = item => {

    const init = async () => {

        const traitstoExclude = ['description', 'name', 'characteristic', 'physiology', 'uk rank'];

        const traits = item.traits;
        
        for (let [key, obj] of Object.entries(traits)) {
            if(contains(key, traitstoExclude)) {
                delete traits[key];
            }
        }

        const template = document.createElement('template');
              template.innerHTML = testTemplate;

        const parent = document.querySelector('.js-test-card-content');
              parent.innerHTML = '';

        renderTemplate({}, template.content, parent);

        document.querySelector('.js-test-card-content').classList.add('trait-line');            
        document.querySelector('.js-question-question').innerHTML = 'Trait questions';
        document.querySelector('.js-question-help').innerHTML = '(Answer at will.)';

        const feedback = document.querySelector('.js-txt-question');
        const continueBtn = document.querySelector('.js-continue-lesson-btn');
        const unit = document.querySelector('.js-unit');

        feedback.classList.add('hide-important');

        const inputQuestion = document.getElementById('input-trait-question');
        const inputAnswer = document.getElementById('input-trait-answer');

        const traitValues = await getUnits();

        const initKeyAutocomplete = (inputQuestion, traits) => {

            let keys = [];

            for (let [key, obj] of Object.entries(traits)) {
                keys.push({label: key, value: key});
            }
    
            keys = utils.sortAlphabeticallyBy(keys, 'label');
    
            initAutocomplete(inputQuestion, keys);
        };

        initKeyAutocomplete(inputQuestion, traits);

        inputQuestion.focus();

        inputQuestion.addEventListener('keypress', event => {
            if(event.keyCode == 13) {
                getAnswers(inputQuestion.value);
            }
        });

        inputQuestion.addEventListener('keydown', event => {
            if(event.keyCode == 9) {
                const highlightedText = document.querySelector('.selected');
                if(highlightedText || hasUnits) {
                    inputQuestion.value = highlightedText.innerText;
                    getAnswers(inputQuestion.value);
                }   
            }
        });

        let answers, hasUnits;

        const getAnswers = question => {

            answers = traits[question].value;            
            const answerSet = [];
            hasUnits = traits[question].unit ? true : false;
            
            let traitKeyValues = traitValues[utils.toCamelCase(question)];

            if(!traitKeyValues) {
                traitKeyValues = traitValues[itemProperties.getRootTraitValue(utils.toCamelCase(question), 'start')];
            }
    
            if(!traitKeyValues) {
                traitKeyValues = traitValues[itemProperties.getRootTraitValue(utils.toCamelCase(question), 'end')];
            }

            if(!traitKeyValues) {
                inputAnswer.focus();

                if(traits[question].unit) {
                    inputAnswer.setAttribute('placeholder', 'Enter a value');
                    unit.innerHTML = traits[question].unit;
                }
                
                return;
            }

            for (let [key, obj] of Object.entries(traitKeyValues)) {
                if(!contains(key, ['name', 'help', 'type'])) {
                    answerSet.push({label: obj.toLowerCase(), value: obj.toLowerCase()});
                }                
            }
            initAutocomplete(inputAnswer, answerSet);

            inputAnswer.focus();
        };

        const checkAnswerBtn = document.querySelector('.js-check-answer-btn');
        const continueLessonBtn = document.querySelector('.js-continue-lesson-btn');

        inputAnswer.addEventListener('keypress', event => {
            checkAnswerBtn.removeAttribute('disabled');
        });
        
        inputAnswer.addEventListener('keydown', event => {
            if(event.keyCode == 9) { //tab
                const highlightedText = document.querySelector('.selected');
                if(highlightedText) {
                    inputAnswer.value = highlightedText.innerText;
                    checkAnswerBtn.removeAttribute('disabled');
                }
            }
        });

        checkAnswerBtn.addEventListener('click', e => {
            continueLessonBtn.removeAttribute('disabled');
            checkAnswer();
        });

        const markScore = (answer, answers) => {
                    
            let success;

            if(hasUnits) {
                let correctAnswer = answers[0];
                let bottomOfRange, topOfrange;
                if(correctAnswer.indexOf('-') > -1) {
                    const range = correctAnswer.split('-');
                    bottomOfRange = range[0];
                    topOfRange = range[1];
                }
                correctAnswer = correctAnswer.replace('>', '').replace('<', '');
                correctAnswer = parseInt(correctAnswer);
                bottomOfRange = correctAnswer - (.1*correctAnswer);
                topOfrange = correctAnswer + (.1*correctAnswer);
                success = answer>= bottomOfRange && answer <= topOfrange;

            } else {
                success = R.contains(answer.toLowerCase(), answers.map(a => a.toLowerCase()));
            }

            return success;
        };

        const checkAnswer = () => {

            const answer = inputAnswer.value;            

            const score = {
                answer,
                question: answers,
                success: markScore(answer, answers),
                unit: unit ? unit.innerHTML : ''
            };

            actions.boundUpdateTraitScore(score);

            delete traits[inputQuestion.value]; // need to check against scores on refresh (or not?)

            inputQuestion.value = '';
            inputAnswer.value = '';
            inputAnswer.setAttribute('placeholder', 'Trait values will appear');
            unit.innerHTML = '';

            feedback.classList.remove('hide-important');
            
            if(score.success) {                
                feedback.innerHTML = hasUnits
                    ?  `<p>Correct. ${score.answer}${score.unit} is close enough. The answer was ${score.question[0]}${score.unit}.</p><p>Try another.</p>`
                    :  `<p>You answered correctly.</p><p>Try another.</p>`;
            } else {
                feedback.innerHTML = score.question.length === 1
                    ? `<p>You answered incorrectly. The correct answer was ${score.question[0].toLowerCase()}.</p>`
                    : `<p>You answered incorrectly. You could have chosen from ${score.question.map(a => a.toLowerCase()).join(', ')}.</p>`;  
            }
        
            feedback.innerHTML += Object.entries(traits).length === 0
                ? '<p>There are no more questions.</p>'
                : `<p>There are ${Object.entries(traits).length} remaining questions.</p>`;
            

            continueBtn.remove('disabled');

            initKeyAutocomplete(inputQuestion, traits);

            inputQuestion.focus();
        };
    };

    init();

};

const initAutocomplete = (input, options)  => {
    autocomplete({
        input: input,
        fetch: function(text, update) {
            text = text.toLowerCase();
            const suggestions = options.filter(n => n.value.toLowerCase().startsWith(text));
            update(suggestions);
        },
        onSelect: function(item) {
            input.value = item.label;
        },
        minLength: 0,
        debounceWaitMs: 200,
        className: 'autocomplete-options-container'
    });
};