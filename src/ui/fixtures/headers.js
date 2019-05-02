import { store } from 'redux/store';
import { DOM } from 'ui/dom';
export const renderHeaders = page => {
    
    let lessonPlan, config, counter, collection;

    setTimeout(() => {
        lessonPlan = store.getState().lessonPlan;
        config = store.getState().config;
        counter = store.getState().counter;
        collection = store.getState().collection;
        render();
    });
    
    let PORTRAIT = false, LANDSCAPE = false, LANDSCAPE_HOME = false, COLLECTION = false, SPECIES_LIST = false;
    let leftHeaderText = '', rightHeaderText = '';

    const render = () => {
        const layout = (lessonPlan && lessonPlan.layouts) ? lessonPlan.layouts[counter.index] : null;

        const title = `learn the planet`;
    
        leftHeaderText = title; 
        rightHeaderText = config.isLandscapeMode ? 'Save the planet' : title;
        
        PORTRAIT = config.isPortraitMode;
        LANDSCAPE = config.isLandscapeMode;
    
        if(collection.name) {        
            LANDSCAPE_HOME = page.name === 'home' && LANDSCAPE;
            COLLECTION = !!collection;
            if(COLLECTION) collection.name ? leftHeaderText = collection.name : title;
            SPECIES_LIST = page.name === 'list' || page.name === 'home' && LANDSCAPE;
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
            const questionFormat = `Question ${ layout.itemIndex + 1 } of ${questionCount}`;
    
            progressBar.max = questionCount;
            progressBar.value = layout.itemIndex + 1 || progressBar.value;
            
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

        // userChangeHandler(config.guide.inatId.key);
    };

    // const userChangeHandler = userId => {
    //     const collectionName = `iNat observations for ${userId}`;
    //     if(LANDSCAPE && collection.id === 4) {
    //         DOM.leftHeaderTxt.innerHTML = collectionName;
    //         collection.name = collectionName;
    //     }
    //     if(PORTRAIT && collection.id === 4) {
    //         DOM.rightHeaderTxt.innerHTML = collectionName;
    //         collection.name = collectionName;
    //     }
    // };
};