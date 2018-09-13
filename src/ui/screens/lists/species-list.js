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

    const headerCheckbox = document.querySelector(".table-header input[type='checkbox']");

    if(headerCheckbox) {
        if(readOnlyMode) {
            headerCheckbox.disabled = true;
        } else {
            headerCheckbox.addEventListener('click', event => {
                // event.stopPropagation();
                if(event.target.checked) {            
                    document.querySelectorAll("input[type='checkbox']").forEach(checkbox => {
                        checkbox.checked = true;
                    });        
                    collection.items.forEach(item => item.isDeselected = false);
                    } else { 
                    document.querySelectorAll("input[type='checkbox']").forEach(checkbox => {
                        checkbox.checked = false;
                    });
                    collection.items.forEach(item => item.isDeselected = true);
                    }
                    actions.boundChangeCollectionItems(collection.items);
            });
        }
    }

    // document.querySelectorAll(".table-row td:nth-child(1)").forEach(td => {
    //     td.addEventListener('click', event => {
    //         event.stopPropagation();
    //     });
    // });

    document.querySelectorAll(".table-row input[type='checkbox']").forEach(checkbox => {
        if(readOnlyMode) { 
            checkbox.disabled = true;
        } else {     
            checkbox.addEventListener('click', event => {
                // event.stopPropagation();
                const name = event.target.name;
                const item = collection.items.find(item => item.name === name);
                if(event.target.checked) {
                    item.isDeselected = false;
                } else { 
                    item.isDeselected = true;
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