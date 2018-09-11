import { store } from 'redux/store';
import { actions } from 'redux/actions/action-creators';
import { subscription } from 'redux/subscriptions';
import { modalImageHandler } from 'ui/helpers/handlers';
import { stats } from 'ui/helpers/stats';
import { endOfRoundHandler } from 'ui/helpers/lesson-handlers';
import { buildTable } from 'ui/screens/lists/species-list-table';

export const renderSpeciesCollectionList = (collection, disableCheckBoxes = false) => {

    subscription.getByName('renderSpeciesCollectionList').forEach(sub => subscription.remove(sub));
    
    if(collection.id === 0) return;

    const { config, score, history, counter, collections  } = store.getState();

    config.collection = { id: collection.id };

    buildTable(collection, config);

    const headerCheckbox = document.querySelector(".table-header input[type='checkbox']");

    if(headerCheckbox) {
        if(disableCheckBoxes) {
            headerCheckbox.disabled = true;
        } else {
            headerCheckbox.addEventListener('click', event => {
                event.stopPropagation();
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

    document.querySelectorAll(".table-row td:nth-child(1)").forEach(td => {
        td.addEventListener('click', event => {
            event.stopPropagation();
        });
    });

    document.querySelectorAll(".table-row input[type='checkbox']").forEach(checkbox => {
        if(disableCheckBoxes) { 
            checkbox.disabled = true;
        } else {     
            checkbox.addEventListener('click', event => {
                event.stopPropagation();
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

    const listItemImages = document.querySelectorAll('.js-list-item');

    listItemImages.forEach(itemImage => { 
        const item = collection.items.find(item => item.name === itemImage.dataset.id)
        modalImageHandler(itemImage, item); 
    });    

    const continueLearningActionBtn = document.querySelector('.js-species-list-btn-action');

    // Portrait mode only

    if(continueLearningActionBtn) {

        const isLessonPaused = (counter && counter.log) ? true : false;

        if(history || isLessonPaused) {
            continueLearningActionBtn.innerHTML = 'Continue lesson';
        }
        
        const getLatestCounter = () => { 
            const counter = store.getState().counter;
            const log = counter.log;
            const index = log ? log.index : counter.index;
            return { index };
        };

        continueLearningActionBtn.addEventListener('click', () => {

            if(!disableCheckBoxes) {
                const notEnoughItemsSelected = !history && collection.items.filter(item => !item.isDeselected).length < collection.moduleSize;

                if(notEnoughItemsSelected) {
                    continueLearningActionBtn.innerHTML = `You must select at least ${collection.moduleSize} items`;
                }

                setTimeout(() => {
                    continueLearningActionBtn.innerHTML = 'Begin lesson';
                }, 2000);

                if(notEnoughItemsSelected) return;
            }

            if(isLessonPaused) {
                actions.boundToggleLesson(getLatestCounter());
            } else {
                const itemsToReview = stats.getItemsForRevision(collection, history, 1);
                const mode = endOfRoundHandler.getMode(config.mode, collection.isLevelComplete, itemsToReview);
                endOfRoundHandler.callEndOfRoundActions(mode, config, collections, collection, score, itemsToReview);
                
                const items = collection.items.filter(item => !item.isDeselected);
                if(!disableCheckBoxes || itemsToReview.length > 0) {
                    actions.boundChangeCollection({ config: config, items: items });
                }
            }
            
            actions.boundNewPage({ name: ''});

            subscription.getByName('renderSpeciesCollectionList').forEach(sub => subscription.remove(sub));
            subscription.getByName('renderHistory').forEach(sub => subscription.remove(sub));
        });
    }
};