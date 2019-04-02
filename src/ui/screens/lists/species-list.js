import * as R from 'ramda';

import 'ui/css/groups/species-list.css';

import { utils } from 'utils/utils';
import { store } from 'redux/store';
import { actions } from 'redux/actions/action-creators';
import { subscription } from 'redux/subscriptions';
import { renderCard } from 'ui/screens/cards/card';
import { renderTaxonCard } from 'ui/screens/cards/taxon-card';
import { renderNonTaxonCard } from 'ui/screens/cards/non-taxon-card';
import { modalImageHandler } from 'ui/helpers/image-handlers';
import { lessonLogicHandler } from 'ui/helpers/lesson-handlers';
import { getTraits } from 'api/traits/traits';
import { buildTable } from 'ui/screens/lists/species-table-no-scores';
import { itemHandler } from 'ui/helpers/item-handler';
import { speciesPendingSpinner } from 'ui/screens/lists/species-pending';

export const renderSpeciesCollectionList = (collection, readOnlyMode = false) => {

    const { config: configState, history, counter, enums  } = store.getState();

    let config = R.clone(configState);
    
    speciesPendingSpinner(config);

    if(!config.guide.ready || !collection) return;

    config.collection = { id: collection.id };

    const handleUserEvents = () => {
        const headerCheckbox = document.querySelector(".table-header #inputCheckAll");
        const itemCheckboxes = document.querySelectorAll(".table-row .custom-control-input");

        let hasCollectionChanged = false;

        if(headerCheckbox) {
            if(readOnlyMode) {
                headerCheckbox.disabled = true;
            } else {
                headerCheckbox.addEventListener('click', event => {
                    hasCollectionChanged = true;
                    if(headerCheckbox.checked) {
                        itemCheckboxes.forEach(checkbox => {
                            checkbox.checked = true;
                        });        
                        collection.items.forEach(item => item.isDeselected = false);
                    } else { 
                        itemCheckboxes.forEach(checkbox => {
                            checkbox.checked = false;
                        });                
                        collection.items.forEach(item => item.isDeselected = true);
                    }                
                    actions.boundChangeCollectionItems(collection.items);
                });
            }
        }

        itemCheckboxes.forEach(checkbox => {
            if(readOnlyMode) { 
                checkbox.disabled = true;
            } else {     
                checkbox.addEventListener('click', event => {
                    hasCollectionChanged = true;
                    const name = checkbox.getAttribute('name');
                    const item = collection.items.find(item => item.name === name);
                    item.isDeselected = !checkbox.checked;
                    actions.boundChangeCollectionItems(collection.items);
                });
            }
        });

        const listItemImages = document.querySelectorAll('.table-row img');

        listItemImages.forEach(itemImage => { 
            const item = collection.items.find(item => item.name === itemImage.dataset.id)
            modalImageHandler(itemImage, item, collection, config); 
        });    

        const continueLearningActionBtn = document.querySelector('.js-species-list-btn-action');

        const cardModal = document.querySelector('#cardModal .js-modal-body');

        setTimeout(() => {
            
            const speciesCardLinks = document.querySelectorAll('.js-species-card-link span');
            speciesCardLinks.forEach(link => {
                link.addEventListener('click', event => {
                    const name = event.target.dataset.name;
                    document.querySelector('#cardModal .prev > span').dataset.card = 'species-card';
                    document.querySelector('#cardModal .next > span').dataset.card = 'species-card';
                    renderCard(collection, 'MODAL', collection.items.find(i => i.name === name), cardModal);
                });
            });

            const traitCardLinks = document.querySelectorAll('.js-key-trait-link');
            traitCardLinks.forEach(link => {
                link.addEventListener('click', event => {
                    const keyTrait = event.target.dataset.keyTrait;
                    // const imageUrl = event.target.dataset.url.replace('.98x68.jpg', '.260x190.jpg');              
                    renderNonTaxonCard(collection, 'MODAL', keyTrait, cardModal, imageUrl);
                });
            });

            const taxonCardLinks = document.querySelectorAll('.js-taxon-card-link');
            taxonCardLinks.forEach(link => {
                link.addEventListener('click', event => {
                    const taxon = event.target.dataset.family || event.target.dataset.order;
                    const name = event.target.dataset.name;
                    const rank = event.target.dataset.rank;
                    document.querySelector('#cardModal .prev > span').dataset.rank = rank;
                    document.querySelector('#cardModal .prev > span').dataset.card = 'taxon-card';
                    document.querySelector('#cardModal .next > span').dataset.rank = rank;
                    document.querySelector('#cardModal .next > span').dataset.card = 'taxon-card';
                    renderTaxonCard(collection, 'MODAL', collection.items.find(i => i.name === name), cardModal, taxon, rank);
                });
            });

            document.querySelectorAll('.mushroom-icon').forEach(icon => {
                icon.innerHTML = '<svg-icon class="si-glyph-mushrooms"><src href="./icons/si-glyph-mushrooms.svg"/></svg>';
            });

            const nthChild = config.isLandscapeMode ? 5 : 3;
            const taxonIcons = document.querySelectorAll(`.table-row.js-list-item td:nth-child(${nthChild}) > span`);

            if(!history) return;

            const noWrongAnswersForThisSpecies = [];
            history.scores.map(score => score.failsTotals).forEach(totals => {
                for (let [key, anyWrongAnwers] of Object.entries(totals)) {
                    if(anyWrongAnwers == false) {
                        noWrongAnswersForThisSpecies.push(parseInt(key));
                    }
                }
            });

            taxonIcons.forEach(icon => {
                if(R.contains(parseInt(icon.id), noWrongAnswersForThisSpecies)) {
                    icon.classList.add('correct');
                }
            });
        });

        // Portrait mode only

        if(continueLearningActionBtn) {
        
            if(history || counter.isLessonPaused) {
                continueLearningActionBtn.innerHTML = 'Continue lesson';
            }
            
            if(collection.isLessonComplete) {
                continueLearningActionBtn.innerHTML = 'End lesson (delete data) | Choose a new lesson';
            }

            continueLearningActionBtn.addEventListener('click', event => {

                if(collection.isLessonComplete) {
                    lessonLogicHandler.purgeLesson();
                } else {
                    if(readOnlyMode) {
                        const lessonStateMode = counter.isLessonPaused ? 'restart-lesson' : 'next-round';
                        lessonLogicHandler.changeCollection(lessonStateMode, collection, config, history);
                    }
                    else {
                        lessonLogicHandler.changeCollection('new-lesson', collection, config, history, continueLearningActionBtn);
                    }

                    actions.boundNewPage({ name: ''});

                    subscription.remove(subscription.getByName('renderHistory'));
                }            
            });
        }
    };    

    const traits = getTraits(enums);

    if(readOnlyMode) {
        buildTable(collection, config, traits, enums);
        handleUserEvents();
    }
    else {      
        function callback(collection, config, traits, enums) {
            return function () {
                collection.items = utils.sortBy(collection.items, 'observationCount', 'desc');
                buildTable(collection, config, traits, enums);
                handleUserEvents();
                const { counter } = store.getState();
                listeners.forEach(listener => listener(counter, collection.items.length));
            }
        }
        itemHandler(collection, config, counter, callback(collection, config, traits, enums));
    }
};

