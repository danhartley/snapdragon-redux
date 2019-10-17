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
import { videoPlayer } from 'ui/screens/lists/video-handler';

export const renderSpeciesCollectionList = (collection, args) => {

    const { readOnlyMode = false, parent, tableParent, loadSpeciesCallback, isInCarousel = true } = args;

    const { config: configState, history, counter, enums: traitEnums, lesson  } = store.getState();

    let config = R.clone(configState);
    
    if(!collection.species) {
        speciesPendingSpinner(config);
    }

    // if(!config.guide.ready || !collection) return; // hack!, may be required!!

    config.collection = { id: collection.id };
    

    const openAccordionClickHandler = (name, accordion) => {
        
        accordion.innerHTML = `<i class="fas fa-chevron-up" data-name="${name}"></i>`;
        
        openSpeciesDescription(name, true);

        const closeAccordionHandler = event => {
            // remove current open accordion handler
            accordion.removeEventListener('click', closeAccordionHandler);
            // change direction of chevron       
            accordion.innerHTML = `<i class="fas fa-chevron-down" data-name="${name}"></i>`;
            // attach new open accordion listener
            accordion.addEventListener('click', event => {
                openAccordionClickHandler(name, accordion);
            });
            // remove the species description - handled in group action
            const description = document.querySelector('.species-description');
            if(description) {
                description.parentNode.removeChild(description);
            }
        };

        // attach close accordion handler
        accordion.addEventListener('click', closeAccordionHandler);
    };

    const userClickHandlers = () => {

        const listItemImages = document.querySelectorAll('.table-row img');

              listItemImages.forEach(itemImage => { 
                  const item = collection.items.find(item => item.name === itemImage.dataset.id)
                  modalImageHandler(itemImage, item, collection, config); 
              });

        const accordions = document.querySelectorAll('.js-accordion');

              accordions.forEach(accordion => {
                  const accordionHandler = event => {
                    openAccordionClickHandler(event.target.dataset.name, accordion);
                  };
                  accordion.addEventListener('click', accordionHandler);
              });

        const youtubeIcons = document.querySelectorAll('.js-youtuube i');

              youtubeIcons.forEach(icon => {                  
                  icon.addEventListener('click', event => {       
                    event.stopPropagation();
                    event.preventDefault();
                    youtubeIcons.forEach(icon => {
                        console.log(icon.classList);
                        icon.classList.remove('youtube-red-fg');
                    });
                    const activeIcon = event.target;
                          activeIcon.classList.add('youtube-red-fg');
                    const name = activeIcon.dataset.name;
                    const species = collection.items.find(item => item.name == name);   
                    if(species && species.time) {
                        videoPlayer.playVideoFrom(species.time[0]);
                    }
                  });
              });

        const continueLearningActionBtn = document.querySelector('.js-species-list-btn-action');

        const cardModal = document.querySelector('#cardModal .js-modal-body');

        setTimeout(() => {
            
            const speciesCardLinks = document.querySelectorAll('.js-test-card-container-link span');
                  speciesCardLinks.forEach((link, index) => {                
                      link.addEventListener('click', event => {                    
                        const name = event.target.dataset.name;
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

        // if(continueLearningActionBtn) {

        //     actions.boundNewPage({ name: 'LIST'});
        
        //     if(history || counter.isLessonPaused) {
        //         continueLearningActionBtn.innerHTML = 'Continue lesson';
        //     }
            
        //     if(lesson.isLessonComplete) {
        //         continueLearningActionBtn.innerHTML = 'End lesson (delete data) | Choose a new lesson';
        //     }

        //     continueLearningActionBtn.addEventListener('click', event => {

        //         if(lesson.isLessonComplete) {
        //             lessonHandler.purgeLesson();
        //         } else {
        //             if(readOnlyMode) {
        //                 const lessonState = counter.isLessonPaused ? enums.lessonState.RESUME_LESSON : enums.lessonState.NEXT_ROUND;
        //                 lessonHandler.getLessonItems(lessonState, collection, config, history);
        //             }
        //             else {
        //                 if(counter.isLessonPaused) {
        //                     lessonHandler.getLessonItems(enums.lessonState.RESUME_LESSON, collection, config, history);
        //                 } else {
        //                     lessonHandler.getLessonItems(enums.lessonState.BEGIN_LESSON, collection, config, history);
        //                 }
        //             }

        //             actions.boundNewPage({ name: ''});

        //             subscription.remove(subscription.getByName('renderHistory'));                    
        //         }            
        //     });
        // }
    };    

    if(readOnlyMode) {
        buildTable(collection, { config, enums: traitEnums } );
        userClickHandlers();        
    }
    else {

        function callback(collection, config) {

            loadSpeciesCallback();

            if(collection.items && collection.items.length) {
                return function () {
                    buildTable(collection, { config, enums: traitEnums, overrideParent: tableParent });
                    userClickHandlers();
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

    const openSpeciesDescription = (name, enableScroll = true) => {

        try {

            let parent = document.querySelector('.species-table tbody');
            
            const accordions = Array.from(document.querySelectorAll('.js-accordion'));
            const inactiveAccordions = accordions.filter(accordion => accordion.dataset.name !== name);

                //trigger close event on any accordions that might be open
                inactiveAccordions.forEach(inactiveAccordion => {                
                    if(inactiveAccordion.innerHTML.indexOf('fa-chevron-up') > -1) {
                        inactiveAccordion.click();
                        inactiveAccordion.innerHTML = `<i class="fas fa-chevron-down" data-name="${name}"></i>`;
                        const inActiveYouTubeIcon = inactiveAccordion.parentElement.parentElement.querySelector('.js-youtuube');
                              inActiveYouTubeIcon.classList.remove('youtube-red-fg');
                    }
                });

            const activeAccordion = accordions.find(accordion => accordion.dataset.name === name);
                if(activeAccordion) {
                    activeAccordion.innerHTML = `<i class="fas fa-chevron-up" data-name="${name}"></i>`;
                }

            const activeYouTubeIcon = activeAccordion.parentElement.parentElement.querySelector('.js-youtuube');
                  activeYouTubeIcon.classList.add('youtube-red-fg');

            // remove any descriptions that might be open
            let currentDescriptions = document.querySelectorAll('.species-description');
                currentDescriptions.forEach(tr => parent.removeChild(tr));

            const species = collection.items.find(i => i.name === name);

            let description = species.description;
                description = description || species.traits.description.value[0];

            if(description) {

                const id = species.id;
                const tr = document.querySelector(`#id_${id}`);

                const td = document.createElement('td');

                const text = document.createElement('div');
                    text.classList.add('inserted-td');
                    text.innerHTML = description.replace(/\r?\n/g, '<br />');

                td.appendChild(text);

                const insert = document.createElement('div');
                    insert.classList.add('table-row');
                    insert.classList.add('species-description');
                    insert.appendChild(td);
                tr.parentElement.insertBefore(insert, tr.nextSibling);

                const scrollIntoView = (rowHeight, noOfRows) => {
                    const video = document.querySelector('.video');                    
                    const scroll = document.querySelector('.scrollable');
                    
                    // scroll.scrollTop = 0;

                    console.clear();

                    console.log('video.offsetHeight: ', video.clientHeight); 

                    const runningBlock = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--vhRunningBlock').replace('px', ''));
                    const standardBlock = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--vhStandardBlock').replace('px', ''));
                    const vh = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--vh').replace('px', ''));
                    const iframeBorder = 8;

                    //clientHeight
                    //offsetHeight
                    //scrollHeight

                    console.log('number of rows: ', noOfRows);
                    scroll.scrollTop = (rowHeight * (noOfRows - 1)) + (3*standardBlock) -8; 

                    // 1. plain 197

                    console.log('scroll.scrollTop: ', scroll.scrollTop);

                    // scroll.scrollTop = video.offsetHeight + (rowHeight * (noOfRows - 1)) - (vh * 5) +8; 
                };

                if(enableScroll) {
                    config.isLandscapeMode 
                        ? tr.previousElementSibling.scrollIntoView()
                        : scrollIntoView(tr.offsetHeight, species.snapIndex);
                }
            }
        } catch(e) {
            console.log(name);
            console.error(e.message);
        }
    };

    videoPlayer.listenToVideoTimes(openSpeciesDescription);
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