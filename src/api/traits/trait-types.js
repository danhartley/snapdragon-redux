import { actions } from 'redux/actions/action-creators';
import { firestore } from 'api/firebase/firestore';

let language;

export const traitValuesHandler = async config => {
    
    if(language === config.language) return;

    language = config.language;

    for(let prop in enums) {
        enums[prop].type = prop;
        enums[prop].name = prop.split(/(?=[A-Z])/).join(' ').toLowerCase();
    }

    const enums = await firestore.getTraitValues();

    actions.boundUpdateEnums(enums);
};
