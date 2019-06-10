import { store } from 'redux/store';
import { DOM } from 'ui/dom';
import { enums } from 'ui/helpers/enum-helper';

export const renderHeaders = page => {
    
    let lessonPlan, config, counter, collection, layout;

    setTimeout(() => {
        lessonPlan = store.getState().lessonPlan;
        config = store.getState().config;
        counter = store.getState().counter;
        collection = store.getState().collection;
        layout = store.getState().layout;
        render();
    });
    
    let PORTRAIT = false, LANDSCAPE = false, LANDSCAPE_HOME = false, COLLECTION = false, SPECIES_LIST = false;
    let leftHeaderText = '', rightHeaderText = '';

    const render = () => {

        layout = layout ? layout : (lessonPlan && lessonPlan.layouts) ? lessonPlan.layouts[counter.index] : null;

        const title = `learn the planet`;
    
        leftHeaderText = title; 
        rightHeaderText = config.isLandscapeMode ? 'Save the planet' : title;
        
        PORTRAIT = config.isPortraitMode;
        LANDSCAPE = config.isLandscapeMode;
    
        if(collection.name) {        
            LANDSCAPE_HOME = page.name === enums.navigation.HOME && LANDSCAPE;
            COLLECTION = !!collection;
            if(COLLECTION) collection.name ? leftHeaderText = collection.name : title;
            SPECIES_LIST = page.name === enums.navigation.LIST || page.name === enums.navigation.HOME && LANDSCAPE;
            if(SPECIES_LIST && PORTRAIT) rightHeaderText = collection.name;
            if(LANDSCAPE_HOME) {
                leftHeaderText = collection.name;
                rightHeaderText = title;
            }
        }
    
        if(layout) {
    
            const item = collection.nextItem;
            const progressBar = document.querySelector('.js-right-grid progress');
            const questionCount = lessonPlan.layouts.filter(layout => layout.type === 'test').length;        
            const questionFormat = `Question ${ layout.roundProgressIndex } of ${questionCount}`;
    
            progressBar.max = questionCount;
            progressBar.value = layout.roundProgressIndex || progressBar.value;
            
            let specimensHeaderText = '';
            let lessonHeaderText = document.querySelector('.js-right-header > div:nth-child(2)');
    
            switch(layout.name) {
                case 'screen-latin-to-common':
                    specimensHeaderText = `${item.name} specimens`;
                    break;
                case 'screen-common-to-latin':
                case 'specimen-images':
                case 'screen-image-to-image':
                case 'screen-species-card':
                    specimensHeaderText = `${item.vernacularName} specimens`;
                    break;
                case 'history':
                    if(PORTRAIT) rightHeaderText = 'Snapdragon';
                    break;
                default:
                    specimensHeaderText = 'Species specimens';
                    break;
            }
                
            let SPECIMENS = false;
    
            SPECIMENS = layout.screens.find(screen => screen.name === 'specimen-images');
    
            if(SPECIMENS && !LANDSCAPE_HOME) leftHeaderText = specimensHeaderText;
    
            let TEST = false, GLOSSARY = false, SUMMARY = false, SPECIES_CARD = false, FAMILY_CARD = false;
                              
            TEST = layout.type === 'test';
            GLOSSARY = layout.name === 'screen-definition-card';
            SPECIES_CARD = layout.name === 'screen-species-card';
            FAMILY_CARD = layout.name === 'screen-taxon-card';
            SUMMARY = layout.screens.find(el => el.name === 'summary');
            
            if(GLOSSARY) rightHeaderText = 'Glossary';
            if(TEST) rightHeaderText = questionFormat || '';
            if(SPECIES_CARD) rightHeaderText = 'Species summary';
            if(FAMILY_CARD) rightHeaderText = 'Family summary & Quick ID'
            if(SUMMARY) rightHeaderText = 'Lesson progress';
            if(SPECIES_LIST && PORTRAIT) rightHeaderText = collection.name;
            if(LANDSCAPE_HOME) rightHeaderText = title;

            if(LANDSCAPE) lessonHeaderText.innerHTML = `${collection.name} (${collection.items.length})`;
        }
    
        DOM.leftHeaderTxt.innerHTML = leftHeaderText;
        DOM.rightHeaderTxt.innerHTML = rightHeaderText;
    };
};