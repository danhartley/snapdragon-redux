import { renderMultiStrips } from 'ui/screens/multichoice/multi-strips';

export const renderBonusTest = bonusCollection => {

    const { collection } = store.getState();

    const bonus = bonusCollection.find(bonus => bonus.isActive); // or something

    renderMultiStrips(collection, bonus)
};
