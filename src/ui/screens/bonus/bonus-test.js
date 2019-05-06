import { store } from 'redux/store';
import { renderMultiStrips } from 'ui/screens/multichoice/multi-strips';

export const renderBonusTest = bonusLayout => {

    const { collection } = store.getState();

    const bonus = bonusLayout;

    collection.nextItem = bonusLayout.item;

    renderMultiStrips(collection, bonus)
};