const listeners = [];

export const listenToSpeciesCollectionListenReady = listener => { 
    listeners.push(listener);
  };
  

let currentIndex = 0;

const carouselControlHandler = event => {

    const { collection } = store.getState();
    
    let transition = event.target.dataset.transition;
    let modal = event.target.dataset.modal;
    let card = event.target.dataset.card;
    let rank =  event.target.dataset.rank;

    switch(transition) {
        case 'prev':
            currentIndex--;
            currentIndex = currentIndex === -1 ? collection.items.length -1 : currentIndex;
            break;
        case 'next':
            currentIndex++;
            currentIndex = currentIndex === collection.items.length -1 ? 0 : currentIndex;
            break;
    }

    let nextItem = collection.items.find((item,index) => index === currentIndex);
    const parent = document.querySelector(`#${modal} .js-modal-body`);
    
    switch(card) {
        case 'species-card':
            renderCard(collection, 'MODAL', nextItem, parent);
            break;
        case 'taxon-card':
            renderTaxonCard(collection, 'MODAL', nextItem, parent, null, rank);
            break;    
    }    
};

const prev = document.querySelector('#cardModal .js-prev');
const next = document.querySelector('#cardModal .js-next');

if(prev) prev.addEventListener('click', carouselControlHandler);
if(next) next.addEventListener('click', carouselControlHandler);

const prevTaxon = document.querySelector('#cardModal .js-prev');
const nextTaxon = document.querySelector('#cardModal .js-next');

if(prevTaxon) prevTaxon.addEventListener('click', carouselControlHandler);
if(nextTaxon) nextTaxon.addEventListener('click', carouselControlHandler);