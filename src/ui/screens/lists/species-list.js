import * as R from 'ramda';

import 'ui/css/groups/species-list.css';

import { store } from 'redux/store';
import { actions } from 'redux/actions/action-creators';
import { subscription } from 'redux/subscriptions';
import { renderCard } from 'ui/screens/cards/card';
import { renderTaxonCard } from 'ui/screens/cards/taxon-card';
import { renderNonTaxonCard } from 'ui/screens/cards/non-taxon-card';
import { modalImageHandler } from 'ui/helpers/image-handlers';
import { lessonHandler } from 'ui/helpers/lesson-handler';
import { buildTable } from 'ui/screens/lists/species-table';
import { collectionHandler } from 'ui/helpers/collection-handler';
import { speciesPendingSpinner } from 'ui/screens/lists/species-pending';
import { renderHome } from 'ui/screens/home/home';
import { enums } from 'ui/helpers/enum-helper';
import { listenToVideoTimes } from 'ui/screens/home/home-lesson-intro';

export const renderSpeciesCollectionList = (collection, args) => {

    const { readOnlyMode = false, parent, tableParent, loadSpeciesCallback, isInCarousel = true } = args;

    const { config: configState, history, counter, enums: traitEnums, lesson  } = store.getState();

    let config = R.clone(configState);
    
    if(!collection.species) {
        speciesPendingSpinner(config);
    }

    // if(!config.guide.ready || !collection) return; // hack!, may be required!!

    config.collection = { id: collection.id };

    const chevronClickHandler = (name, chevron) => {
        // const name = event.target.dataset.name;
        chevron.innerHTML = `<i class="fab fa-youtube youtube-icon" name="${name}"></i>`;
        const species = collection.items.find(item => item.name == name);
        showSpeciesDescription(species);
        chevron.addEventListener('click', event => {                    
            // play video
        });
    };

    const handleUserEvents = () => {

        const listItemImages = document.querySelectorAll('.table-row img');

        listItemImages.forEach(itemImage => { 
            const item = collection.items.find(item => item.name === itemImage.dataset.id)
            modalImageHandler(itemImage, item, collection, config); 
        });

        const accordionIndicators = document.querySelectorAll('.js-accordion');

        accordionIndicators.forEach(chevron => {
            const accordionHandler = event => {
                chevronClickHandler(event.target.dataset.name, chevron);
            };
            chevron.addEventListener('click', accordionHandler);
        });

        const continueLearningActionBtn = document.querySelector('.js-species-list-btn-action');

        const cardModal = document.querySelector('#cardModal .js-modal-body');

        setTimeout(() => {
            
            const speciesCardLinks = document.querySelectorAll('.js-test-card-container-link span');
            speciesCardLinks.forEach((link, index) => {                
                link.addEventListener('click', event => {                    
                    const name = event.target.name;
                    document.querySelector('#cardModal .prev > span').dataset.card = 'species-card';
                    renderCard(collection, 'MODAL', collection.items.find(i => i.name === name), cardModal, isInCarousel);
                });
            });

            const traitCardLinks = document.querySelectorAll('.js-key-trait-link');
            traitCardLinks.forEach(link => {
                link.addEventListener('click', event => {
                    const keyTrait = event.target.dataset.keyTrait;
                    const url = event.target.dataset.url;
                    renderNonTaxonCard('MODAL', keyTrait, cardModal, url);
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
                    renderTaxonCard(collection, 'MODAL', collection.items.find(i => i.name === name), cardModal, taxon, rank, isInCarousel);
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

            actions.boundNewPage({ name: 'LIST'});
        
            if(history || counter.isLessonPaused) {
                continueLearningActionBtn.innerHTML = 'Continue lesson';
            }
            
            if(lesson.isLessonComplete) {
                continueLearningActionBtn.innerHTML = 'End lesson (delete data) | Choose a new lesson';
            }

            continueLearningActionBtn.addEventListener('click', event => {

                if(lesson.isLessonComplete) {
                    lessonHandler.purgeLesson();
                } else {
                    if(readOnlyMode) {
                        const lessonState = counter.isLessonPaused ? enums.lessonState.RESUME_LESSON : enums.lessonState.NEXT_ROUND;
                        lessonHandler.getLessonItems(lessonState, collection, config, history);
                    }
                    else {
                        if(counter.isLessonPaused) {
                            lessonHandler.getLessonItems(enums.lessonState.RESUME_LESSON, collection, config, history);
                        } else {
                            lessonHandler.getLessonItems(enums.lessonState.BEGIN_LESSON, collection, config, history);
                        }
                    }

                    actions.boundNewPage({ name: ''});

                    subscription.remove(subscription.getByName('renderHistory'));                    
                }            
            });
        }
    };    

    if(readOnlyMode) {
        buildTable(collection, { config, enums: traitEnums } );
        handleUserEvents();        
    }
    else {

        function callback(collection, config) {

            loadSpeciesCallback();

            if(collection.items && collection.items.length) {
                return function () {
                    buildTable(collection, { config, enums: traitEnums, overrideParent: tableParent });
                    handleUserEvents();
                }
            }

            else {
                console.log('No items');
            }
        }
        function callbackWhenNoResults() {
            const spinner = document.querySelector('.js-species-pending i');
                  spinner.classList.remove('slow-spin');

            const feedback = document.querySelector('.js-request-feedback');
                  feedback.innerHTML = 'That search returned no matches.';

            renderHome(counter, false, true);
        }
        if(config.collection.id === 0) return;
        collectionHandler(collection, config, counter, callback, callbackWhenNoResults);
    }

    const showSpeciesDescription = species => {
        
        if(!species) return;

        console.log(species.name);

        const parent = document.querySelector('.species-table tbody');
        const currentDescriptions = document.querySelectorAll('.species-description');
              currentDescriptions.forEach(tr => parent.removeChild(tr));

        const description = collection.items.find(i => i.name === species.name).description;

        if(description) {

            const item = collection.items.find(item => item.name === species.name);

            const id = item.id;
            const tr = document.querySelector(`#id_${id}`);

            const td = document.createElement('td');

            const text = document.createElement('div');
                  text.classList.add('inserted-td');
                  text.innerHTML = description.replace(/\r?\n/g, '<br />');

            const chevron = document.createElement('div');
                  chevron.classList.add('chevron');
                  chevron.innerHTML = `<i class="fas fa-chevron-up" name="${species.name}"></i>`;
                  chevron.addEventListener('click', event => {
                        const chevron = document.querySelectorAll(`i[name="${species.name}"]`)[0];
                              chevron.parentElement.innerHTML = `<i data-name="${species.name}" class="fas fa-chevron-down"></i>`;
                        const accordionHandler = event => {
                            chevronClickHandler(event.target.dataset.name, chevron);
                        };
                        chevron.addEventListener('click', accordionHandler);

                        const currentDescriptions = document.querySelectorAll('.species-description');
                            currentDescriptions.forEach(tr => parent.removeChild(tr)); 
                  });

            td.appendChild(text);
            td.appendChild(chevron);

            const insert = document.createElement('tr');
                  insert.classList.add('table-row');
                  insert.classList.add('species-description');
                  insert.appendChild(td);
            tr.parentElement.insertBefore(insert, tr.nextSibling);

            tr.previousElementSibling.scrollIntoView();
        }
    };

    listenToVideoTimes(showSpeciesDescription);
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

    parent = document.querySelector(`#${modal} .js-modal-body`);
    
    switch(card) {
        case 'species-card':
            renderCard(collection, 'MODAL', nextItem, parent, isInCarousel);
            break;
        case 'taxon-card':
            renderTaxonCard(collection, 'MODAL', nextItem, parent, null, rank, isInCarousel);
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