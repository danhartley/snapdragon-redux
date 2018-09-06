import { store } from 'redux/store';
import { DOM } from 'ui/dom';
import { itemProperties } from 'ui/helpers/data-checking';

export const renderHeaders = collection => {
    
    const { lessonPlan, config, counter } = store.getState();

    const title = 'Snapdragon - learn the planet';

    if(config.isPortraitMode) DOM.rightHeaderTxt.innerHTML = title;

    if(!collection || !lessonPlan) return;

    const layout = lessonPlan.layouts ? lessonPlan.layouts[counter.index] : null;

    if(!layout) return;

    const specimensScreen = layout.screens.find(screen => screen.name === 'specimen-images');

    const item = collection.nextItem;
    const vernacularName = item ? itemProperties.vernacularName(item, config) : '';
    
    let specimenTitle = '';

    switch(layout.name) {
        case 'screen-latin-to-common':
            specimenTitle = `${item.name} specimens`;
            break;
        case 'screen-common-to-latin':
        case 'specimen-images':
        case 'screen-image-to-image':
        case 'screen-species-card':
            specimenTitle = `${vernacularName} specimens`;
            break;
        default:
            specimenTitle = 'Species specimens';
            break;
    }

    DOM.leftHeaderTxt.innerHTML = specimensScreen ? specimenTitle : title;

    const questionCount = lessonPlan.layouts.filter(layout => layout.type === 'test').length;
    const progressBar = document.querySelector('.js-right-grid progress');

    progressBar.max = questionCount;
    progressBar.value = layout.progressIndex || progressBar.value;

    if(layout.type === 'test') {
        const question = `Question ${ layout.progressIndex } of ${questionCount}`;
        setTimeout(() => {
            DOM.rightHeaderTxt.innerHTML = question || '';
        });
    } else if(layout.type === 'revision') {
        const isActiveLesson = !!collection;
        const isSpeciesCard = layout.name === 'screen-species-card';
        const isFamilyCard = layout.name === 'screen-taxon-card';
        const speciesHeader = config.isPortraitMode ? 'Species summary' : 'Species summary';
        const familyHeader = config.isPortraitMode ? 'Family summary and quick id' : 'Family summary & quick id';
        const header = isSpeciesCard ? speciesHeader : isFamilyCard ? familyHeader : collection.name;
        setTimeout(() => {
            DOM.rightHeaderTxt.innerHTML = isActiveLesson ? header : title;   
        });
    }
    if(layout.screens.find(el => el.name === 'summary')) {
        DOM.rightHeaderTxt.innerHTML = 'Lesson progress';
    }
};