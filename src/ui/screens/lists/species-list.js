import { contains } from 'ramda';

import { enums } from 'ui/helpers/enum-helper';
import { utils } from 'utils/utils';
import { DOM } from 'ui/dom';
import { store } from 'redux/store';
import { renderCard } from 'ui/screens/cards/card';
import { renderTaxonCard } from 'ui/screens/cards/taxon-card';
import { renderNonTaxonCard } from 'ui/screens/cards/non-taxon-card';
import { modalImageHandler } from 'ui/helpers/image-handler';
import { buildTable } from 'ui/screens/lists/species-table';
import { videoHandler } from 'ui/screens/lists/video-handler';
import { videoSetup } from 'ui/screens/home/home-lesson-intro-video';
import { lessonStateHandler } from 'ui/screens/lists/lesson-state-handler';
import { onSpeciesChangeHandler, openNoteHandler } from 'ui/screens/lists/species-list-definition-insert';

export const renderSpeciesList = (lesson, args) => {

  const init = async () => {

    const { callingParentContainer, isInCarousel = false } = args;

    const { config, history, enums: traitEnums, collections  } = store.getState();    

    // to ensure we have latest item list if species has been added
    const collection = collections.find(c => c.id === lesson.id);

    const openAccordionHandler = (species, accordion) => {
        
        accordion.innerHTML = `<i class="fas fa-chevron-up" data-name="${species.name}"></i>`;
        
        openSpeciesDescriptionHandler(collection, species, true, false);

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
                  const item = collection.items.find(item => item.name === itemImage.dataset.itemName)
                  modalImageHandler(itemImage, item, collection, config); 
              });

        const accordions = document.querySelectorAll('.js-accordion');

              accordions.forEach(accordion => {
                  const accordionHandler = event => {
                      const species = collection.items.find(item => item.name === event.currentTarget.dataset.name);
                      if(species) {
                        openAccordionHandler(species, accordion);
                      }
                  };
                  accordion.addEventListener('click', accordionHandler);
              });

        const youtubeIcons = document.querySelectorAll('.js-youtube');
              youtubeIcons.forEach(icon => {                  
                  icon.addEventListener('click', event => {       

                    event.stopPropagation();

                    const activeIcon = event.currentTarget;
                          activeIcon.classList.add('youtube-green-fg');
                    const speciesName = activeIcon.dataset.name;

                    const species = { ...collection.items.find(item => item.name == speciesName), ...collection.species.find(item => item.name == speciesName) };


                    openSpeciesDescriptionHandler(collection, species, true);

                    if(species && species.time) {

                        videoHandler.isVideoPlayerReady(collection.video.id)
                            ? videoHandler.playVideoFrom(species.time[0])
                            : videoSetup(collection, store.getState().videoPlayer || [], DOM.rightBody, species.time[0]);
                    }

                    updateVideoPlayer(collection, species);
                  });
              });

        const cardModal = document.querySelector('#cardModal .js-modal-body');

        setTimeout(() => {
            
            const speciesCardLinks = document.querySelectorAll('.js-test-card-container-link');
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
                        renderTaxonCard(collection, 'MODAL', collection.items.find(i => i.taxonomy[rank] === name), cardModal, taxon, rank, isInCarousel);
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
                if(contains(parseInt(icon.id), noWrongAnswersForThisSpecies)) {
                    icon.classList.add('correct');
                }
            });
        });
    };

    if(!!collection.notes && !!collection.notes.time) {
        collection.notes.forEach(n => sp.firstTime = n.time[0]);
        collection.notes = utils.sortBy(collection.notes, 'firstTime', 'asc');
    }

    const table = await buildTable(collection, { config, enums: traitEnums, overrideParent: callingParentContainer });

    if(!table.isReady) return;

    userClickHandlers();

    const btnBeginLesson = callingParentContainer.querySelector('.js-btn-current-lesson-begin');
          btnBeginLesson.addEventListener('click', () => {
            lessonStateHandler.changeRequest({
                requestType: enums.lessonState.BEGIN_OR_RESUME_LESSON,
                requestArgs: {
                  id: collection.id
                }
              });
          });

    const openSpeciesDescriptionHandler = (collection, species, enableScroll = true, activateYoutubeIcon = true) => {

        try {

            const parent = document.getElementById('insertParent');
            if(parent) parent.remove();

            const { accordions } = closeOpenAccordions(species.name);

            const activeAccordion = accordions.find(accordion => accordion.dataset.name === species.name);
            
            if(activeAccordion) {
                activeAccordion.innerHTML = `<i class="fas fa-chevron-up" data-name="${species.name}"></i>`;

                if(activateYoutubeIcon) {
                  const activeYouTubeIcon = activeAccordion.parentElement.parentElement.querySelector('.js-youtube');
                        activeYouTubeIcon.classList.add('youtube-green-fg');
              }
            }

            // if(activateYoutubeIcon) {
            //     const activeYouTubeIcon = activeAccordion.parentElement.parentElement.querySelector('.js-youtube');
            //           activeYouTubeIcon.classList.add('youtube-green-fg');
            // }

            let description = species.description;
                description = !!description ? description : (species.traits.description && species.traits.description.value) ? species.traits.description.value[0] : '';

            if(description) {

                const id = species.id || species.eolId;
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

                    scroll.scrollTop = top;
                };

                if(enableScroll) {
                    config.isLandscapeMode 
                        ? tr.previousElementSibling.scrollIntoView()
                        : scrollIntoView(tr.offsetHeight, species.snapIndex);
                }
            }
        } catch(e) {
          logError(openSpeciesDescriptionHandler, e);
        }
    };

    videoHandler.onSpeciesTimeMatch((collection, species) => {

        openSpeciesDescriptionHandler(collection, species);
        updateVideoPlayer(collection, species);
        onSpeciesChangeHandler(species);
    });

    videoHandler.onNoteTimeMatch((collection, note) => {        
        openNoteHandler(note, videoHandler.getPlayerTime());
    });
  };

  init();
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
    activeLesson.pausedAt = species.time ? species.time[0] : 0;

    videoHandler.saveVideoState(playerRecords);    
};

const closeOpenAccordions = speciesName => {

    const accordions = Array.from(document.querySelectorAll('.js-accordion'));
    const openAccordions = accordions.filter(accordion => accordion.dataset.name !== speciesName);
        
    openAccordions.forEach(inactiveAccordion => {
        
        if (inactiveAccordion.innerHTML.indexOf('fa-chevron-up') > -1) {
            
            inactiveAccordion.click();
            inactiveAccordion.innerHTML = `<i class="fas fa-chevron-down" data-name="${speciesName}"></i>`;
            
            const inActiveYouTubeIcon = inactiveAccordion.parentElement.parentElement.querySelector('.js-youtube');
                  inActiveYouTubeIcon.classList.remove('youtube-green-fg');
        }
    });

    const parent = document.querySelector('.species-table tbody');
    const currentDescriptions = document.querySelectorAll('.species-description');
            currentDescriptions.forEach(tr => parent.removeChild(tr));

    return { accordions };
};