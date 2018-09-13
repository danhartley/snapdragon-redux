import { store } from 'redux/store';
import { actions } from 'redux/actions/action-creators';
import { subscription } from 'redux/subscriptions';
import { modalImageHandler } from 'ui/helpers/handlers';
import { endOfRoundHandler } from 'ui/helpers/lesson-handlers';
import { buildTable } from 'ui/screens/lists/species-list-table';

export const renderSpeciesCollectionList = (collection, collectionFromLastRound, readOnlyMode = false) => {

    subscription.getByName('renderSpeciesCollectionList').forEach(sub => subscription.remove(sub));
    
    if(collection.id === 0) return;

    const { config, history, counter, collections  } = store.getState();

    config.collection = { id: collection.id };

    buildTable(collection, config);

    const headerCheckbox = document.querySelector(".table-header span.icon");
    const itemCheckboxes = document.querySelectorAll(".table-row span.icon");

    const isUnchecked = event => {
        const svg = event.target.parentElement;
        const checked = svg.classList.contains('fa-check-square');
        if(checked) {
            svg.dataset.icon = 'square';
        } else {
            svg.dataset.icon = 'check-square';
        }
        return checked;
    }

    const check = checkbox => {
        checkbox.childNodes[0].dataset.icon = 'check-square';
    }

    const uncheck = checkbox => {
        checkbox.childNodes[0].dataset.icon = 'square';
    }

    if(headerCheckbox) {
        if(readOnlyMode) {
            headerCheckbox.disabled = true;
        } else {
            headerCheckbox.addEventListener('click', event => {
                event.stopPropagation();
                if(isUnchecked(event)) {
                    itemCheckboxes.forEach(checkbox => {
                        uncheck(checkbox);
                    });        
                    collection.items.forEach(item => item.isDeselected = true);
                } else { 
                    itemCheckboxes.forEach(checkbox => {
                        check(checkbox);
                    });                
                    collection.items.forEach(item => item.isDeselected = false);
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
                const name = event.target.parentElement.parentElement.getAttribute('name');
                const item = collection.items.find(item => item.name === name);
                if(isUnchecked(event)) {
                    item.isDeselected = true;
                } else { 
                    item.isDeselected = false;
                }
                actions.boundChangeCollectionItems(collection.items);
            });
        }
    });

    const listItemImages = document.querySelectorAll('.table-row img');

    listItemImages.forEach(itemImage => { 
        const item = collection.items.find(item => item.name === itemImage.dataset.id)
        modalImageHandler(itemImage, item); 
    });    

    const continueLearningActionBtn = document.querySelector('.js-species-list-btn-action');

    // Portrait mode only

    if(continueLearningActionBtn) {
        
        if(history || counter.isLessonPaused) {
            continueLearningActionBtn.innerHTML = 'Continue lesson';
        }

        continueLearningActionBtn.addEventListener('click', () => {

            if(readOnlyMode) {
                const lessonStateMode = counter.isLessonPaused ? 'restartLesson' : 'nextRound';
                endOfRoundHandler.changeCollection(lessonStateMode, collections, collection, config, history);
            }
            else {
                endOfRoundHandler.changeCollection('newLesson', collections, collection, config, history, continueLearningActionBtn);
            }

            actions.boundNewPage({ name: ''});

            subscription.getByName('renderSpeciesCollectionList').forEach(sub => subscription.remove(sub));
            subscription.getByName('renderHistory').forEach(sub => subscription.remove(sub));
        });
    }
};