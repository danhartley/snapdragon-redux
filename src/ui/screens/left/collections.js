import { DOM } from 'ui/dom';
import { store } from 'redux/store';
import { actions } from 'redux/actions/action-creators';
import { nextLayout } from 'ui/setup/next-layout';

export const renderCollections = () => {

    DOM.moreSpecimensBtn.style.display = 'none';

    const { collections, config } = store.getState();

    const template = document.querySelector('.js-collections-template');
    const EOL = template.content.querySelector('.js-collections div:nth-child(1)');
    const collectionRptr = template.content.querySelector('.js-collections div:nth-child(2)');
    const currentCollection = template.content.querySelector('.js-collections div:nth-child(3)');

    EOL.innerHTML = `The following collections are hosted by the Encyclopedia of Life (EOL):`;

    const collectionTable = collections.map(collection => {
        return `<div class="collection">
                    <button id="${collection.id}">Start learning</button> <a class="underline-link" target="_blank" href="${collection.eol_link}">EOL</a> <span>${collection.eol_name}</span> 
                </div>`;
    }).join(' ');

    collectionRptr.innerHTML = collectionTable;

    currentCollection.innerHTML = `The current collection is '${config.currentCollectionName}'`;
    
    const clone = document.importNode(template.content, true);
    
    DOM.leftBody.innerHTML = '';
    DOM.leftBody.appendChild(clone);

    const btns = document.querySelectorAll('.collection button');

    btns.forEach(btn => btn.addEventListener('click', event => {
        actions.boundChangeCollection(event.target.id);
        nextLayout(0);
    }));
};