import * as R from 'ramda';

import { DOM } from 'ui/dom';
import { actions } from 'redux/actions/learn';
import { renderAnswer } from 'ui/screens/helpers-for-screens';

export const renderSpeciesCards = (templateName, item) => {

    const template = document.querySelector(`.${templateName}`);

    const rptrSpecies = template.content.querySelector('.js-rptr-species');
                    
    const languages = [ 'en', 'pt' ];
    rptrSpecies.innerHTML = R.take(6, item.multipleChoices.map(species => {        
        const vernacularNames = species.names
                .filter(name => R.contains(name.language, languages))
                .map(name => `<p>${name.vernacularName}</p>`)
                .slice(0,3)
                .join('');

                return `<div class="rectangle">
                            <div class="answer" id="${species.id}">
                                <button>${species.name}</button>
                                <div class="vernacular-name">${vernacularNames}</div>
                            </div>
                        </div>`;

    })).join('');

    const clone = document.importNode(template.content, true);

    clone.querySelectorAll('.js-rptr-species .rectangle .answer button').forEach(choice => {
        choice.addEventListener('click', event => {
            const btn = event.target;
            const answer = btn.childNodes[0].data;
            const right = 'rgb(44, 141, 86)'
            const wrong = 'rgb(141, 0, 5)';

            const response = { taxon: 'name', name: item.name, question: item.name, answer: answer};

            if(item.name === answer) {
                btn.style.color = right;
                btn.parentNode.style.background = right;
                DOM.headerTxt.innerHTML = `${renderAnswer(response)} was the correct answer! Well done.`;
                DOM.rightHeader.style.backgroundColor = 'rgb(44, 141, 86)';
            }
            else {
                btn.style.color = wrong;
                btn.parentNode.style.background = wrong;
                DOM.headerTxt.innerHTML = `Oh no! The correct answer was ${renderAnswer(response)}.`;
                DOM.rightHeader.style.backgroundColor = 'rgb(141, 0, 5)';
            }
            setTimeout(()=>{
                actions.boundMarkAnswer({ taxon: 'name', name: item.name, question: item.name, answer: answer });
            },2000);            
        });
    });

    DOM.rightBody.innerHTML = '';
    DOM.rightBody.appendChild(clone);
};
