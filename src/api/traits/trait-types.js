import { isEmpty } from 'ramda';

import { store } from 'redux/store';
import { actions } from 'redux/actions/action-creators';
import { firestore } from 'api/firebase/firestore';

let language;

export const traitValuesHandler = async config => {

    if(language === config.language) return;

    language = config.language;

    if(!isEmpty(store.getState().enums)) return;

    const enums = await firestore.getTraitValues();

    actions.boundUpdateEnums(enums);
};
