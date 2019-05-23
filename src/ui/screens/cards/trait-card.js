import { DOM } from 'ui/dom';
import { store } from 'redux/store';
import { renderTemplate } from 'ui/helpers/templating';
import { getTraits } from 'api/traits/traits';

import traitCardTemplate from 'ui/screens/cards/trait-card-template.html';

export const renderTraitCard = item => {

    const template = document.createElement('template');

    template.innerHTML = traitCardTemplate;

    const parent = DOM.rightBody;
    parent.innerHTML = '';

    // const { enums } = store.getState();

    // const traits = getTraits(enums);

    // let speciesTraits = traits.find(trait => trait.name === item.name);

    // render(bonus.question, bonus.answers, bonus.overrides);

    renderTemplate({ item }, template.content, parent);
};