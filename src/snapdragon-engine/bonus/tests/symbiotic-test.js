import{ contains } from 'ramda';

import { store } from 'redux/store';

export const getSymbioticTest = collection => {

    // See trait-tests for how to do this, not in use

    const { enums } = store.getState();

    const speciesTraits = item.traits;

    const enumeratedRoles = SD.enums.role;

    const roles = [];

    for (var key in enumeratedRoles) {
        roles.push(enumeratedRoles[key]);
    }

    const symbioticTraits = speciesTraits.filter(st => contains(st.name, roles));
    const symbioticSpecies = symbioticTraits.map(st => st.value.split(',').map(value => {
        if(value.indexOf(' ') > 0) {
            return {
                name: st.name,
                value: value
            }
        } else { return null; }
    })[0]).filter(ss => ss);

    // Not sure where to go with this yet!
    
}