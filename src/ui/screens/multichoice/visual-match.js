import { store } from 'redux/store';
import { actions } from 'redux/actions/action-creators';
import { renderTemplate } from 'ui/helpers/templating';
import { scoreHandler } from 'ui/helpers/handlers';

export const renderVisualMatch = collection => {

    const item = collection.nextItem;

    const { config, lessonPlan, layout } = store.getState();

    const template = document.createElement('template');

    template.innerHTML = radiobuttonsTemplate;
    
};