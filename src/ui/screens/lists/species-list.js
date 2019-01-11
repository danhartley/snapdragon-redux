import * as R from 'ramda';

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
import { listenToRangeUpdate } from 'ui/helpers/iconic-taxa-handler';

export const renderSpeciesCollectionList = (collection, readOnlyMode = false) => {

    const { config: configState, history, counter, enums, layout  } = store.getState();

    let config = R.clone(configState);

    if(lessonLogicHandler.isSkippable(collection, counter, config, layout, 'renderSpeciesCollectionList', readOnlyMode)) return;

    subscription.getByName('renderSpeciesCollectionList').forEach(sub => subscription.remove(sub));
    
    if(collection.id === 0) return;

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

        setTimeout(() => {
            const speciesCardLinks = document.querySelectorAll('.js-species-card-link span');
            const speciesCardModal = document.querySelector('#speciesCardModal .js-modal-body');
            speciesCardLinks.forEach(link => {
                link.addEventListener('click', event => {
                    const name = event.target.dataset.name;
                    renderCard(collection, true, collection.items.find(i => i.name === name), speciesCardModal);
                });
            });
            const traitCardLinks = document.querySelectorAll('.js-key-trait-link');
            traitCardLinks.forEach(link => {
                link.addEventListener('click', event => {
                    const keyTrait = event.target.dataset.keyTrait;
                    const imageUrl = event.target.dataset.url.replace('.98x68.jpg', '.260x190.jpg');              
                    renderNonTaxonCard(collection, true, keyTrait, parent, imageUrl);
                });
            });
            const taxonCardModal = document.querySelector('#taxonCardModal .js-modal-body');
            const taxonCardLinks = document.querySelectorAll('.js-taxon-card-link');
            taxonCardLinks.forEach(link => {
                link.addEventListener('click', event => {
                    const taxon = event.target.dataset.family || event.target.dataset.order;
                    const name = event.target.dataset.speciesName;
                    const rank = event.target.dataset.rank;
                    document.querySelector('#taxonCardModal .prev > span').dataset.rank = rank;
                    document.querySelector('#taxonCardModal .next > span').dataset.rank = rank;
                    renderTaxonCard(collection, true, collection.items.find(i => i.name === name), taxonCardModal, taxon, rank);
                });
            });

            document.querySelectorAll('.mushroom-icon').forEach(icon => {
                icon.innerHTML = '<svg-icon><src href="./icons/si-glyph-mushrooms.svg"/></svg>';
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
                        const lessonStateMode = counter.isLessonPaused ? 'restartLesson' : 'nextRound';
                        lessonLogicHandler.changeCollection(lessonStateMode, collection, config, history);
                    }
                    else {
                        lessonLogicHandler.changeCollection('newLesson', collection, config, history, continueLearningActionBtn);
                    }

                    actions.boundNewPage({ name: ''});

                    subscription.getByName('renderSpeciesCollectionList').forEach(sub => subscription.remove(sub));
                    subscription.getByName('renderHistory').forEach(sub => subscription.remove(sub));
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
                collection.items = utils.sortAlphabeticallyBy(collection.items, 'vernacularName');
                buildTable(collection, config, traits, enums);
                handleUserEvents();
            }
        }
        itemHandler(collection, config, counter, callback(collection, config, traits, enums));
    }
};

listenToRangeUpdate((filters, config) => {
    const { collection } = store.getState();
    renderSpeciesCollectionList(collection, false);
});

let currentIndex = 0;

const carouselControlHandler = event => {

    const { collection } = store.getState();
    
    let transition = event.target.dataset.transition;
    let modal = event.target.dataset.modal;
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
    
    switch(modal) {
        case 'speciesCardModal':
            renderCard(collection, true, nextItem, parent);
            break;
        case 'taxonCardModal':
            renderTaxonCard(collection, true, nextItem, parent, null, rank);
            break;    
    }    
};

const prev = document.querySelector('#speciesCardModal .js-prev');
const next = document.querySelector('#speciesCardModal .js-next');

if(prev) prev.addEventListener('click', carouselControlHandler);
if(next) next.addEventListener('click', carouselControlHandler);

const prevTaxon = document.querySelector('#taxonCardModal .js-prev');
const nextTaxon = document.querySelector('#taxonCardModal .js-next');

if(prevTaxon) prevTaxon.addEventListener('click', carouselControlHandler);
if(nextTaxon) nextTaxon.addEventListener('click', carouselControlHandler);