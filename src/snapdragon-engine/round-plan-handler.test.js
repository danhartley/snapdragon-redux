import { roundHandler } from "snapdragon-engine/round-plan-handler";

test('calculate species in current round', () => {
    let currentRound, moduleSize;
    let species = [
        'Anethum graveolens',
        'Thymus vulgaris',
        'Origanum vulgare',
        'Salvia officinalis',
        'Petroselinum crispum',
        'Coriandrum sativum',
    ];
    currentRound = 1;
    moduleSize = 1;
    expect(roundHandler.getRoundItems(currentRound, moduleSize, species)).toEqual(['Anethum graveolens']);
    currentRound = 2;
    moduleSize = 1;
    expect(roundHandler.getRoundItems(currentRound, moduleSize, species)).toEqual(['Thymus vulgaris']);
    currentRound = 1;
    moduleSize = 4;
    expect(roundHandler.getRoundItems(currentRound, moduleSize, species)).toEqual(['Anethum graveolens','Thymus vulgaris','Origanum vulgare','Salvia officinalis']);
    currentRound = 2;
    moduleSize = 4;
    expect(roundHandler.getRoundItems(currentRound, moduleSize, species)).toEqual(['Petroselinum crispum','Coriandrum sativum',]);
});