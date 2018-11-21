import * as R from 'ramda';

import { utils } from 'utils/utils';
import { itemProperties } from 'ui/helpers/data-checking';
import { renderTemplate } from 'ui/helpers/templating';
import * as traitTypes from 'api/traits/trait-types';
import featureTemplate from 'ui/screens/common/feature-template.html';
// import keyTraitTemplate from 'ui/screens/common/key-trait-template.html';

const getFeature = (item, traits, config, type) => {

    let feature = itemProperties.itemContextProperty(traits, item, type);

    if(feature && feature !== '' && feature.length !== 0 && feature[0] !== '') {

        if(config.isPortraitMode) {
            feature = R.take(3, feature);
        }
        
        let label;
        switch(type) {
            case traitTypes.name.ECOLOGY: 
                label = 'Habitat: ';
                break;
            default:
                label = `${utils.capitaliseAll(type)}: `;
                break;
        }
        const featureValue = Array.isArray(feature) ? feature.join(', ') : feature;
        return {label, feature: featureValue};
    }
};

export const renderFeatures = (item, traits, config, parent, types) => {

    const features = types.map(ft => {
        return getFeature(item, traits, config, ft)
    }).filter(ft => ft);

    if(features.length === 0) return;

    const template = document.createElement('template');
    template.innerHTML = featureTemplate;

    renderTemplate({features}, template.content, parent);
};

// export const renderTraits = (traits, enums, item, identification, parent) => {
//     const trait = `
//         ${utils.capitaliseFirst(enums.name.HOW_EDIBLE)}: 
//         ${itemProperties.getActiveTrait(traits, item.name, [{ name: enums.name.HOW_EDIBLE, formatter: trait => trait.value }])}
//     `;
    
//     const template = document.createElement('template');
//     template.innerHTML = keyTraitTemplate;

//     renderTemplate({trait, identification}, template.content, parent);
// };