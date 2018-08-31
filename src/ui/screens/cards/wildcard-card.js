import * as R from 'ramda';

import { store } from 'redux/store';
import { DOM } from 'ui/dom';
import { actions } from 'redux/actions/action-creators';
import { renderTemplate } from 'ui/helpers/templating';
import { taxa } from 'api/snapdragon/taxa';
import { syndromes } from 'api/snapdragon/syndromes';
import wildcardTemplate from 'ui/screens/cards/wildcard-card-template.html';
import { symbionts } from 'api/snapdragon/symbiosis';

export const renderWildcard = collection => {

    const item = collection.nextItem;
    const { lessonPlan, config } = store.getState();

    item.questionCount = lessonPlan.layouts.filter(layout => layout.type === 'test').length;
    item.layoutCount = lessonPlan.layouts.length;

    const template = document.createElement('template');

    template.innerHTML = wildcardTemplate;

    const traits = R.flatten(syndromes.traits.map(trait => {
        const t = trait.keys.find(key => key.key === 'bee');
        return { trait: trait.name, value: t.value, description: t.description || '' };
    }));
    
    const parent = DOM.rightBody;

    parent.innerHTML = '';

    const family = taxa.find(f => f.name === item.family);

    const context = {
        rank: 'family',
        family: family,
        img: family.thumb,
        alt: family.alt,
        traits: traits,
        occurrences: 25,
        wiki: 'Pollination syndromes are suites of flower traits that have evolved in response to natural selection imposed by different pollen vectors, which can be abiotic (wind and water) or biotic.'
    };

    renderTemplate(context, template.content, parent);

    document.querySelector('.js-trait-card-btn').addEventListener('click', event => {
        actions.boundEndRevision(item);
    });

};