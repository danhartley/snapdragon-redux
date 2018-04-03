import { store } from 'redux/store';
import { renderProgressHeader, renderProgressScreen } from 'ui/screens/progress';
import { DOM } from 'ui/dom';
import { actions } from 'redux/actions/learn';
import { createNewCollection } from 'ui/screens/helpers-for-screens';
import { observeStore } from 'redux/observeStore';
import { renderSpeciesCard } from 'ui/screens/species-card-ctrl';

export const renderProgress = (index) => {

    const { score, items } = store.getState();

    if(score.total === items.length) {

        renderProgressHeader(score);
        renderProgressScreen(score);

        actions.boundRecordScore(score);

        const { history } = store.getState();

        const newCollection = createNewCollection(items, score.fails);

        setTimeout(() => {            
            if(newCollection.length > 0) {
                actions.boundReset(newCollection);
            }
        },5000);
    }    
};