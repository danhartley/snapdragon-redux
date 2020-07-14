import { isEmpty } from 'ramda';

import { store } from 'redux/store';
import { actions } from 'redux/actions/action-creators';
import { firestore } from 'api/firebase/firestore';

let language;

export const traitValuesHandler = async config => {

    if(language === config.language) return;

    language = config.language;

    if(!isEmpty(store.getState().units)) return;

    const unitsArray = await firestore.getUnits();

    const unitObjects = {};

    unitsArray.forEach(unit => {
        const key = Object.keys(unit)[0];
        unitObjects[key] = unit[key];      
      });

    var units = { ...unitObjects };

    actions.boundUpdateUnits(units);
};
