import { actions } from 'redux/actions/learn';
import { store } from 'redux/store';
import { observeStore } from 'redux/observeStore';

import { renderSpecimen } from 'ui/screens/specimen-ctrl';
import { renderSpecies } from 'ui/screens/species-ctrl';
import { renderTextEntry } from 'ui/screens/text-entry-ctrl';

const subscriptions = [];

export const renderNextLayout = (index) => {

    const { randomiser } = store.getState();

    const nextLayout = randomiser.layoutsCollection.layouts[index];

    actions.boundNextScreen(nextLayout);
};