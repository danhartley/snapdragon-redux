import * as SD from 'api/snapdragon/trait-types';

import { itemProperties } from 'ui/helpers/data-checking';
import { renderTemplate } from 'ui/helpers/templating';
import featureTemplate from 'ui/screens/common/feature-template.html';

export const featureType = (collection, item, traits, config, parent, featureType) => {

    const feature = itemProperties.itemContextProperty(traits, item, featureType);

    if(feature && feature !== '' && feature.length !== 0) {
        const template = document.createElement('template');
        template.innerHTML = featureTemplate;
        let label;
        switch(featureType) {
            case 'ecology':
                label = 'Habitats: ';
                break;
            case 'symbionts':
                label = 'Symbionts: ';
                break;
        }
        renderTemplate({label, feature: feature.join(', ')}, template.content, parent);
    }
};