import { DOM } from 'ui/dom';
import { actions } from 'redux/actions/learn';
import * as R from 'ramda';

export const renderSpeciesCards = (screen, answers, correctAnswer) => {

    const template = document.querySelector(`.${screen.template}`);

    const rptrSpecies = template.content.querySelector('.js-rptr-species');
                    
    const languages = [ 'en', 'pt' ];
        rptrSpecies.innerHTML = answers.map(species => {
        const vernacularNames = species.names
                .filter(name => R.contains(name.language, languages))
                .map(name => `<p>${name.vernacularName}</p>`)
                .slice(0,5)
                .join(''); 

                return `<div class="rectangle">
                            <div class="answer" id="${species.id}">
                                <button>${species.name}</button>
                                <div class="vernacular-name">${vernacularNames}</div>
                            </div>
                        </div>`;
    }).join('');

    const clone = document.importNode(template.content, true);

    clone.querySelectorAll('.js-rptr-species .rectangle .answer button').forEach(screen => {
        screen.addEventListener('click', event => {                    
            actions.boundMarkAnswer({ name: correctAnswer, question: correctAnswer, answer: event.target.childNodes[0].data });
        });
    });

    DOM.rightBody.innerHTML = '';
    DOM.rightBody.appendChild(clone);
};
