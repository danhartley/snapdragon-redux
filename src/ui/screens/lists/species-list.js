import { DOM } from 'ui/dom';
import { utils } from 'utils/utils';
import { store } from 'redux/store';
import { actions } from 'redux/actions/action-creators';
import { subscription } from 'redux/subscriptions';
import { modalImageHandler } from 'ui/helpers/handlers';
import { itemProperties } from 'ui/helpers/data-checking';
import { renderTemplate } from 'ui/helpers/templating';
import { lessonPlanner } from 'syllabus/lesson-planner';
import speciesTemplate from 'ui/screens/lists/species-table-template.html';
import speciesPortraitTemplate from 'ui/screens/lists/species-table-portrait-template.html';
import speciesSmallLandscapeTemplate from 'ui/screens/lists/species-table-small-landscape-template.html';

export const renderSpeciesCollectionList = (collection) => {

    if(collection.id === 0) return;

    const { config: currentConfig, score, history, counter } = store.getState();

    const config = { ...currentConfig, ...{ collection: { id: collection.id } } };

    const template = document.createElement('template');

    const buildTable = () => {
        let totalPasses = 0;
        let totalFails = 0;
    
        collection.items.forEach(item => { 
            item.image = item.images[0];
            item.vernacularName = itemProperties.vernacularName(item, config);
            item.passes = item.passes || '--';
            item.fails = item.fails || '--';
            item.binomial = config.isPortraitMode ? itemProperties.trimLatinName(item.name) : item.name
            totalPasses += Number.isInteger(item.passes) ? item.passes : 0;
            totalFails += Number.isInteger(item.fails) ? item.fails : 0;
        });
    
        let parent = config.isPortraitMode ? DOM.rightBody : DOM.leftBody;
        parent.innerHTML = '<div class="snapdragon-container species-list js-species-list"></div>';
        parent = parent.querySelector('.snapdragon-container.js-species-list');
        template.innerHTML = config.isPortraitMode ? speciesPortraitTemplate : config.isSmallLandscapeMode ? speciesSmallLandscapeTemplate : speciesTemplate;
    
        renderTemplate({ collection }, template.content, parent);
    
        const table = document.querySelector('.species-table');
        const tbody = document.querySelector('.species-table tbody');
        
        const headerRow = document.createElement('tr');
        headerRow.classList.add('table-header');
        const imageHeader = document.createElement('th');
        const indexHeader = document.createElement('th');
        const speciesHeader = document.createElement('th');
        const familyHeader = document.createElement('th');
        const passesHeader = document.createElement('th');
        const failsHeader = document.createElement('th');
        indexHeader.innerHTML = '#';
        imageHeader.innerHTML = '<div></div>';
        speciesHeader.innerHTML = 'Species';
        familyHeader.innerHTML = 'Family';
        passesHeader.innerHTML = '<span class="icon"><i class="fas fa-check-circle"></i></span>';
        failsHeader.innerHTML = '<span class="icon"><i class="fas fa-times-circle"></i></span>';
        if(config.isPortraitMode) {
            headerRow.appendChild(imageHeader);    
            headerRow.appendChild(speciesHeader);
            headerRow.appendChild(passesHeader);
            headerRow.appendChild(failsHeader);     
        } else if(config.isSmallLandscapeMode) {
            headerRow.appendChild(indexHeader);
            headerRow.appendChild(imageHeader);
            headerRow.appendChild(speciesHeader);
            headerRow.appendChild(passesHeader);
            headerRow.appendChild(failsHeader);
        }
        else {
            headerRow.appendChild(indexHeader);
            headerRow.appendChild(imageHeader);
            headerRow.appendChild(speciesHeader);    
            headerRow.appendChild(familyHeader);
            headerRow.appendChild(passesHeader);
            headerRow.appendChild(failsHeader);
        } 
    
        tbody.insertBefore(headerRow, tbody.children[0]);
    
        const tfoot = document.createElement('tfoot');
        const footerRow = document.createElement('tr');
        footerRow.classList.add('table-footer');
    
        const imageFooter = document.createElement('td');
        const indexFooter = document.createElement('td');
        const speciesFooter = document.createElement('td');
        const familyFooter = document.createElement('td');
        const passesFooter = document.createElement('td');
        const failsFooter = document.createElement('td');
    
        imageFooter.innerHTML = '<div></div>';
        indexFooter.innerHTML = '<div></div>';
        speciesFooter.innerHTML = '<div></div>';
        familyFooter.innerHTML = '<div></div>';
    
        passesFooter.innerHTML = `<div>${totalPasses}</div>`;
        failsFooter.innerHTML = `<div>${totalFails}</div>`;
    
        if(config.isPortraitMode) {
            footerRow.appendChild(imageFooter);
            footerRow.appendChild(speciesFooter);
            footerRow.appendChild(passesFooter);
            footerRow.appendChild(failsFooter);
        } else if(config.isSmallLandscapeMode) {
            footerRow.appendChild(imageFooter);
            footerRow.appendChild(indexFooter);
            footerRow.appendChild(speciesFooter);
            footerRow.appendChild(passesFooter);
            footerRow.appendChild(failsFooter);
        } else {
            footerRow.appendChild(imageFooter);
            footerRow.appendChild(indexFooter);
            footerRow.appendChild(speciesFooter);
            footerRow.appendChild(familyFooter);
            footerRow.appendChild(passesFooter);
            footerRow.appendChild(failsFooter);
        }
    
        tfoot.appendChild(footerRow);
        table.appendChild(tfoot);
    
        utils.makeSortable(document);    
    }

    buildTable();

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
        
        const levelName = config.lesson.level.name;
        config.excludeRevision = levelName === 'Level 1' ? false : true;

        const getLatestCounter = () => { 
            const counter = store.getState().counter;
            const log = counter.log;
            const index = log ? log.index : counter.index;
            return { index };
        };

        continueLearningActionBtn.addEventListener('click', () => {

            if(collection.isLevelComplete) {
                config.excludeRevision = true;
                const lessonName = config.lesson.name;
                const levelName = config.lesson.level.name;
                const level = lessonPlanner.getNextLevel(lessonName, levelName, config.isPortraitMode);
                config.lesson.level = level;
                actions.boundNextLevel({ index: 0 });
                setTimeout(() => {
                    actions.boundUpdateConfig(config);
                    actions.boundNextLevel({ index: 0 });
                });
            } else if(isLessonPaused) {
                actions.boundToggleLesson(getLatestCounter());
            } else {
                if(score) {
                    actions.boundNextRound({ index: 0 });       
                    setTimeout(() => {
                        actions.boundUpdateConfig(config);    
                    });
                } else {
                    actions.boundChangeCollection(config);
                }
            }
            
            subscription.getByName('renderSpeciesCollectionList').forEach(sub => subscription.remove(sub));
        });
    }
};