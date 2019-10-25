import * as R from 'ramda';

import 'ui/css/groups/species-list.css';

import { store } from 'redux/store';
import { actions } from 'redux/actions/action-creators';
import { renderCard } from 'ui/screens/cards/card';
import { renderTaxonCard } from 'ui/screens/cards/taxon-card';
import { renderNonTaxonCard } from 'ui/screens/cards/non-taxon-card';
import { modalImageHandler } from 'ui/helpers/image-handlers';
import { buildTable } from 'ui/screens/lists/species-table';
import { collectionHandler } from 'ui/helpers/collection-handler';
import { speciesPendingSpinner } from 'ui/screens/lists/species-pending';
import { renderHome } from 'ui/screens/home/home';
import { videoHandler } from 'ui/screens/lists/video-handler';

export const renderSpeciesList = (collection, args) => {

    const { readOnlyMode = false, callingParentContainer, loadSpeciesCallback, isInCarousel = true } = args;

    const { config: configState, history, counter, enums: traitEnums, lesson  } = store.getState();

    let config = R.clone(configState);
    
    if(!collection.species) {
        speciesPendingSpinner(config);
    }

    config.collection = { id: collection.id };

    const openAccordionHandler = (species, accordion) => {
        
        accordion.innerHTML = `<i class="fas fa-chevron-up" data-name="${species.name}"></i>`;
        
        openSpeciesDescriptionHandler(collection, species, true);

        const closeAccordionHandler = event => {
            // remove current close accordion handler
            accordion.removeEventListener('click', closeAccordionHandler);
            // change direction of chevron       
            accordion.innerHTML = `<i class="fas fa-chevron-down" data-name="${species.name}"></i>`;
            // attach new open accordion listener
            accordion.addEventListener('click', event => {
                openAccordionHandler(species, accordion);
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
                      const species = collection.items.find(item => item.name === event.currentTarget.dataset.name);
                    openAccordionHandler(species, accordion);
                  };
                  accordion.addEventListener('click', accordionHandler);
              });

        const youtubeIcons = document.querySelectorAll('.js-youtube');
              youtubeIcons.forEach(icon => {                  
                  icon.addEventListener('click', event => {       

                    event.stopPropagation();

                    const activeIcon = event.currentTarget;
                          activeIcon.classList.add('youtube-red-fg');
                    const speciesName = activeIcon.dataset.name;

                    const species = collection.items.find(item => item.name == speciesName);   

                    openSpeciesDescriptionHandler(collection, species, true);

                    if(species && species.time) {
                        videoHandler.playVideoFrom(species.time[0]);
                    }

                    updateVideoPlayer(collection, species);
                  });
              });

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
                    buildTable(collection, { config, enums: traitEnums, overrideParent: callingParentContainer });
                    userClickHandlers();
                }
            }
            else {
                console.log('No items');
            }
        }
        const callbackWhenNoResults = () => {
            const spinner = document.querySelector('.js-species-pending i');
                  spinner.classList.remove('slow-spin');

            const feedback = document.querySelector('.js-request-feedback');
                  feedback.innerHTML = 'That search returned no matches.';

            renderHome(counter, false, true);
        }
        
        if(config.collection.id === 0) return;
        
        collectionHandler(collection, config, counter, callback, callbackWhenNoResults);
    }

    const openSpeciesDescriptionHandler = (collection, species, enableScroll = true) => {

        try {

            const { accordions } = closeOpenAccordions(species.name);

            const activeAccordion = accordions.find(accordion => accordion.dataset.name === species.name);
            
            if(activeAccordion) {
                activeAccordion.innerHTML = `<i class="fas fa-chevron-up" data-name="${species.name}"></i>`;
            }

            const activeYouTubeIcon = activeAccordion.parentElement.parentElement.querySelector('.js-youtube');
                  activeYouTubeIcon.classList.add('youtube-red-fg');

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

                    const scroll = document.querySelector('.scrollable');
                    const standardBlock = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--vhStandardBlock').replace('px', ''));
                    const unit = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--vh').replace('px', ''));
                    const top = (standardBlock * 2) + (rowHeight * (noOfRows - 1)) - ( 2 * unit);

                    console.log('unit: ', unit);
                    console.log('top: ', top);

                    scroll.scrollTop = top;
                };

                if(enableScroll) {
                    config.isLandscapeMode 
                        ? tr.previousElementSibling.scrollIntoView()
                        : scrollIntoView(tr.offsetHeight, species.snapIndex);
                }
            }
        } catch(e) {
            console.log('error on species: ', name);
            console.error('error message: ', e.message);
        }
    };

    videoHandler.onSpeciesTimeMatch((collection, species) => {
        openSpeciesDescriptionHandler(collection, species);
        updateVideoPlayer(collection, species);
    });
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

const updateVideoPlayer = (collection, species) => {
        
    const playerRecords = store.getState().videoPlayer || [];
    
    let activeLesson = playerRecords.find(p => p.collectionId === collection.id); 
    
    if(!activeLesson) {
        activeLesson = { collectionId: collection.id };
        playerRecords.push(activeLesson);
    };

    activeLesson.speciesName = species.name;
    activeLesson.pausedAt = species.time[0];

    actions.boundUpdateVideoPlayer(playerRecords);
};

const closeOpenAccordions = speciesName => {

    const accordions = Array.from(document.querySelectorAll('.js-accordion'));
    const openAccordions = accordions.filter(accordion => accordion.dataset.name !== speciesName);
        
    openAccordions.forEach(inactiveAccordion => {
        
        if (inactiveAccordion.innerHTML.indexOf('fa-chevron-up') > -1) {
            
            inactiveAccordion.click();
            inactiveAccordion.innerHTML = `<i class="fas fa-chevron-down" data-name="${speciesName}"></i>`;
            
            const inActiveYouTubeIcon = inactiveAccordion.parentElement.parentElement.querySelector('.js-youtube');
                  inActiveYouTubeIcon.classList.remove('youtube-red-fg');
        }
    });

    const parent = document.querySelector('.species-table tbody');
    const currentDescriptions = document.querySelectorAll('.species-description');
            currentDescriptions.forEach(tr => parent.removeChild(tr));

    return { accordions };
}
